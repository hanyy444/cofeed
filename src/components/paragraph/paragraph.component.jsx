import React from 'react';
import './paragraph.component.scss'

const Paragraph = ({ children, cName }) => {
    return ( 
        <div className={`paragraph ${cName}`} id="paragraph" data-testid="paragraph">
            {children}
        </div>
    )
}

export default Paragraph;

