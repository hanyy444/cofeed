import React from 'react';
import './paragraph.component.scss'

const Paragraph = ({ children, cName = '' }) => {
    return ( 
        <p className={`paragraph ${cName}`} id="paragraph" data-testid="paragraph">
            {children}
        </p>
    )
}

export default Paragraph;

