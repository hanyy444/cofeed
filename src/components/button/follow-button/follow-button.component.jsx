import Spinner from 'components/display/spinner/spinner.component'
import './follow-button.component.scss'
import { useCallback } from 'react'
import { useSelector, useDispatch} from 'react-redux'
import { selectAuthUser, selectAuthToken } from 'redux/slices/auth.slice'
import { userApi} from 'redux/slices/users.slice'
import { useState } from 'react'

const FollowButton = ({ userId, isFriend }) => {
    const dispatch = useDispatch()
    const token = useSelector(selectAuthToken)
    const { _id: authUserId } = useSelector(selectAuthUser)
    const [status, setStatus] = useState('idle')
    const handleFollow = useCallback(async () => {
        setStatus('pending')
        await dispatch(userApi.addRemoveFriend({ token, path: `${authUserId}/friends/${userId}`}))
        setStatus('idle')
    }, [token, userId, authUserId])

    let content;
    if (status === 'pending'){ content = <Spinner /> } 
    else { content = !isFriend ? 'Follow' : 'Unfollow' }

    return (
        <button 
            type="button"
            className={`follow-button ${!isFriend?'follow-button--friend':''}`}
            onClick={handleFollow}
            disabled={status==='pending'}
        >
            {content}
        </button>
    )
}

export default FollowButton
