import './messages.page.scss'
import React, { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectAuth } from 'redux/slices/auth.slice'
import { selectFriends } from 'redux/slices/users.slice'
import { clearChat, selectChat } from 'redux/slices/user-chats.slice'

import useMediaQuery from 'hooks/useMediaQuery'

import User from 'components/display/user/user.component'
import MessagesList from './messages-list/messages-list.component'
import MessagesForm from './messages-form/messages-form.component'

import userApi from 'api/user/user-api'
import UserChatsList from './user-chats/user-chats.component'
import useToggle from 'hooks/useToggle'
import { FaArrowLeft } from 'react-icons/fa'
import WithStateHandler from 'utils/withStateHandler'
import { useNavigate } from 'react-router-dom'
import Paragraph from 'components/typography/paragraph/paragraph.component'

import { shallowEqual } from "react-redux"


const MessagesPage = (props) => {
    const navigate = useNavigate()
    const isPhone = useMediaQuery('(max-width: 43.75em)')
    const dispatch = useDispatch()
    const { token, user: sender } = useSelector(selectAuth, shallowEqual)

    const {data: friends, loading, error} = useSelector(selectFriends)
    
    const { data: chat } = useSelector(selectChat)
    const [isChat, toggleIsChat] = useToggle(chat?true:false)
    console.log(chat)
    const [receiver, setReceiever] = React.useState(chat?
        {
            _id: chat.recieverId,
            chatId: chat.chatId,
            ...friends.find(({_id}) => _id === chat.recieverId)
        }
        :null
    )  
    console.log(receiver)
    useEffect(()=>{
        dispatch(userApi.getUserFriends({
            token,
            path: `${sender?._id}/friends`
        }))
    },[])

    const handleReturn = useCallback(()=>{
        toggleIsChat(false)
        setReceiever(null)
        dispatch(clearChat())
    },[])

    const onClickUser = useCallback(()=> {
        navigate(`/profile/${receiver?._id}`)
    },[receiver?._id])

    return ( 
        <div className="messages" data-testid="messages">
            <WithStateHandler 
                data={friends} 
                loading={loading} 
                error={error} 
                fallback={
                    <Paragraph cName='default_message'>
                        Follow some friends and start chatting
                    </Paragraph>
                }
            >
                {
                    ((isPhone && !isChat) || (!isPhone)) && 
                    <UserChatsList 
                        sender={sender} 
                        receiver={receiver} 
                        setReceiever={setReceiever} 
                        toggleIsChat={toggleIsChat}
                        friends={friends}
                    />
                }
                {
                    isPhone && isChat &&
                    <FaArrowLeft onClick={handleReturn}/>
                }
                {
                    isPhone && receiver && isChat && 
                    <User 
                        imageHeight="35px"
                        imageWidth="35px"
                        imageUrl={receiver?.image?.url}
                        onClick={onClickUser}
                        {...receiver}
                    />
                }
                {   
                    receiver && isChat && 
                    <MessagesList 
                        sender={sender}
                        receiver={receiver}
                    />
                }
                {   
                    isChat && 
                    <MessagesForm 
                        sender={sender} 
                        receiverId={receiver?._id}
                        chatId={receiver?.chatId}
                    />
                }
            </WithStateHandler>
        </div>

    )
}

export default MessagesPage;

