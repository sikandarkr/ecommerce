// OrderSuccessPopup.js
import React from 'react';
import { Modal, Button } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { CheckCircleOutlined ,WarningOutlined} from '@ant-design/icons';
import { useNavigate, useLocation } from 'react-router-dom';
import './OrderSuccessPopup.css'; // Ensure you create this CSS file

const OrderSuccessPopup = ({ visible, onClose }) => {
    const order = useSelector(state => state.products);
    const dispatch = useDispatch();
    const navigate = useNavigate();
     const closeHandler=()=>{
        dispatch({type:"CLOSE_POP_UP"});
        // dispatch({ type: "UPDATE_CART_LOCAL", payload: [] });
        localStorage.clear();
        navigate('/');
      
     }
    return (
        <Modal
            open={order.showpopup}
            footer={null}
            onCancel={closeHandler}
            centered
            className="order-success-modal"
        >
            <div className="popup-content">
               {order.orderDetails&&order.orderDetails.initiated?<WarningOutlined className='warning-icon'/>:<CheckCircleOutlined className="success-icon" />} 
                {/* <h2>Order Placed Successfully!</h2> */}
                <h2>{order.orderDetails&&order.orderDetails.initiated?<span>Previous order in Process </span>:<span>Order Placed Successfully!</span>}</h2>
                {order.orderDetails&&order.orderDetails.initiated? <p>Thank you for your purchase. Your order has been placed and is being processed. order id:{order.orderDetails&&order.orderDetails.order_id}</p>:<p>Your order is already in process with orderId:{order.orderDetails&&order.orderDetails.order_id} ,please wait while we complete this order for you!</p>}
                <Button type="primary" onClick={closeHandler}>
                    Close
                </Button>
            </div>
        </Modal>
    );
};

export default OrderSuccessPopup;
