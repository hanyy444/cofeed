import React from 'react'
import './profile.page.scss'

import { useParams } from 'react-router-dom'

// API
import { selectUser, userApi } from 'redux/slices/users.slice'


import WithStateHandler from 'utils/withStateHandler'


import Divider from 'components/display/divider/divider.component'
import User from 'components/display/user/user.component'
import FollowButton from 'components/button/follow-button/follow-button.component'
import UserDetails from './user-details/user-details.component'
import useData from 'hooks/useData'
import { shallowEqual, useSelector } from 'react-redux'
import { selectAuth } from 'redux/slices/auth.slice'
import PostsSection from './posts-section'

const ProfilePage = (props) => {
    
    const { id: userId } = useParams()
    const { user: authUser } = useSelector(selectAuth, shallowEqual)
    const isMe = userId === authUser?._id
    const {data: currentUser, loading, error} = useData({
        selector: selectUser,
        thunk: {
            action: userApi.getSingle,
            params: {
                path: userId || ''
            }
        },
        extraDeps: [isMe]
    })

    return ( 
        <div className="profile" data-testid="profile">
            <WithStateHandler data={currentUser} loading={loading} error={error}>
                <User imageWidth="90px" imageHeight="90px" imageUrl={currentUser?.image.url} {...currentUser} />
                {!isMe && <FollowButton userId={userId}/>}
                <UserDetails {...currentUser} />
                <Divider/>
                <PostsSection userId={userId} isMe={isMe} />
            </WithStateHandler>
        </div>
    )
}

export default ProfilePage;

