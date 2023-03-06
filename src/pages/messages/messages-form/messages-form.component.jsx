import React from 'react';
import './messages-form.component.scss'

import FormButton from 'components/button/form-button/form-button.component';
import Form from 'components/display/form/form.component';
import Spinner from 'components/display/spinner/spinner.component';
import { FaPaperPlane } from 'react-icons/fa';

import { sendFirebaseMessage } from 'api/user-chats/user-chats-api';
import { createNewChat } from 'api/user-chats/user-chats-api';

import { useDispatch, useSelector } from 'react-redux';
import { selectChat } from 'redux/slices/user-chats.slice';

const MessagesForm = ({ sender }) => {
    const dispatch = useDispatch()

    const [loading, setLoading] = React.useState(false)
    const [text, setText] = React.useState('')
    const changeText = React.useCallback((e)=>{
        setText(e.target.value)
    },[])

    const {data: currentChat} = useSelector(selectChat)
    
    const sendMessage = React.useCallback(async (e) => {
        // setLoading(true)
        e.preventDefault()
        if (text.trim() === '') return
        setText('')
        if(!currentChat?.chatId){
            dispatch(createNewChat({
                userId: sender?._id, 
                userIds: [currentChat?.recieverId], 
                message: {
                    content: text,
                    sender: sender?._id,
                    createdAt: new Date().getTime()
                }
            }))
        } else {
            await sendFirebaseMessage({
                chatId: currentChat?.chatId,
                content: text,
                senderId: sender?._id
            })
        }
        setLoading(false)
    }, [text, sender])

    return ( 
        <Form onSubmit={sendMessage} classes="messages__form" data-testid="messages-form">
            <input type="text" placeholder='Type something here...' value={text} onChange={changeText}/>
            <FormButton type='submit' disabled={loading}>
                {!loading ? <FaPaperPlane/> : <Spinner />}
            </FormButton>
        </Form> 
    )
}

export default MessagesForm;

