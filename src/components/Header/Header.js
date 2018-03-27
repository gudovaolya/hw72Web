import React from 'react';
import './Header.css';
import Logo from './Logo/Logo';
import MainNav from "./MainNav/MainNav";

const Header = () => (
    <header>
        <div className="container clearfix">
            <Logo />
            <MainNav/>
        </div>
    </header>
);

export default Header;