import React, { useState, useCallback } from 'react';
import {  useDispatch } from 'react-redux';
import { debounce } from 'lodash';
import { OnSearch, OnClear, FetchSuggestions } from '../../../redux/actions/universities';

const SearchBar = ({ searchTerm }) => {
  const dispatch = useDispatch();
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleSearch = useCallback(
    debounce((searchTerm) => {
      if (searchTerm === "") {
        dispatch(OnClear());
        setSuggestions([]);
      } else {
        console.log("Your search keyword is.... ", searchTerm);
        // dispatch(OnSearch(searchTerm));
        // Fetch suggestions based on search term
        dispatch(FetchSuggestions(searchTerm)).then((suggestions) => {
          setSuggestions(suggestions);
          setShowSuggestions(true);
        });
      }
    }, 300),
    [OnSearch]
  );

  const handleSearchChange = (event) => {
    // const searchTerm = event.target.value;
   
    // handleSearch(searchTerm);
  };

  const handleSuggestionClick = (suggestion) => {
    handleSearch(suggestion);
    setShowSuggestions(false);
  };

  return (
    <div style={{ position: 'relative', width: '90%' }}>
      <input
        type="text"
        placeholder="Search by name..."
        value={searchTerm}
        onChange={handleSearchChange}
        style={{
          width: '100%',
          padding: '10px',
          borderRadius: '10px',
          border: '1px solid #ccc',
          fontSize: '16px',
          outline: 'none',
        }}
      />
      {showSuggestions && suggestions.length > 0 && (
        <ul
          style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            backgroundColor: '#fff',
            border: '1px solid #ccc',
            borderRadius: '0 0 10px 10px',
            listStyle: 'none',
            margin: 0,
            padding: 0,
            zIndex: 1000,
            maxHeight: '200px',
            overflowY: 'auto',
          }}
        >
          {suggestions.map((suggestion, index) => (
            <li
              key={index}
              onClick={() => handleSuggestionClick(suggestion)}
              style={{
                padding: '10px',
                cursor: 'pointer',
                borderBottom: '1px solid #ccc',
              }}
            >
              {suggestion}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
