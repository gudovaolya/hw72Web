import React from 'react';
import './MainNav.css';
import MainNavItem from "./MainNavItem/MainNavItem";

const MainNav = (props) => (
    <nav className="main-nav">
        <ul>
            <MainNavItem to="/" exact>Dishes</MainNavItem>
            <MainNavItem to="/orders" exact>Orders</MainNavItem>
        </ul>
    </nav>
);

export default MainNav;