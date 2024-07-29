import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import {  useDispatch } from "react-redux";
import { onRemoveData } from "../../../redux/actions/universities";
import './card.css';

function Card(props) {
    const { name, country, item, key } = props;
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const cardRef = useRef();
    const removeHandler = () => {
        setTimeout(() => {
            dispatch(onRemoveData(item.name));
            //css animation for this time gap
        }, 400)
    };
    const Redirecthandler = (data) => {
        navigate('/details', { state: data, replace: true });
    };
    return (
        <div className="card" key={key}>
            <h2>{name}</h2>
            <p>Country: {country}</p>
            <p className="view-details-btn" onClick={() => Redirecthandler(item)}>View Details</p>
            <button className="close-button" onClick={() => removeHandler(item)} ref={cardRef}>X</button>
        </div>

    )
}
export default Card;