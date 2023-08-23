import React from 'react';
import './spinner.component.scss'

export default function Spinner ({ radius = "1rem" }){
    return (
        <div 
            className= "spinner" 
            data-testid="spinner"
            style={{'--radius': radius}}
        />
    )
}

