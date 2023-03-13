import React from "react"
import { useSelector, useDispatch, shallowEqual } from "react-redux"
import { selectAuth } from "redux/slices/auth.slice"
import { postApi, selectPosts } from "redux/slices/posts.slice"

const usePosts = ({ path = '', query = '' }) => {

    const dispatch = useDispatch()

    const { token } = useSelector(selectAuth, shallowEqual)

    const {
        data: posts,
        count,
        loading,
        error,
        page
    } = useSelector(selectPosts, shallowEqual)

    const getPosts = React.useCallback(() =>
        dispatch(
            postApi.getAll({
                token,
                path,
                query
            })
        ),
        [path, query]
    )

    React.useEffect(() => {
        getPosts()
        return () => postApi.unRegister()
    }, [path, query])


    return [
        posts,
        count,
        loading,
        error,
        page
    ]
}

export default usePosts