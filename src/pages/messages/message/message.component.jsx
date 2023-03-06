import React from 'react';
import './message.component.scss'

function getFormattedTime(milliseconds){
    const date = new Date(milliseconds)
    const hours = date.getHours()
    const minutes = date.getMinutes()
    const time = `${hours<10 ? `0${hours}`:hours}:${minutes<10 ? `0${minutes}`:minutes}`
    return time
}

const Message = ({ content, createdAt, userImageUrl, extraClasses = '' }) => {

    const messageTime = getFormattedTime(createdAt)

    return <li className={`message ${extraClasses}`} data-testid="message">
        <img src={userImageUrl} alt="user photo"/>
        <p>{content}</p>
        <span className='message__time'>{messageTime}</span>
    </li>
}

export default Message;

