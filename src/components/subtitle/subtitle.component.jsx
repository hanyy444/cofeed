import React from 'react';
import './subtitle.component.scss'

const Subtitle = ({ children }) => {
    return ( 
        <h4 className="subtitle" id="subtitle" data-testid="subtitle">
            {children}
        </h4>
    )
}

export default Subtitle;

