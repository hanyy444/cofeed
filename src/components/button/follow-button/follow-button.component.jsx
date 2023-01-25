import './follow-button.component.scss'
import { useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { userApi } from '../../../redux/slices/auth.slice'

const FollowButton = ({ friendId }) => {

    const dispatch = useDispatch()
    const { token, user: { _id: userId, friends } } = useSelector(state=>state.auth)

    const isFriend = friends.includes(friendId)
    const isMe = userId === friendId

    const handleFollow = useCallback((friendId) => {
        dispatch(userApi.addRemoveFriend({ token, url: `${userId}/friends/${friendId}`}))
    }, [token, friendId, userId])

    return !isMe && (
        <button 
            type="button"
            className={`follow-button ${ isFriend ? 'follow-button--friend' : ''}`}
            onClick={() => handleFollow(friendId)}    
        >
            {isFriend ? 'Unfollow' : 'Follow'}
        </button>
    )
}

export default FollowButton
