import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './OTPVerificationModal.css'; // Import the CSS for styling

const OTPVerificationModal = (props) => {
    const order = useSelector(state => state.products);
//   const [otp, setOtp] = useState(['', '', '', '']);
  const {onClose,handleSubmit,handleChange,handleKeyDown,otp} = props;
//   const handleChange = (e, index) => {
//     const { value } = e.target;
//     if (/^[0-9]$/.test(value) || value === '') {
//       const newOtp = [...otp];
//       newOtp[index] = value;
//       setOtp(newOtp);
//       // Move to the next input field if value is entered
//       if (index < 3 && value !== '') {
//         document.getElementById(`otp-input-${index + 1}`).focus();
//       }
//     }
//   };

//   const handleKeyDown = (e, index) => {
//     if (e.key === 'Backspace') {
//       const newOtp = [...otp];
//       newOtp[index] = '';  // Clear the current input
//       setOtp(newOtp);
//     }
//   };

//   const handleSubmit = () => {
//     if (otp.every((digit) => digit !== '')) {
//         console.log(otp.join(''));
//     //   onVerify(otp.join(''));
//     }
//     console.log("Your OTP is...", otp);
//   };
console.log("Order&&&&&&&&&&&&&&&&&&&&&&",order);
  return (
    <div className="otp-modal">
      <div className="otp-modal-content">
        <h2>OTP Verification</h2>
        <p>Please enter the 4-digit OTP sent to your mobile number</p>
        <div className="otp-inputs">
          {otp.map((_, index) => (
            <input
              key={index}
              id={`otp-input-${index}`}
              type="text"
              maxLength="1"
              value={otp[index]}
              onChange={(e) => handleChange(e, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              className="otp-input"
            />
          ))}
        </div> 
        {!order.isValidOtp?<p className='invalid-otp-message'>Invalid OTP. Please try again or request a new one.</p>:null}
        <button className="verify-button" onClick={handleSubmit}>
          Verify
        </button>
        <button className="close-button" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default OTPVerificationModal;
