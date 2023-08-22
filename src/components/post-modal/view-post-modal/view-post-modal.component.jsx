import React from 'react'
import './view-post-modal.component.scss'

import { FaBookmark, FaComment, FaEdit, FaHeart } from "react-icons/fa"

import Subtitle from 'components/typography/subtitle/subtitle.component'
import User from "components/display/user/user.component"
import IconButton from 'components/post-modal/icon-button/icon-button.component'
import Divider from 'components/display/divider/divider.component'

import Comments from './comments/comments.component'
import AddCommentForm from './add-comment-form/add-comment-form.component'

const ViewPostModal = ({ post, setModalType, isLiked, handleLike, isMine, isSaved, onClickUser, onClickSave }) => {
    const onClickEdit = React.useCallback((event) => {
        event.stopPropagation()
        if(!isMine) return
        setModalType("edit")
    },[])
    
    return post && (
        <div className='view-post-modal' data-testid="view-post-modal" aria-label='view post modal'>
            {
                isMine ? <IconButton title='Edit post' onClick={onClickEdit}>
                    <FaEdit/>
                </IconButton> 
                : <IconButton title={isSaved?'Unsave post':'Save post'} onClick={onClickSave}>
                    <FaBookmark className={isSaved?'saved':''}/>
                </IconButton>
            }
            <div className="image-box">
                <img src={post.image.url} 
                    alt="Post image"
                    />
            </div>
            <User firstName={post.firstName}
                lastName={post.lastName}
                imageUrl={post.userImageUrl}
                imageWidth="50px"
                imageHeight="50px"
                onClick={onClickUser}
            />
            <div className="view-post-modal__info">
                {post.description && <div className="description">
                    <Subtitle>{post.firstName} {post.lastName}</Subtitle> 
                    <p>{post.description}</p>
                </div>}
                <Divider/>
                <FaHeart className={`like-icon ${isLiked ? 'liked': ''}`} onClick={handleLike}/>
                <span className="count">{Object.keys(post.likes || {}).length}</span>
                <FaComment />
                <span className="count">{post.comments?.length}</span>
                <Comments comments={post.comments} onClickUser={onClickUser}/>
            </div>
            <AddCommentForm postId={post._id}/>
        </div>
    )

}

export default ViewPostModal