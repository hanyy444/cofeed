import { lazy, useCallback, useEffect, useState } from 'react'
import { shallowEqual, useSelector } from 'react-redux'
import { selectPost } from 'redux/slices/posts.slice'
import Subtitle from 'components/typography/subtitle/subtitle.component'
import MemoizedPosts from 'components/posts/posts.component'
import Feedback from 'components/display/feedback/feedback.component'
import Button from 'components/button'
import useToggle from 'hooks/useToggle'

const PostModal = lazy(() => import('components/post-modal/post-modal.component'))

const PostsSection = ({ userId, isMe }) => {
    const [showModal, toggleShowModal] = useToggle(false)
    const onShowModal = useCallback(() => toggleShowModal(true), [])

    const [showFeedback, toggleShowFeedback] = useToggle(false)    
    const { loading, error } = useSelector(selectPost)
    useEffect(() => {
        let timeout; 
        if(error) { 
            toggleShowFeedback(true)
            timeout = setTimeout(() => toggleShowFeedback(false), 2000)
        }
        return () => clearTimeout(timeout)
    }, [error])

    return (
        <div className='posts-section'>
            {showFeedback && <Feedback message={error.message}/>}
            {showModal && <PostModal type='create' showModal={showModal} toggleShowModal={toggleShowModal}/>}
            <Subtitle>Posts</Subtitle>
            {isMe && 
                <Button onClick={onShowModal} disabled={loading==='pending'}>
                    Add new post
                </Button>
            }
            <MemoizedPosts category='user_posts' userId={userId} />  
        </div>
    )
}

export default PostsSection