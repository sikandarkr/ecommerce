import React, { useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { debounce } from "lodash";
import { OnSearch, OnClear } from '../../../redux/actions/universities';
const SearchBar = ({ searchTerm }) => {
  const dispatch = useDispatch();
  const handleSearch = useCallback(
    debounce((searchTerm) => {
      if (searchTerm == "") {
        dispatch(OnClear());
      }
      else {
        dispatch(OnSearch(searchTerm));
      }
    }, 300),
    [OnSearch]
  );
  const handleSearchChange = (event) => {
    const searchTerm = event.target.value;
    handleSearch(searchTerm);
  };

  return (
    <input
      type="text"
      placeholder="Search by name..."
      value={searchTerm}
      onChange={handleSearchChange}
      style={{
        width: "90%",
        padding: "10px",
        borderRadius: "10px",
        border: "1px solid #ccc",
        fontSize: "16px",
        outline: "none",
      }}
    />
  );
};

export default SearchBar;
