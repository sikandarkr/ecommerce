import React from 'react';
import './HorizontalScroll.css';
import Img from '../../../image/all.png';
import Food from '../../../image/food.png';
import Utilities from '../../../image/utilities.png';
import Gadget from '../../../image/electronicGadget.png';
import Clothing from '../../../image/clothing.png';
import Furniture from '../../../image/Furniture.png';
import Beauty from '../../../image/Beauty.png';
import LegalConsultancy from '../../../image/LegalConsultancy.png';
import Wellness from '../../../image/Wellness.png';

const HorizontalScroll = () => {
  return (
    <div className="scroll-container">
      <div className="scroll-content">
        <div className="card">
          <img src={Img} alt="Placeholder"   height="100px" width="100px"/>
          <p className="card-text">All</p>
        </div>
        <div className="card">
        <img src={Food} alt="Placeholder"   height="100px" width="100px"/>
          <p className="card-text">Food</p>
        </div>
        <div className="card">
          <img src={Utilities} alt="Placeholder"  height="100px" width="100px"/>
          <p className="card-text">Home utilities</p>
        </div>
        <div className="card">
          <img src={Gadget} alt="Placeholder"  height="100px" width="100px"/>
          <p className="card-text">Electronic Gadget</p>
        </div>
        <div className="card">
          <img src={Clothing} alt="Placeholder" height="100px" width="100px" />
          <p className="card-text">Clothing</p>
        </div>
        <div className="card">
          <img src={Furniture} alt="Placeholder" height="100px" width="100px"/>
          <p className="card-text">Furniture</p>
        </div>
        <div className="card">
          <img src={Beauty} alt="Placeholder" height="100px" width="100px"/>
          <p className="card-text">Beauty Products</p>
        </div> 
        <div className="card">
          <img src={Wellness} alt="Placeholder" height="100px" width="100px"/>
          <p className="card-text">Health and Wellness</p>
        </div>
        <div className="card">
          <img src={LegalConsultancy} alt="Placeholder" height="100px" width="100px"/>
          <p className="card-text">Legal Consultancy</p>
        </div>
        {/* Add more cards as needed */}
      </div></div>
  );
};

export default HorizontalScroll;
