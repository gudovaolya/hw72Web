import React from 'react';
import {NavLink} from 'react-router-dom';
import './MainNavItem.css';

const MainNavItem = (props) => (
    <li>
        <NavLink to={props.to} exact={props.exact}>
            {props.children}
        </NavLink>
    </li>
);

export default MainNavItem;

