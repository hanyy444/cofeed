import React from 'react';
import './container.component.scss'

const Container = ({children}) => {
    return ( 
        <div className= "container" id="container" data-testid="container">
            {children}
        </div>
    )
}

export default Container;

