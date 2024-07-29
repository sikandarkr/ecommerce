import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import './listdetails.css';

const ListDetails = (props) => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const redirectBack = () => {
    navigate('/', {});
  };
  return (
    <div className="listDetails">
      <div className="page-title-details"><h2>Universities details Page</h2></div>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>State Province</th>
            <th>Country</th>
            <th>Country Code</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{state.name}</td>
            <td>{state["state-province"]}</td>
            <td>{state.country}</td>
            <td>{state.alpha_two_code}</td>
          </tr>
        </tbody>
      </table>
      <p onClick={redirectBack} className="goback">Go Back</p>
    </div>
  );
};

export default ListDetails;
