import Subtitle from 'components/typography/subtitle/subtitle.component'
import Posts from 'components/posts/posts.component'
import FormButton from 'components/button/form-button/form-button.component'
import PostModal from 'components/post-modal/post-modal.component'
import useToggle from 'hooks/useToggle'

const PostsSection = ({ userId, isMe}) => {
    const [showModal, toggleShowModal] = useToggle(false)

    return (
        <div className='posts-section'>
            {showModal && <PostModal type="create" showModal={showModal} toggleShowModal={toggleShowModal}/>}
            <Subtitle>Posts</Subtitle>
            {isMe && <FormButton onClick={()=>toggleShowModal(true)}>Add New Post</FormButton>}
            <Posts category='user_posts' userId={userId} />  
        </div>
    )
}

export default PostsSection