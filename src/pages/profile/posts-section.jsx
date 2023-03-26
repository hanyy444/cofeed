import Subtitle from 'components/typography/subtitle/subtitle.component'
import MemoizedPosts from 'components/posts/posts.component'
import FormButton from 'components/button/form-button/form-button.component'
import PostModal from 'components/post-modal/post-modal.component'
import Feedback from 'components/display/feedback/feedback.component'
import useToggle from 'hooks/useToggle'
import { shallowEqual, useSelector } from 'react-redux'
import { selectPost } from 'redux/slices/posts.slice'
import { useCallback, useEffect, useState } from 'react'
import Spinner from 'components/display/spinner/spinner.component'

const PostsSection = ({ userId, isMe}) => {
    const [showModal, toggleShowModal] = useToggle(false)
    const [showFeedback, toggleShowFeedback] = useToggle(false)
    
    const { data: post, loading, error } = useSelector(selectPost, shallowEqual)

    let timeout; 
    useEffect(()=>{
        if(error) { 
            toggleShowFeedback(true)
            timeout = setTimeout(()=>toggleShowFeedback(false), 2000)
        }
        return () => clearTimeout(timeout)
    }, [post])


    const onShowModal = useCallback(() => toggleShowModal(true), [])

    return (
        <div className='posts-section'>
            {showFeedback && <Feedback message={'Something went wrong!'}/>}
            {showModal && <PostModal post={post} type={modalType} showModal={showModal} toggleShowModal={toggleShowModal}/>}
            <Subtitle>Posts</Subtitle>
            {isMe && 
                <FormButton onClick={onShowModal} disabled={loading==='pending'}>
                    {loading === 'pending' ? <Spinner/> : 'Add New Post'}
                </FormButton>
            }
            <MemoizedPosts category='user_posts' userId={userId} />  
        </div>
    )
}

export default PostsSection