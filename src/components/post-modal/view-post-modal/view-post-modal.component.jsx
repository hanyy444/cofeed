import './view-post-modal.component.scss'

import { useEffect, useRef, useCallback } from "react"
import { useDispatch, useSelector } from "react-redux"

import { FaComment, FaHeart } from "react-icons/fa"

import useToggle from "../../../hooks/useToggle"
import useClickOutside from "../../../hooks/useClickOutside"
import { postApi } from '../../../redux/slices/posts.slice'

import Spinner from "../../spinner/spinner.component"
import Subtitle from "../../subtitle/subtitle.component"
import User from "../../user/user.component"
import Divider from '@/components/divider/divider.component'
import Paragraph from '@/components/paragraph/paragraph.component'

const ViewPostModal = ({ 
    _id,
    showModal,
    toggleShowModal,
    isLiked,
    handleLike
}) => {

    const dispatch = useDispatch()
    const { token } = useSelector(state => state.auth)
    const { data: post, loading, error } = useSelector(state => state.posts.post)

    const modalRef = useRef()
    const setModalOff = useCallback(() => {
        if(showModal) toggleShowModal(false)
    }, [showModal])
    useClickOutside(modalRef, setModalOff)

    const getSingle = useCallback(() => dispatch (
        postApi.getSingle({ 
            token, 
            path: _id 
        })
    ), [token, _id])

    useEffect(() => { 
        getSingle()
    }, [_id, isLiked])

    
    if (loading === 'pending' || !post) return (
        <div className="view-post-modal">
            <Spinner/>
        </div>
    )

    if (loading === 'failure') return (
        <div className="view-post-modal">
            <p>ERROR!</p>
        </div>
    )

    const {
        userId,
        firstName,
        lastName,
        description,
        likes,
        comments,
        picturePath,
        userPicturePath
    } = post

    return post && (
        <div className="view-post-modal" ref={modalRef}>
            <img src={`http://localhost:3000/public/assets/${picturePath}`} alt="Post image" className="view-post-modal__img"/>
            <User 
                userId={userId}
                firstName={firstName}
                lastName={lastName}
                picturePath={userPicturePath}
                imageWidth="50px"
                imageHeight="50px"
            />
            <div className="view-post-modal__info">
                {description && <div className="description">
                    <Paragraph>{firstName} {lastName}</Paragraph> 
                    <p>{description}</p>
                </div>}
                <Divider/>
                <div className="likes-count">{Object.keys(likes).length} likes</div>
                <FaHeart color={`${isLiked ? '#fd1d60': ''}`} onClick={()=>handleLike(_id)}/>
                <FaComment 
                    onClick={()=>toggleIsLikes(false)}
                    style={{ justifySelf: 'flex-end', cursor: 'pointer'}}/>
                <ul className="comments">
                    {
                        comments.map((comment, idx) => (
                            <li key={`comment-${idx}`}className="comment">{comment}</li>
                        ))
                    }
                </ul>
            </div>
        </div>
    )

}

export default ViewPostModal