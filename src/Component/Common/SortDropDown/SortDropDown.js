import React from "react";
import { useSelector, useDispatch } from 'react-redux';
import { SortUniversities } from '../../../redux/actions/universities';
import './SortDropDown.css';
const SortingDropdown = ({ onChange }) => {
  const dispatch = useDispatch();

  const handleSort = (e) => {
    dispatch(SortUniversities(e.target.value))
  };

  return (
    <div className="select-wrapper">
      <select
        onChange={handleSort}
        className="dropdown-menu"
      >
        <option value="">Select Sorting Option</option>
        <option value="asc">A to Z</option>
        <option value="desc">Z to A</option>
      </select>
    </div>
  );
};

export default SortingDropdown;
