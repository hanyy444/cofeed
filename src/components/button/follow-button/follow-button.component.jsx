import './follow-button.component.scss'
import { useCallback } from 'react'
import { useSelector, useDispatch, shallowEqual } from 'react-redux'
import { selectAuthUser, selectAuthToken } from 'redux/slices/auth.slice'
import { selectFriends, userApi} from 'redux/slices/users.slice'
import WithStateHandler from 'utils/withStateHandler'

const FollowButton = ({ userId }) => {

    const dispatch = useDispatch()
    const token = useSelector(selectAuthToken)
    const friends = useSelector(selectFriends)
    const isFriend = !!(friends.find(({_id})=>_id===userId))
    const { _id: authUserId } = useSelector(selectAuthUser)
    const handleFollow = useCallback(() => {
        dispatch(userApi.addRemoveFriend({ token, path: `${authUserId}/friends/${userId}`}))
    }, [token, userId, authUserId])

    return (
        <button 
            type="button"
            className={`follow-button ${!isFriend?'follow-button--friend':''}`}
            onClick={handleFollow}
            // disabled={loading==='pending'}
        >
            {!isFriend ? 'Follow' : 'Unfollow'}
        </button>
    )
}

export default FollowButton
