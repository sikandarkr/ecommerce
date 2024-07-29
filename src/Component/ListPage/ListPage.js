import React, { useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { debounce } from "lodash";
import { getUniversities } from '../../redux/actions/universities';
import Loader from '../Common/Loader/Loader';
import SearchBar from '../Common/SearchBar/SearchBar';
import SortDropDown from '../Common/SortDropDown/SortDropDown';
import Card from '../Common/Card/Card';
import './listpage.css';

const ListPage = () => {
  const dispatch = useDispatch();
  const universities = useSelector(state => state.universities);
  useEffect(() => {
    dispatch(getUniversities());
  }, [])

  return (
    <div className="container">
      <div className='pageHeader'>
        <div className='searchbar_container'>
          <SearchBar />
        </div>
        <div className='sortdropdown_container'>
          <SortDropDown />
        </div>
      </div>
      <div className='list-container'>
        {universities.data ? universities.data.map((item, index) => <Card name={item.name} country={item.country} index={index} item={item} key={index} />) : <Loader />}
      </div>
    </div>
  )
}


export default ListPage;