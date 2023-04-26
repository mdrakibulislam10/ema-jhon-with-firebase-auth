import React from 'react';
import "./Header.css";
import logo from "../../../src/images/Logo.svg"; // logo or any text
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <nav className='header'>
            <img src={logo} alt="" />

            <div>
                <Link to="/">shop</Link>
                <Link to="/orders">orders</Link>
                <Link to="/inventory">inventory</Link>
                <Link to="/login">login</Link>
                <Link to={"/login"}>Login</Link>
            </div>
        </nav>
    );
};

export default Header;