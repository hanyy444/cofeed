import React from "react"
import { useSelector, useDispatch } from "react-redux"
import { selectAuth } from "redux/slices/auth.slice"
import { postApi, selectPosts } from "redux/slices/posts.slice"

const usePosts = ({ path = '', query = '' }) => {

    const dispatch = useDispatch()

    const { token } = useSelector(selectAuth)

    const { data: posts,
        count,
        loading,
        error,
        page
    } = useSelector(selectPosts)

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