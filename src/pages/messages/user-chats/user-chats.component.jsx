import React from 'react';
import './user-chats.component.scss'

import User from 'components/display/user/user.component';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { getUserChats } from 'api/user-chats/user-chats-api';
import WithStateHandler from 'utils/withStateHandler';
import { setChat } from 'redux/slices/user-chats.slice';
import { useDispatch } from 'react-redux';

const truncateText = (text, size) => {
    return text?.length > size ? text?.slice(0, size - 1) + "…" : text;
}

const UserChatsList = ({ sender, receiver, setReceiever, friends, toggleIsChat }) => {

    const dispatch = useDispatch()

    const [userChats, loading, error] = useCollectionData(getUserChats({ userId: sender?._id }))

    const friendsWithChats = React.useMemo(() => {
        return friends?.map(friend => {
            let friendWithChat = { ...friend }
            userChats?.forEach(({ chatId, userIds, lastMessage }) => {
                if (userIds.includes(friend._id)) {
                    friendWithChat = {
                        chatId,
                        lastMessage,
                        ...friendWithChat
                    }
                }
            })
            return friendWithChat
        })
    }, [userChats, friends])

    const handleSelect = React.useCallback(({ friendId, chatId, lastMessage, ...friend}) => {
        setReceiever({
            _id: friendId, 
            chatId,
            ...friend
        })

        toggleIsChat(true)

        dispatch(setChat({
            chatId,
            lastMessage,
            recieverId: friendId
        }))
    }, [toggleIsChat])

    const renderedFriendsWithChats = friendsWithChats?.map(({ 
        _id: friendId, 
        chatId, 
        lastMessage, 
        ...friend 
    }) => (
            <div 
                key={`reciver-${friendId}`} 
                role="button"
                className={`user-chat ${receiver?._id === friendId ? 'active' : ''}`}
                onClick={() => handleSelect({
                    friendId, 
                    chatId, 
                    lastMessage, 
                    ...friend
                })}
            >
                <User 
                    imageHeight="35px"
                    imageWidth="35px"
                    imageUrl={friend?.image?.url}
                    {...friend}
                />
                <p className="last-message">{truncateText(lastMessage?.content, 15)}</p>
            </div>
        )
    )
    return ( 
        <div className="user-chats">
            <WithStateHandler 
                data={friendsWithChats}
                loading={loading?'pending':'success'}
                error={error}
            >
                {renderedFriendsWithChats}
            </WithStateHandler>
        </div>
    )
}

export default UserChatsList;

