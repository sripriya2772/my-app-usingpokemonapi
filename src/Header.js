import React from 'react';
import { NavLink } from "react-router-dom";

const Header = () => {
    return (
        <div className="header">
            <div className="container">
                <div className="logo">
                    <NavLink to="/">Logo</NavLink>
                </div>
                <div className="navbar">
                    <ul>
                        <li>
                            <NavLink to="/" exact activeStyle={{ color: '#2a6496' }}>Home</NavLink>
                        </li>
                    </ul>
                </div>
                <div className="clear"></div>
            </div>
        </div>
    );
}

export default Header;
