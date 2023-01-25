// DEALS DIRECTILY WITH REDUX
import { useCallback } from "react"
import { useDispatch } from "react-redux"
// import {
//     fetchPosts,
//     fetchFollowing,
//     fetchPopular,
//     fetchNewest,
//     fetchUserPosts
// } from "../redux/slices/posts.slice"

import switchFunc from "../../utils/methods/switch-function"

const BASE_PATH = 'http://localhost:3000/api/v1/posts'

// // ALL
// const getPosts = (dispatch, headers) => {
//     dispatch(fetchPosts({
//         method: 'GET',
//         url: BASE_PATH,
//         headers
//     }))
// }

// // ME
// const getFollowing = (dispatch, headers) => {
//     dispatch(fetchFollowing({
//         method: 'GET',
//         url: `${BASE_PATH}`,
//         headers
//     }))
// }

// // NO RESPECT
// const getPopular = (dispatch, headers) => {
//     dispatch(fetchPopular({
//         method: 'GET',
//         url: `${BASE_PATH}`,
//         headers
//     }))
// }

// // NO RESPECT
// const getNewest = (dispatch, headers) => {
//     dispatch(fetchNewest({
//         method: 'GET',
//         url: `${BASE_PATH}`,
//         headers
//     }))
// }

// // USER
// const getUserPosts = (dispatch, headers, userId) => {
//     dispatch(fetchUserPosts({
//         method: 'GET',
//         url: `${BASE_PATH}/${userId}/posts`,
//         headers
//     }))
// }

// export const postApiProvider = {
//     getPosts,
//     getFollowing,
//     getPopular,
//     getNewest,
//     getUserPosts
// }

// // DEFINE POSTS METHODS
// // IF IN CUSTOM HOOKS, Each component that uses the hook will re-create new function definitions for each method
// const usePostApi = ({ token, params = {}, query = {} }) => {

//     const dispatch = useDispatch()

//     // A SWITCH OBJECT
//     const API = useMemo(
//         () => {
//             return {
//                 'ALL': getPosts,
//                 'FOLLOWING': getFollowing,
//                 'POPULAR': getPopular,
//                 'NEWEST': getNewest,
//                 'USER_POSTS': (userId) => getUserPosts(userId),
//                 'DEFAULT': getPosts
//             }
//         },
//         [getPosts, getFollowing, getPopular, getNewest, getUserPosts]
//     )

//     const callApi = useCallback(() => {
//         return (category) => {
//             switchFunc(API, category)
//         }
//     }, [API, category])

//     return [API, callApi]
// }

// export default usePostApi