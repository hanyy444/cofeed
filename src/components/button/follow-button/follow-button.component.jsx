import './follow-button.component.scss'
import { useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { selectAuth } from 'redux/slices/auth.slice'
import { selectFriends, userApi} from 'redux/slices/users.slice'
import WithStateHandler from 'utils/withStateHandler'

const FollowButton = ({ userId }) => {

    const dispatch = useDispatch()
    const { token, user: authUser } = useSelector(selectAuth)
    const {data: friends, loading, error } = useSelector(selectFriends)
    const isFriend = !!(friends.find(({_id})=>_id===userId))
    const handleFollow = useCallback(() => {
        dispatch(userApi.addRemoveFriend({ token, path: `${authUser._id}/friends/${userId}`}))
    }, [token, userId, authUser._id])

    return (
        <button 
            type="button"
            className={`follow-button ${!isFriend?'follow-button--friend':''}`}
            onClick={handleFollow}
            disabled={loading==='pending'}
        >
            <WithStateHandler data={{}} loading={loading} error={error}>
                {!isFriend ? 'Follow' : 'Unfollow'}
            </WithStateHandler>
        </button>
    )
}

export default FollowButton
