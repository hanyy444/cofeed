import './profile.page.scss'

import { useParams } from 'react-router-dom'
import { shallowEqual, useSelector } from 'react-redux'
import { selectAuthUser } from 'redux/slices/auth.slice'
import { selectPost, selectPostStatus } from 'redux/slices/posts.slice'
import { selectFriends, selectUser, userApi } from 'redux/slices/users.slice'

import Divider from 'components/display/divider/divider.component'
import User from 'components/display/user/user.component'
import FollowButton from 'components/button/follow-button/follow-button.component'
import UserDetails from './user-details/user-details.component'
import PostsSection from './posts-section'

import useQuery from 'hooks/useQuery'
import WithStateHandler from 'utils/withStateHandler'

const ProfilePage = (props) => {
    
    const { id: userId } = useParams()
    const authUser = useSelector(selectAuthUser)
    const isMe = userId === authUser?._id
    const newPostStatus = useSelector(selectPostStatus)
    const friendsStatus = useSelector(selectFriends)
    const currentUser = useQuery({
        selector: selectUser,
        thunk: { action: userApi.getSingle, params: { path: userId || '' } },
        extraDeps: [isMe, friendsStatus]
    })
    return ( 
        <div className="profile" data-testid="profile">
            {/* <WithStateHandler data={currentUser} loading={loading} error={error}> */}
                <User imageWidth="90px" imageHeight="90px" imageUrl={currentUser?.image?.url} {...currentUser} />
                {!isMe && <FollowButton userId={userId}/>}
                <UserDetails {...currentUser} />
                <Divider/>
                <PostsSection userId={userId} isMe={isMe} />
            {/* </WithStateHandler> */}
        </div>
    )
}

export default ProfilePage;

