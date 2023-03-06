import React from 'react';
import './icon-button.component.scss'

const IconButton = ({ children, classes, title, ...props}) => {
    return ( 
        <button 
            type="button" 
            className={`icon-button ${ classes ?? ''}`}  
            data-testid="icon-button"
            title={title}
            {...props}
        >
            {children}
        </button>
    )
}

export default IconButton;

