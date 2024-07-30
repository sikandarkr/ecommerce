import React, { useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { debounce } from "lodash";
import { Avatar, Badge, Space, Select } from 'antd';
import { useTranslation } from 'react-i18next'
import HorizontalScroll from '../HorizontalScroll/HorizontalScroll';

import './header.css';

const Header = () => {
    const dispatch = useDispatch();
    const { t,i18n } = useTranslation();
    const handleChange = (e) => {
        console.log(e.value); // { value: "lucy", key: "lucy", label: "Lucy (101)" }
        i18n.changeLanguage(e.value);
        // i18n.changeLanguage(e.value);
     };
    

    
    return (
        <>
            <header className="header">
                {/* <a href="/">Deliveroo</a> */}
                <Select
                    labelInValue
                    defaultValue={{
                        value: 'en',
                        label: 'select language',
                    }}
                    style={{
                        width: 80,
                    }}
                    onChange={handleChange}
                    options={[
                        {
                            value: 'en',
                            label: 'En',
                        },
                        {
                            value: 'hi',
                            label: 'हिंदी',
                        },
                    ]}
                />
                <div className="search-container">
                    <input type="" placeholder="Search Item" />
                    <button className="search-icon"><i className="fa fa-search" aria-hidden="true"></i></button>
                </div>
                <Badge count={9}>
                    <i className="fa fa-shopping-cart" aria-hidden="true"></i>
                </Badge>
                {/* <p>{t('home')}</p> */}
            </header>
            <HorizontalScroll />
        </>
    )
}


export default Header;