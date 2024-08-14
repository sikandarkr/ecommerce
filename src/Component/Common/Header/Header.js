import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { debounce, uniqBy } from "lodash";
import { Avatar, Badge, Space, Select, AutoComplete, Button } from 'antd';
import { useTranslation } from 'react-i18next';
import { useNavigate, useLocation } from 'react-router-dom';
import { onSearch, onClear, fetchSuggestions, loadCartItems, fetchSearchResults, getProducts } from '../../../redux/actions/products';
import HorizontalScroll from '../HorizontalScroll/HorizontalScroll';
import logocolor from '../../../image/logocolor.png';
import './header.css';
const { Option } = Select;
const Header = () => {
    const { t, i18n } = useTranslation();
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();

    const [searchBy, setSearchBy] = useState('product');
    const suggestions = useSelector(state => state.products.suggestions);
    const cart = useSelector(state => state.products.cart);
    const isLoggedIn = useSelector(state => state.user.auth);
    const [menuVisible, setMenuVisible] = useState(false);
    const [searchValue, setSearchValue] = useState('');
    // const localCart = JSON.parse(localStorage.getItem('cart')) || [];
    const [localCart, setLocalCart] = useState(JSON.parse(localStorage.getItem('cart')) || []);
    const noHrscroll = ['/cartSummary','/orders','/admin'];
    const search = ['/'];



    const toggleMenu = () => {
        setMenuVisible(!menuVisible);
    };

    const handleLogin = () => {
        navigate('/login');
    };

    const handleLanguageChange = (value) => {
        i18n.changeLanguage(value);
    };
    const handleChange = (e) => {
        i18n.changeLanguage(e.value);
    };
    const handleSearch = (value) => {
        setSearchValue(value);
        if (value) {
            dispatch(fetchSuggestions(value));
        } else {
            dispatch(onClear());
        }
    };
    const handleSelect = (value) => {
        setSearchValue(value);
        // dispatch(onSearch(value));
    };
    const redirectHandler = () => {
        navigate('/cartSummary');
    }
    const SearchByFilter = () => {
        // console.log("Enter Key is pressed");
        dispatch(fetchSearchResults({ "searchKey": searchValue }));
    }

    const clearFilter = () => {
        setSearchValue('');
        dispatch(getProducts());
    }

    useEffect(() => {
        const fetchCartItems = async () => {
            try {
                if (isLoggedIn) {
                    // const cartItems = await fetchCartItemsFromApi();
                    // dispatch(loadCartItems(cartItems));
                } else {
                    const savedCartItems = JSON.parse(localStorage.getItem('cart') || '[]');
                    if (Array.isArray(savedCartItems)) {
                        dispatch(loadCartItems(savedCartItems));
                    }
                }
            } catch (error) {
                console.error('Failed to load cart items', error);
            }
        };

        fetchCartItems();
    }, [dispatch, isLoggedIn]);




    const uniqueSuggestions = uniqBy(suggestions, item => searchBy === 'product' ? item.product_name : item.product_store_name);
    return (
        <>
            <header className="header">
                <img src={logocolor} height="40px" width="40px" onClick={() => navigate('/')} />

                <Select
                    labelInValue
                    defaultValue={{
                        value: 'en',
                        label: 'select language',
                    }}
                    className='select-locale'
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
                {search.includes(location.pathname) && <div className="search-container">
                    <select
                        className="search-by-dropdown"
                        value={searchBy}
                        onChange={(e) => setSearchBy(e.target.value)}
                    >
                        <option value="product">Product</option>
                        <option value="store">Store</option>
                    </select>
                    <AutoComplete
                        className='auto-complete'
                        onSearch={debounce(handleSearch, 300)}
                        onSelect={handleSelect}
                        onKeyDown={SearchByFilter}
                        options={uniqueSuggestions.map(item => ({
                            value: searchBy === 'product' ? item.product_name : item.product_store_name,
                        }))}
                        placeholder="Search Item"
                        value={searchValue} // Bind searchValue to AutoComplete
                    />
                    {searchValue.length >= 3 && (
                        <button className='clear-filter' onClick={clearFilter}>
                            <i className='fa fa-times'></i>
                        </button>
                    )}
                    <button className="search-icon" onClick={SearchByFilter}>
                        <i className="fa fa-search" aria-hidden="true"></i>
                    </button>
                </div>}
                {cart.length > 0 && <Badge count={cart.length} onClick={redirectHandler} className='notification-badge'>
                    <i className="fa fa-shopping-cart" aria-hidden="true"></i>
                </Badge>}

                <i className="fa fa-bars menu-icon" aria-hidden="true" onClick={toggleMenu}></i>
            </header>

            <div className={`sidenav-overlay ${menuVisible ? 'visible' : ''}`} onClick={toggleMenu}>
                <div className={`sidenav ${menuVisible ? 'open' : ''}`} onClick={e => e.stopPropagation()}>
                    <a href="javascript:void(0)" className="closebtn" onClick={toggleMenu}>&times;</a>
                    <div className="sidenav-extra">
                        <div className="top-left-container">
                            <div className="logo">
                                <img src="https://via.placeholder.com/50" alt="Logo" />
                            </div>
                            <Badge count={cart.length} className="cart-badge">
                                <i className="fa fa-shopping-cart" aria-hidden="true"></i>
                            </Badge>
                        </div>
                        <Avatar size={64} icon={<i className="fa fa-user" />} />
                        <Button type="primary" block onClick={handleLogin}>Login</Button>
                        <Select defaultValue={i18n.language} style={{ width: '100%' }} onChange={handleLanguageChange}>
                            <Option value="en">English</Option>
                            <Option value="es">Español</Option>
                            <Option value="fr">Français</Option>
                            <Option value="de">Deutsch</Option>
                        </Select>
                        <Select defaultValue="Product" style={{ width: '100%' }} onChange={(value) => setSearchBy(value)}>
                            <Option value="product">Product</Option>
                            <Option value="store">Store</Option>
                        </Select>
                    </div>
                </div>
            </div>
            {!noHrscroll.includes(location.pathname) && <HorizontalScroll />}
        </>
    );
};

export default Header;


