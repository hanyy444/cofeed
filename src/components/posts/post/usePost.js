import { useCallback, useMemo } from "react"
import { useNavigate } from "react-router-dom"
import { shallowEqual, useDispatch, useSelector } from "react-redux"
import { selectAuthUser, selectAuthToken } from "redux/slices/auth.slice"
import postApi from "api/post/post-api"


// props: postId, postUserId, likes, 
const usePost = ({ postId, postUserId, likes = {} }) => {

    // RE-rendered on new objects?? test
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const token = useSelector(selectAuthToken)
    const { _id: authUserId, savedPosts } = useSelector(selectAuthUser)

    // PROPS
    const isMine = authUserId === postUserId
    const isLiked = Object.keys(likes || {}).includes(authUserId)
    const isSaved = useMemo(() => savedPosts.includes(postId), [postId])

    // METHODS
    const handleLike = useCallback(() => {
        dispatch(postApi.likePost({ token, path: `${postId}/like` }))
    }, [postId])
    const onClickUser = useCallback(() => navigate(`/profile/${postUserId}`), [postUserId])
    const onClickSave = useCallback((event) => {
        event.stopPropagation()
        dispatch(postApi.savePost({ token, path: `${postId}/save` }))
    }, [postId])

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