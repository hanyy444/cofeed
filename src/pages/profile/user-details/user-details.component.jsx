import './user-details.component.scss'
import UserDetail from './user-detail/user-detail.component'  
import { FaBriefcase, FaUserFriends, FaThumbsUp, FaMapMarker, FaEye, FaBookmark } from 'react-icons/fa'
import { useMemo } from 'react'
import {  useSelector } from 'react-redux'
import { selectPostsCount } from 'redux/slices/posts.slice'

const UserDetails = ({ occupation, impressions, 
    friends, location, viewedProfile}) => {

    const postsCount = useSelector(selectPostsCount)

    const details = useMemo(() => [
        { icon: <FaBriefcase/>, text: occupation},
        { icon: <FaUserFriends/>, text: `${friends?.length} friends`},
        { icon: <FaThumbsUp/>, text: `${impressions} impressions`},
        { icon: <FaMapMarker/>, text: location},
        { icon: <FaEye/>, text: `${viewedProfile} viewed your profile`},
        { icon: <FaBookmark/>, text: `${postsCount} posts`}
    ])

    return (
        <div className="user-details">
            { details.map((detail, idx) => ( <UserDetail key={`detail-${idx}`} {...detail} /> )) }
        </div>
  )
}

export default UserDetails