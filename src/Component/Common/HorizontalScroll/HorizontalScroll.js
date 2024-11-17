import React, { useState } from "react";
import "./HorizontalScroll.css";
import Img from "../../../image/all.png";
import Food from "../../../image/food.png";
import Utilities from "../../../image/utilities.png";
import Gadget from "../../../image/electronicGadget.png";
import Clothing from "../../../image/clothing.png";
import Furniture from "../../../image/Furniture.png";
import Beauty from "../../../image/Beauty.png";
import LegalConsultancy from "../../../image/LegalConsultancy.png";
import Wellness from "../../../image/Wellness.png";
import { useTranslation } from "react-i18next";

const HorizontalScroll = () => {
  const { t } = useTranslation();
  const [selectedCard, setSelectedCard] = useState(0); // Set the first card as selected by default

  const handleCardClick = (index) => {
    setSelectedCard(index);
  };
  console.log(t("all"));

  const cards = [
    { img: Img, text: t("all") },
    { img: Food, text: t("grocery") },
    { img: Utilities, text: t("home Utility") },
    { img: Gadget, text: t("electronic Gadget") },
    { img: Clothing, text: t("clothing") },
    { img: Furniture, text: t("furniture") },
    { img: Beauty, text: t("beauty Products") },
    { img: Wellness, text: t("health and Wellness") },
    { img: LegalConsultancy, text: t("legal Consultancy") },
  ];

  return (
    <div className="scroll-container">
      <div className="scroll-content">
        {cards.map((card, index) => (
          <div
            key={index}
            className={`card ${selectedCard === index ? "selected" : ""}`}
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
