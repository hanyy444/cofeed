import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
// import usePostsApi from "../api/post-api"
import { postApi } from "../redux/slices/posts.slice"

//// THIS HOOK IS A STATE ACCESSING, API METHOD INVOKER WRAPPER AROUND POST API
const usePosts = ({ userId = '', url = '', query = '' }) => {

    const dispatch = useDispatch()
    const { token } = useSelector(state => state.auth)
    const { data: posts, count, loading, error, page } = useSelector(state => state.posts.posts)
    const getPosts = (url, query) => { dispatch(postApi.getAll({ token, url, query })) }

    useEffect(() => {
        getPosts(url, query)
        return () => postApi.unRegister()
    }, [url, query])


    return [
        posts,
        count,
        loading,
        error,
        page
    ]
}

export default usePosts