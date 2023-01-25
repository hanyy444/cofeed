import './user-details.component.scss'
import User from '../user/user.component'
import FollowButton from '../button/follow-button/follow-button.component'
import UserDetail from '../user-detail/user-detail.component'  
import { FaBriefcase, FaUserFriends, FaThumbsUp, FaMapMarker, FaEye } from 'react-icons/fa'

const UserDetails = ({ userId, picturePath, firstName, 
    lastName, occupation, imageHeight = '45px', 
    imageWidth = '45px', friends, impressions, 
    location, viewedProfile}) => {

    const details = [
        { icon: <FaBriefcase/>, text: occupation},
        { icon: <FaUserFriends/>, text: `${friends.length} friends`},
        { icon: <FaThumbsUp/>, text: `${impressions} impressions`},
        { icon: <FaMapMarker/>, text: location},
        { icon: <FaEye/>, text: `${viewedProfile} viewed your profile`},
    ]

    return (
        <div className="user-details">
            <User 
                userId={userId}
                picturePath={picturePath}
                firstName={firstName}
                lastName={lastName}
                imageWidth={imageHeight}
                imageHeight={imageWidth}
            />
            
            <FollowButton friendId={userId}/>

            {details.map((detail, idx) => ( <UserDetail key={`detail-${idx}`} {...detail} /> ))}
        </div>
  )
}

export default UserDetails