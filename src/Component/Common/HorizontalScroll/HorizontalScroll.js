import React, { useState } from 'react';
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
  const [selectedCard, setSelectedCard] = useState(0); // Set the first card as selected by default

  const handleCardClick = (index) => {
    setSelectedCard(index);
  };

  const cards = [
    { img: Img, text: "All" },
    { img: Food, text: "Food" },
    { img: Utilities, text: "Home utilities" },
    { img: Gadget, text: "Electronic Gadget" },
    { img: Clothing, text: "Clothing" },
    { img: Furniture, text: "Furniture" },
    { img: Beauty, text: "Beauty Products" },
    { img: Wellness, text: "Health and Wellness" },
    { img: LegalConsultancy, text: "Legal Consultancy" },
  ];

  return (
    <div className="scroll-container">
      <div className="scroll-content">
        {cards.map((card, index) => (
          <div
            key={index}
            className={`card ${selectedCard === index ? 'selected' : ''}`}
            onClick={() => handleCardClick(index)}
          >
            <img src={card.img} alt={card.text} height="100px" width="100px" />
            <p className="card-text">{card.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HorizontalScroll;
