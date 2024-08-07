// OrderSuccessPopup.js
import React from 'react';
import { Modal, Button } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { CheckCircleOutlined } from '@ant-design/icons';
import { useNavigate, useLocation } from 'react-router-dom';
import { closePopUp } from '../../../redux/actions/products';
import './OrderSuccessPopup.css'; // Ensure you create this CSS file

const OrderSuccessPopup = ({ visible, onClose }) => {
    const order = useSelector(state => state.products);
    const dispatch = useDispatch();
    const navigate = useNavigate();
     const closeHandler=()=>{
        dispatch(closePopUp);
        navigate('/');
        localStorage.clear();
      
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
                <CheckCircleOutlined className="success-icon" />
                {/* <h2>Order Placed Successfully!</h2> */}
                <h2>{order.orderDetails&&order.orderDetails.message}</h2>
                <p>Thank you for your purchase. Your order has been placed and is being processed. order id:{order.orderDetails&&order.orderDetails.order_id}</p>
                <Button type="primary" onClick={closeHandler}>
                    Close
                </Button>
            </div>
        </Modal>
    );
};

export default OrderSuccessPopup;
