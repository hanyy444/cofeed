import './view-post-modal.component.scss'

// REACT/REDUX HOOKS
import { useEffect, useRef, useCallback } from "react"
import { useDispatch, useSelector } from "react-redux"

// ICONS
import { FaComment, FaHeart } from "react-icons/fa"

// CUSTOM HOOKS
import useToggle from "../../../hooks/useToggle"
import useClickOutside from "../../../hooks/useClickOutside"
import { postApi } from '../../../redux/slices/posts.slice'

// COMPOENENTS
import Spinner from "../../spinner/spinner.component"
import Subtitle from "../../subtitle/subtitle.component"
import User from "../../user/user.component"

const ViewPostModal = ({ 
    _id,
    showModal,
    toggleShowModal,
    handleLike
}) => {

    const dispatch = useDispatch()
    const { token } = useSelector(state => state.auth)
    const { data: post, loading, error } = useSelector(state => state.posts.post)
    const [isLikes, toggleIsLikes] = useToggle(true)

    const modalRef = useRef()
    const setModalOff = useCallback(() => {
        if(showModal) toggleShowModal(false)
    }, [showModal])
    useClickOutside(modalRef, setModalOff)

    useEffect(()=>{
        dispatch(postApi.getSingle({ token, url: _id }))
    }, [_id])

    
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
                imageWidth="60px"
                imageHeight="60px"
            />
            <div className="description">
                <Subtitle>Description</Subtitle>
                <p className="description__text">
                    {description}
                </p>
            </div>
            {/* <Divider/> */}
            <FaHeart 
                onClick={()=>toggleIsLikes(true)}
                style={{ justifySelf: 'flex-start', gridColumn: '8/9', cursor: 'pointer'}}/>
            <FaComment 
                onClick={()=>toggleIsLikes(false)}
                style={{ justifySelf: 'flex-end', gridColumn: '9/10', cursor: 'pointer'}}/>
            {
                isLikes ? (
                    <>
                        <div className="likes">
                            <Subtitle>Likes</Subtitle>
                            <ul>
                                {
                                    Object.keys(likes).map((like, idx) => (
                                        <li key={`like-${idx}`} className="like">{like}</li>
                                    ))
                                }
                            </ul>
                        </div>
                    </>
                ) : (
                    <>
                        <div className="comments">
                            <Subtitle>Comments</Subtitle>
                            <ul>                    
                                {
                                    comments.map((comment, idx) => (
                                        <li key={`comment-${idx}`}className="comment">{comment}</li>
                                    ))
                                }
                            </ul>
                        </div>
                    </>
                )
            }
        </div>
    )

}

export default ViewPostModal