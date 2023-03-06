import React from 'react'
import './profile.page.scss'

import { useParams } from 'react-router-dom'

// API
import { selectFriends, selectUser, userApi } from 'redux/slices/users.slice'

import useToggle from 'hooks/useToggle'

import WithStateHandler from 'utils/withStateHandler'

import Subtitle from 'components/typography/subtitle/subtitle.component'
import Divider from 'components/display/divider/divider.component'
import Posts from 'components/posts/posts.component'
import FormButton from 'components/button/form-button/form-button.component'
import PostModal from 'components/post-modal/post-modal.component'
import User from 'components/display/user/user.component'
import FollowButton from 'components/button/follow-button/follow-button.component'
import UserDetails from './user-details/user-details.component'
import useData from '../../hooks/useData'
import { useSelector } from 'react-redux'
import { selectAuth } from 'redux/slices/auth.slice'

const ProfilePage = (props) => {
    
    const { id: userId } = useParams()
    const { user: authUser } = useSelector(selectAuth)
    const isMe = userId === authUser?._id
    const {data: currentUser, loading, error} = useData({
        selector: selectUser,
        thunk: {
            action: userApi.getSingle,
            params: {
                path: userId || ''
            }
        }
    })
    
    const [showModal, toggleShowModal] = useToggle(false)

    return ( 
        <div className="profile" id="profile" data-testid="profile">
            <WithStateHandler data={currentUser} loading={loading} error={error}>
                {showModal && (<PostModal type="create" showModal={showModal} toggleShowModal={toggleShowModal}/>)}
                <User imageWidth="90px" imageHeight="90px" imageUrl={currentUser?.image.url} {...currentUser} />
                {!isMe && <FollowButton userId={userId}/>}
                <UserDetails {...currentUser} />
                <Divider/>
                <Subtitle>Posts</Subtitle>
                {isMe && <FormButton onClick={()=>toggleShowModal(true)}>Add New Post</FormButton>}
                <Posts category='user_posts' userId={userId} />    
            </WithStateHandler>
        </div>
    )
}

export default ProfilePage;

