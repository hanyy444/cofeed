import './index.scss'
import { useCallback } from "react"
import { useNavigate } from "react-router-dom"
import FollowButton from 'components/button/follow-button/follow-button.component'
import User from "components/display/user/user.component"
import { selectFriends } from "redux/slices/users.slice"
import { useSelector } from "react-redux"

export default function Suggestion({ userId, imageUrl, firstName, lastName }) {
    const navigate = useNavigate()
    const friends = useSelector(selectFriends)
    const isFriend = !!(friends.find(({ _id }) => _id === userId))
    const onClickUser = useCallback(() => navigate(`/profile/${userId}`), [])
    return (
        <div className="suggestion">
            <User 
                userId={userId}
                imageUrl={imageUrl}
                firstName={firstName}
                lastName={lastName}
                onClick={onClickUser}
            />
            <FollowButton userId={userId} isFriend={isFriend} />
        </div>
    )
}
