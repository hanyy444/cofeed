import React from 'react';
import './paragraph.component.scss'

const Paragraph = ({ children, style, ...props }) => {
    return ( 
        <p className='paragraph' id="paragraph" data-testid="paragraph" style={style} {...props}>
            {children}
        </p>
    )
}

export default Paragraph;

