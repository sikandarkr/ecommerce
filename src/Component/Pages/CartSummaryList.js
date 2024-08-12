import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Alert, Flex, Spin, Empty } from 'antd';
import { removeCart, placeOrder, sendOtp } from '../../redux/actions/products';
import OrderSuccessPopup from '../Common/OrderSuccessPopup/OrderSuccessPopup';
import OTPVerificationModal from '../Common/OTPVerificationModal/OTPVerificationModal';
import '../css/cartsummarylist.css'; // Ensure this CSS file is created

function CartSummaryList() {
    const products = useSelector(state => state.products.productData);
    const orderSummary = useSelector(state => state.products);
    const loader = useSelector(state => state.products.loader);
    const spinner = useSelector(state => state.products.spinner);
    const otpStatus = useSelector(state => state.products.otpStatus);
    const [localCart, setLocalCart] = useState(JSON.parse(localStorage.getItem('cart')) || []);
    const [totalPrice, setTotalPrice] = useState(0);
    const [billingAddress, setBillingAddress] = useState("");
    const [landMarkAddress, setLandmarkAddress] = useState("");
    const [name, setName] = useState("");
    const [mobile, setMobile] = useState("");
    const [otp, setOtp] = useState(['', '', '', '']);
    const [errors, setErrors] = useState({});
    const dispatch = useDispatch();
    const handleChange = (e, index) => {
        const { value } = e.target;
        if (/^[0-9]$/.test(value) || value === '') {
            const newOtp = [...otp];
            newOtp[index] = value;
            setOtp(newOtp);
            // Move to the next input field if value is entered
            if (index < 3 && value !== '') {
                document.getElementById(`otp-input-${index + 1}`).focus();
            }
        }
    };

    const handleKeyDown = (e, index) => {
        if (e.key === 'Backspace') {
            const newOtp = [...otp];
            newOtp[index] = '';  // Clear the current input
            setOtp(newOtp);
        }
    };

    const onClose = () =>{
        dispatch({type:"CLOSE_OTP_MODAL"})
    }
   
    useEffect(() => {
        const total = localCart.reduce((acc, item) => {
            const product = products.find(p => p.product_id === item.product_id);
            return acc + (product ? product.product_price * item.quantity : 0);
        }, 0);
        setTotalPrice(total);
    }, [localCart, products]);

    useEffect(() => {
        // Ensure items are displayed correctly
        setLocalCart(JSON.parse(localStorage.getItem('cart')) || []);
    }, [products]);


    const handleQuantityChange = (productId, change) => {
        setLocalCart(prevCart => {
            const updatedCart = prevCart.map(item =>
                item.product_id === productId ? { ...item, quantity: item.quantity + change } : item
            ).filter(item => item.quantity > 0);

            const updatedItem = prevCart.find(item => item.product_id === productId);
            if (updatedItem && updatedItem.quantity + change <= 0) {
                handleRemoveItem(productId);
            } else {
                localStorage.setItem('cart', JSON.stringify(updatedCart));
            }

            return updatedCart;
        });
    };


    const handleRemoveItem = (productId) => {
        setLocalCart(prevCart => {
            const updatedCart = prevCart.filter(item => item.product_id !== productId);
            localStorage.setItem('cart', JSON.stringify(updatedCart));
            return updatedCart;
        });
        dispatch(removeCart(productId));
    };

    const handleGetCurrentLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position => {
                const { latitude, longitude } = position.coords;
                // You can use a geocoding service here to convert lat/long to an address
                // For simplicity, we'll just set the coordinates as the address
                setBillingAddress(`Latitude: ${latitude}, Longitude: ${longitude}`);
            });
        } else {
            alert("Geolocation is not supported by this browser.");
        }
    };

    const getOrderDetails = () => {
        return localCart.map(cartItem => {
            const product = products.find(p => p.product_id === cartItem.product_id);
            if (product) {
                return {
                    product_id: product.product_id,
                    owner_mobile: product.owner_mobile,
                    product_store_id: product.product_store_id,
                    product_name: product.product_name,
                    product_price: product.product_price,
                    quantity: cartItem.quantity,
                    total_price: product.product_price * cartItem.quantity,
                };
            }
            return null;
        }).filter(item => item !== null);
    };
    const validateForm = () => {
        let formErrors = {};
        if (!name) formErrors.name = "Name is required.";
        if (!mobile) {
            formErrors.mobile = "Mobile number is required.";
        } else if (!/^\d{10}$/.test(mobile)) {
            formErrors.mobile = "Invalid mobile number.";
        }
        if (!landMarkAddress) formErrors.landMarkAddress = "Please give as landmark address to serve better"
        if (!billingAddress) formErrors.billingAddress = "Address is required.";
        return formErrors;
    };
    const placeOrderHandler = () => {
        const formErrors = validateForm();
        if (Object.keys(formErrors).length > 0) {
            setErrors(formErrors);
            return;
        }
       
        dispatch(sendOtp({ "name": name, "mobile": mobile }));
    }
    const handleSubmit = () => {
        if (otp.every((digit) => digit !== '')) {
            const orderDetails = getOrderDetails();
            const billingDetails = {
                otp:otp.join(''),
                mobile,
                billingAddress,
                landMarkAddress
            };
            const combinedDetails = {
                orderDetails,
                billingDetails,
                totalPrice
            };
            const payload = JSON.stringify(combinedDetails);
            console.log("Details...",payload);
            dispatch(placeOrder(payload));
        }
       
    };


    return (
        <Spin spinning={loader} tip="Loading" size="large">
            <div className="cart-summary-container">
                <div className="order-summary">
                    <h2>
                        Order Summary
                        <span className="item-count">{localCart.length} items</span>
                    </h2>
                    <hr />
                    {localCart.length === 0 ? (
                        <div className="emptyBanner">
                            <Empty description="Looks like you haven't added anything to your cart yet. Start shopping now!" />
                        </div>
                    ) : (
                        localCart.map(cartItem => {
                            const product = products.find(p => p.product_id === cartItem.product_id);
                            return product ? (
                                <div key={product.product_id} className="product-item">
                                    <img src={product.product_image} alt={product.product_name} className="product-image" />
                                    <div className="product-details">
                                        <div className="product-header">
                                            <h3>{product.product_name}</h3>
                                        </div>
                                        <p>Price: ₹{product.product_price}</p>
                                        <p>Store: {product.product_store_name}</p>
                                        <div className="quantity-remove-container">
                                            <div className="quantity-control">
                                                <button onClick={() => handleQuantityChange(product.product_id, -1)}>-</button>
                                                <span>{cartItem.quantity}</span>
                                                <button onClick={() => handleQuantityChange(product.product_id, 1)}>+</button>
                                            </div>
                                            <button className="remove-button" onClick={() => handleRemoveItem(product.product_id)}>
                                                <i className="fa fa-trash" aria-hidden="true"></i> Remove
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ) : null;
                        })
                    )}

                    {/* {localCart.map(cartItem => {
                        const product = products.find(p => p.product_id === cartItem.product_id);
                        return product ? (
                            <div key={product.product_id} className="product-item">
                                <img src={product.product_image} alt={product.product_name} className="product-image" />
                                <div className="product-details">
                                    <div className="product-header">
                                        <h3>{product.product_name}</h3>
                                    </div>
                                    <p>Price: ₹{product.product_price}</p>
                                    <p>Store: {product.product_store_name}</p>
                                    <div className="quantity-remove-container">
                                        <div className="quantity-control">
                                            <button onClick={() => handleQuantityChange(product.product_id, -1)}>-</button>
                                            <span>{cartItem.quantity}</span>
                                            <button onClick={() => handleQuantityChange(product.product_id, 1)}>+</button>
                                        </div>
                                        <button className="remove-button" onClick={() => handleRemoveItem(product.product_id)}>
                                            <i className="fa fa-trash" aria-hidden="true"></i> Remove
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ) :null;
                    })} */}
                </div>
                {otpStatus && <OTPVerificationModal isOpen={false}
                    handleChange={handleChange}
                    handleKeyDown={handleKeyDown}
                    handleSubmit={handleSubmit}
                    otp={otp}
                    onClose={onClose}
                />}

                <OrderSuccessPopup />
                <div className="delivery-details">
                    <h2>Delivery Details</h2>
                    <form>
                        <input
                            type="text"
                            placeholder="Name"
                            maxlength="15"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        {errors.name && <span className="error-message animated">{errors.name}</span>}
                        <input
                            type="mobile"
                            maxlength="10"
                            placeholder="Mobile"
                            value={mobile}
                            onChange={(e) => setMobile(e.target.value)}
                        />
                        {errors.mobile && <span className="error-message animated">{errors.mobile}</span>}
                        <textarea
                            placeholder="Land Mark Nearby"
                            value={landMarkAddress}
                            maxlength="60"
                            onChange={(e) => setLandmarkAddress(e.target.value)}
                        ></textarea>
                        {errors.landMarkAddress && <span className="error-message animated">{errors.landMarkAddress}</span>}
                        <textarea
                            placeholder="Address"
                            value={billingAddress}
                            maxlength="60"
                            onChange={(e) => setBillingAddress(e.target.value)}
                        ></textarea>
                        {errors.billingAddress && <span className="error-message animated">{errors.billingAddress}</span>}
                        <button type="button" className="location-button" onClick={handleGetCurrentLocation}>
                            Use Current Location
                        </button>
                    </form>
                    <div className="price-details">
                        <h3>Price Details</h3>
                        <p className="total-price">Total Price: ₹{totalPrice}</p>
                    </div>
                    <button className="order-button" onClick={placeOrderHandler}>{spinner ? <Spin size="small" /> : <span>Place Order</span>}</button>
                </div>
            </div>
        </Spin>
    );
}

export default CartSummaryList;
