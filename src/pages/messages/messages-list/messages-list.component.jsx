import './messages-list.component.scss'

import React from 'react';
import Message from '../message/message.component'
import { FaSmileBeam } from 'react-icons/fa';

import { useDocumentData } from 'react-firebase-hooks/firestore';
import WithStateHandler from 'utils/withStateHandler'
import { doc } from 'firebase/firestore';
import { firestore } from 'firebase';
import { useDispatch, useSelector } from 'react-redux';
import { selectChat } from 'redux/slices/user-chats.slice';
import { clearChat } from 'redux/slices/user-chats.slice';

const MessagesList = ({ sender, receiver }) => {
    const dispatch = useDispatch()

    const messagesRef = React.useRef()

    const {data: currentChat} = useSelector(selectChat)
    
    const [chat, loading, error] = useDocumentData(doc(firestore, `/chats/${currentChat?.chatId}`))

    React.useEffect(()=>{
        messagesRef.current && (messagesRef.current.scrollTop = messagesRef.current.scrollHeight)
    },[chat])
    
    return ( 
        <WithStateHandler 
            data={chat?.messages} 
            loading={loading ? 'pending' : 'success'} 
            error={error}
            fallback={<p className='default_message'>Say Hi to {receiver?.firstName} <FaSmileBeam/> </p>}>
                <ul className="messages__list" ref={messagesRef}>
                    { 
                        chat?.messages.map((message, idx) => (
                            <Message 
                                key={`message-${idx}`}
                                userImageUrl={ message?.sender === sender?._id ? sender?.image?.url : receiver?.image?.url }
                                extraClasses={ message?.sender === sender?._id ? 'sender' : 'receiver'}
                                {...message}
                            />
                        ))
                    }
                </ul>
        </WithStateHandler>
    )
}

export default MessagesList;

