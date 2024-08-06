import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { debounce, uniqBy } from "lodash";
import { Avatar, Badge, Space, Select, AutoComplete, Button } from 'antd';
import { useTranslation } from 'react-i18next';
import { useNavigate, useLocation } from 'react-router-dom';
import { applyFilter } from '../../../redux/actions/products';
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
  const dispatch = useDispatch();
  const handleCardClick = (index,obj) => {
    dispatch(applyFilter({filter:obj.key}));
    setSelectedCard(index);
  };

  const cards = [
    { img: Img, text: "All", key:"All" },
    { img: Food, text: "Food" , key:"food"},
    { img: Utilities, text: "Home utilities", key:"utilities" },
    { img: Gadget, text: "Electronic Gadget" , key:"electronic" },
    { img: Clothing, text: "Clothing" , key:"clothing" },
    { img: Furniture, text: "Furniture"  , key:"furniture"},
    { img: Beauty, text: "Beauty Products"  , key:"beauty"},
    { img: Wellness, text: "Health and Wellness" , key:"health" },
    { img: LegalConsultancy, text: "Legal Consultancy" , key:"legal" },
  ];

  return (
    <div className="scroll-container">
      <div className="scroll-content">
        {cards.map((card, index) => (
          <div
            key={index}
            className={`card ${selectedCard === index ? 'selected' : ''}`}
            onClick={() => handleCardClick(index,card)}
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
