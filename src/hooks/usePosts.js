import React from "react"
import { useSelector, useDispatch } from "react-redux"
import { postApi } from "../redux/slices/posts.slice"

//// THIS HOOK IS A STATE ACCESSING, API METHOD INVOKER WRAPPER AROUND POST API
const usePosts = ({ path = '', query = '' }) => {

    const dispatch = useDispatch()

    const { token } = useSelector(state => state.auth)

    const { data: posts,
        count,
        loading,
        error,
        page
    } = useSelector(state => state.posts.posts)

    const getPosts = React.useCallback(
        function () {
            dispatch(
                postApi.getAll({
                    token,
                    path,
                    query
                })
            )
        },
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