import React from 'react';
import './form-button.component.scss'

const FormButton = ({ children, classes, ...props }) => 
    <button className={`form-button ${classes ?? ''}`} id="form-button" data-testid="form-button" {...props}>
        {children}
    </button>

export default FormButton;

