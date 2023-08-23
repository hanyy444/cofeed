import { lazy, useCallback, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { selectPostError, selectPostStatus } from 'redux/slices/posts.slice'
import Subtitle from 'components/typography/subtitle/subtitle.component'
import MemoizedPosts from 'components/posts/posts.component'
import Feedback from 'components/display/feedback/feedback.component'
import Button from 'components/button'
import useToggle from 'hooks/useToggle'
import Spinner from 'components/display/spinner/spinner.component'

const PostModal = lazy(() => import('components/post-modal/post-modal.component'))

const PostsSection = ({ userId, isMe }) => {
    const [showModal, toggleShowModal] = useToggle(false)
    const onShowModal = useCallback(() => toggleShowModal(true), [])
    const [showFeedback, toggleShowFeedback] = useToggle(false)    

    const isLoading = useSelector(selectPostStatus) === 'pending'
    const postError = useSelector(selectPostError)

    useEffect(() => {
        let timeout; 
        if(postError) { 
            toggleShowFeedback(true)
            timeout = setTimeout(() => toggleShowFeedback(false), 2000)
        }
        return () => clearTimeout(timeout)
    }, [postError])

    return (
        <div className='posts-section'>
            {showFeedback && <Feedback message={postError?.message}/>}
            {showModal && <PostModal type='create' showModal={showModal} toggleShowModal={toggleShowModal}/>}
            <Subtitle>Posts</Subtitle>
            {isMe && 
                <Button onClick={onShowModal} isLoading={isLoading}>
                    Add new Post
                </Button>
            }
            <MemoizedPosts category='user_posts' userId={userId} />  
        </div>
    )
}

export default PostsSection