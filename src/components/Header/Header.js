import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../App';
import logo from '../../images/logo.png';
import './Header.css';
const Header = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    return (
        <div className="header">
            <img src={logo} alt=""/>
            <nav>
                <Link to ="/Shop">Shop</Link>
                <Link to ="/Review">Order Review</Link>
                <Link to ="/Inventory">Manage Inventory</Link>
                <button className="btn" onClick={() => setLoggedInUser({})}>Sign Out</button>
                <h6 style={{color:'#03e9f4'}}>Email: {loggedInUser.email}</h6>
            </nav>
        </div>
    );
};

export default Header;