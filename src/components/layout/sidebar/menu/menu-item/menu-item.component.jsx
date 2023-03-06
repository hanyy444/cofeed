import React from 'react';
import './menu-item.component.scss'

const MenuItem = ({ Icon, text, isActive, isPhone, navHandler }) => {
    return ( 
        <li 
            className={ `menu-item ${isActive ? 'active' : ''}`}
            data-testid="menu-item"
            onClick={navHandler}
            title={text}
        >
            <Icon />
            {!isPhone && <a>{text}</a>}
        </li>
    )
}

export default MenuItem;

