import './profile.page.scss'

import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectAuthUser } from 'redux/slices/auth.slice'

import Divider from 'components/display/divider/divider.component'

import PostsSection from './posts-section'
import UserSection from './user-section'


const ProfilePage = (props) => {
    
    const { id: userId } = useParams()
    const authUser = useSelector(selectAuthUser)
    const isMe = userId === authUser?._id

    return ( 
        <div className="profile" data-testid="profile">
            <UserSection userId={userId} isMe={isMe}/>
            <Divider/>
            <PostsSection userId={userId} isMe={isMe} />
        </div>
    )
}

export default ProfilePage;

