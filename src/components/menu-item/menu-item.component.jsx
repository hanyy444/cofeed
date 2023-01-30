import React from 'react';
import './menu-item.component.scss'

const MenuItem = ({ icon, text, isActive, isPhone, navHandler }) => {
    return ( 
        <li 
            className={ `menu-item ${isActive ? 'active' : ''}`}
            id="menu-item" data-testid="menu-item"
            onClick={navHandler}
        >
            {icon}
            {!isPhone && <a>{text}</a>}
        </li>
    )
}

export default MenuItem;

