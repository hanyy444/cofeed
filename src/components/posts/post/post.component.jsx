import './post.component.scss'
import React from 'react';

import { FaHeart, FaCommentDots } from 'react-icons/fa'

import usePost from './usePost';
import useToggle from 'hooks/useToggle';

import User from 'components/display/user/user.component';
import PostModal from 'components/post-modal/post-modal.component';

const Post = ({ post }) => {
    
    const { isLiked, handleLike, onClickUser } = usePost({ post })
    
    const [showModal, toggleShowModal] = useToggle(false)

    const openModal = React.useCallback(()=>toggleShowModal(true), [])

    return post && (
        <>      
            {showModal && <PostModal post={post} showModal={showModal} toggleShowModal={toggleShowModal}/>}
            <div className="post" data-testid="post">
                <img 
                    src={post.image.url} 
                    alt="post image" 
                    className='post__img'
                    loading='lazy'
                    role="button"
                    onClick={openModal}
                />
                <div className="post__info">
                    <User
                        userId={post.userId}
                        firstName={post.firstName}
                        lastName={post.lastName}
                        imageUrl={post.userImageUrl}
                        onClick={onClickUser}
                    />
                    <div className="post__info-stats">
                        <div className="post__likes">
                            <FaHeart className={`${isLiked ? 'liked': ''}`} onClick={handleLike}/>
                            <span>{Object.keys(post.likes || {}).length}</span>
                        </div>
                        <div className="post__comments" onClick={openModal}>
                            <FaCommentDots/>
                            <span>{post.comments?.length}</span>
                        </div>
                    </div>
                </div>
            </div>
        </> 
    )
}

export default Post;

