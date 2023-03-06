import React from "react"
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { selectAuth } from "redux/slices/auth.slice"
import postApi from "api/post/post-api"

const usePost = ({ post = {} }) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { token, user: { _id: authUserId, savedPosts } } = useSelector(selectAuth)

    // PROPS
    const postId = post?._id
    const postUserId = post?.userId
    const isLiked = Object.keys(post?.likes || {}).includes(authUserId)
    const isMine = authUserId === postUserId
    const isSaved = savedPosts.includes(postId)

    // METHODS
    const handleLike = React.useCallback(() => {
        dispatch(postApi.likePost({ token, path: `${postId}/like` }))
    }, [postId])
    const onClickUser = React.useCallback(() => navigate(`/profile/${postUserId}`), [postUserId])
    const onClickSave = React.useCallback((event) => {
        event.stopPropagation()
        dispatch(postApi.savePost({
            token,
            path: `${postId}/save`
        }))
    }, [])

    return {
        isLiked,
        handleLike,
        isMine,
        isSaved,
        onClickUser,
        onClickSave
    }
}

export default usePost