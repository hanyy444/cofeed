import React from 'react';
import './heading-2.component.scss'

const HeadingTwo = ({ children }) => {
    return ( 
        <h2 className= "heading-2" data-testid="heading-2">
            {children}
        </h2>
    )
}

export default HeadingTwo;

