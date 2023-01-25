import './post.component.scss'
import { useDispatch, useSelector } from 'react-redux';

// ICONS
import { FaHeart, FaCommentDots } from 'react-icons/fa'

import { postApi } from '../../redux/slices/posts.slice';
import useToggle from '../../hooks/useToggle';
import PostModal from '../post-modal/post-modal.component';
import ViewPostModal from '../post-modal/view-post-modal/view-post-modal.component';
import User from '../user/user.component';

const IMAGE_BASE_PATH = 'http://localhost:3000/public/assets'

const Post = ({ 
        postId,
        userId,
        firstName,
        lastName,
        description,
        likes,
        comments,
        picturePath,
        userPicturePath }) => {

    
    const dispatch = useDispatch()
    const { token, user: { _id: currentUserId }} = useSelector(state => state.auth)

    const [showModal, toggleShowModal] = useToggle(false)
    
    const isLiked = Object.keys(likes).includes(currentUserId)

    const handleLike = (postId) => {
        dispatch(postApi.likePost({ token, url: `${postId}/like`}))
    }

    return ( 
        <div className= "post" data-testid="post">
            {showModal && (<PostModal>
                <ViewPostModal {...{_id: postId, toggleShowModal, showModal, handleLike}}/>
            </PostModal>)}
            <img 
                src={`${IMAGE_BASE_PATH}/${picturePath}`} 
                alt="post image" 
                className='post__img'
                onClick={()=>toggleShowModal(true)}
            />
            <div className="post__info">
                <User
                    userId={userId}
                    firstName={firstName}
                    lastName={lastName}
                    picturePath={`${userPicturePath}`}
                />
                <div className="post__info-stats">
                    <div className="post__likes">
                        <FaHeart color={`${isLiked ? '#fd1d60': ''}`} onClick={()=>handleLike(postId)}/>
                        <span className='likes-count'>{Object.keys(likes).length}</span>
                    </div>
                    <div className="post__comments">
                        <FaCommentDots/>
                        <span className="comments-count">{comments.length}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Post;

