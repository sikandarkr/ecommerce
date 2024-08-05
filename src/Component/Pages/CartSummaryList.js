import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeCart } from "../../redux/actions/products";
import "../css/cartsummarylist.css"; // Ensure this CSS file is created

function CartSummaryList() {
  const products = useSelector((state) => state.products.productData);
  const [localCart, setLocalCart] = useState(
    JSON.parse(localStorage.getItem("cart")) || []
  );
  const [totalPrice, setTotalPrice] = useState(0);
  const [billingAddress, setBillingAddress] = useState("");
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const dispatch = useDispatch();
  useEffect(() => {
    const total = localCart.reduce((acc, item) => {
      const product = products.find((p) => p.product_id === item.product_id);
      return acc + (product ? product.product_price * item.quantity : 0);
    }, 0);
    setTotalPrice(total);
  }, [localCart, products]);

  useEffect(() => {
    // Ensure items are displayed correctly
    setLocalCart(JSON.parse(localStorage.getItem("cart")) || []);
  }, [products]);

  // const handleQuantityChange = (productId, change) => {
  //     setLocalCart(prevCart => {
  //         const updatedCart = prevCart.map(item =>
  //             item.product_id === productId ? { ...item, quantity: item.quantity + change } : item
  //         ).filter(item => item.quantity > 0);

  //         localStorage.setItem('cart', JSON.stringify(updatedCart));
  //         return updatedCart;
  //     });
  // };

  const handleQuantityChange = (productId, change) => {
    setLocalCart((prevCart) => {
      const updatedCart = prevCart
        .map((item) =>
          item.product_id === productId
            ? { ...item, quantity: item.quantity + change }
            : item
        )
        .filter((item) => item.quantity > 0);

      const updatedItem = prevCart.find(
        (item) => item.product_id === productId
      );
      if (updatedItem && updatedItem.quantity + change <= 0) {
        handleRemoveItem(productId);
      } else {
        localStorage.setItem("cart", JSON.stringify(updatedCart));
      }

      return updatedCart;
    });
  };

  const handleRemoveItem = (productId) => {
    setLocalCart((prevCart) => {
      const updatedCart = prevCart.filter(
        (item) => item.product_id !== productId
      );
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      return updatedCart;
    });
    dispatch(removeCart(productId));
  };

  const handleGetCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        // You can use a geocoding service here to convert lat/long to an address
        // For simplicity, we'll just set the coordinates as the address
        setBillingAddress(`Latitude: ${latitude}, Longitude: ${longitude}`);
      });
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  return (
    <div className="cart-summary-container">
      <div className="order-summary">
        <h2>
          Order Summary
          <span className="item-count">{localCart.length} items</span>
        </h2>
        <hr />
        {localCart.map((cartItem) => {
          const product = products.find(
            (p) => p.product_id === cartItem.product_id
          );
          return product ? (
            <div key={product.product_id} className="product-item">
              <img
                src={product.product_image}
                alt={product.product_name}
                className="product-image"
              />
              <div className="product-details">
                <div className="product-header">
                  <h3>{product.product_name}</h3>
                </div>
                <p>Price: ₹{product.product_price}</p>
                <p>Store: {product.product_store_name}</p>
                <div className="quantity-remove-container">
                  <div className="quantity-control">
                    <button
                      onClick={() =>
                        handleQuantityChange(product.product_id, -1)
                      }
                    >
                      -
                    </button>
                    <span>{cartItem.quantity}</span>
                    <button
                      onClick={() =>
                        handleQuantityChange(product.product_id, 1)
                      }
                    >
                      +
                    </button>
                  </div>
                  <button
                    className="remove-button"
                    onClick={() => handleRemoveItem(product.product_id)}
                  >
                    <i className="fa fa-trash" aria-hidden="true"></i> Remove
                  </button>
                </div>
              </div>
            </div>
          ) : null;
        })}
      </div>
      <div className="delivery-details">
        <h2>Delivery Details</h2>
        <form>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Mobile"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
          />
          <textarea
            placeholder="Address"
            value={billingAddress}
            onChange={(e) => setBillingAddress(e.target.value)}
          ></textarea>
          <button
            type="button"
            className="location-button"
            onClick={handleGetCurrentLocation}
          >
            Use Current Location
          </button>
        </form>
        <div className="price-details">
          <h3>Price Details</h3>
          <p className="total-price">Total Price: ₹{totalPrice}</p>
        </div>
        <button className="order-button">Place Order</button>
      </div>
    </div>
  );
}

export default CartSummaryList;
