import './follow-button.component.scss'
import { useCallback } from 'react'
import { useSelector, useDispatch, shallowEqual } from 'react-redux'
import { selectAuth } from 'redux/slices/auth.slice'
import { selectFriends, userApi} from 'redux/slices/users.slice'
import WithStateHandler from 'utils/withStateHandler'

const FollowButton = ({ userId }) => {

    const dispatch = useDispatch()

    
    // CAUSES RE-RENDER: loading is global, friends change
    // const {data: friends, loading, error } = useSelector(selectFriends)
    // const isFriend = !!(friends.find(({_id})=>_id===userId))
    const { data: friends } = useSelector(selectFriends, shallowEqual)
    const isFriend = !!(friends.find(({_id})=>_id===userId))

    const { token, user: { _id: authUserId } } = useSelector(selectAuth, shallowEqual)
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
            {/* <WithStateHandler data={{}} loading={loading} error={error}> */}
                {!isFriend ? 'Follow' : 'Unfollow'}
            {/* </WithStateHandler> */}
        </button>
    )
}

export default FollowButton
