import { createSlice } from "@reduxjs/toolkit"
import { createBuilderCases } from '../helper'
import postApi from "api/post/post-api"

const SLICE_NAME = postApi.resource

export const selectPosts = state => state.posts.posts.data
export const selectPostsError = state => state.posts.posts.error
export const selectPostsCount = state => state.posts.posts.count
export const selectPostsStatus = state => state.posts.posts.status
export const selectPostsPage = state => state.posts.posts.page

export const selectPost = state => state.posts.post.data
export const selectPostStatus = state => state.posts.post.status
export const selectPostError = state => state.posts.post.error

const initialState = {
    posts: {
        data: [],
        count: 0,
        page: 0,
        status: 'idle', // 'idle' | 'loading' | 'sucess' | 'failure',
        error: null
    },
    post: {
        data: {},
        status: 'idle',
        error: null
    },
}

const postsSlice = createSlice({
    name: SLICE_NAME,
    initialState,
    reducers: {
        setPost: (state, { payload }) => {
            state.post.data = payload.post
        },
        clearPost: (state) => {
            state.post.data = null
            state.post.error = null
        },
        clearPosts: (state) => {
            state.posts = {
                ...initialState.posts
            }
        }
    },
    extraReducers: (builder) => {

        // REFACTOR: builder class for crud operations
        const { getAll, getSingle, post, put, patch, likePost, addComment } = postApi

        // Application??
        createBuilderCases({ builder, thunk: getAll, stateProp: 'posts', payloadProp: 'posts' })
        createBuilderCases({ builder, thunk: post, stateProp: 'post' })

        builder.addCase(post.fulfilled, (state, { payload }) => {
            state.posts.data.unshift(payload.post)
            state.post.status = payload.status
            state.post.error = null
        })

        createBuilderCases({ builder, thunk: getSingle, stateProp: 'post', payloadProp: 'post' })
        createBuilderCases({ builder, thunk: put, stateProp: 'post', payloadProp: 'post' })
        createBuilderCases({ builder, thunk: patch, stateProp: 'post', payloadProp: 'post' })

        // Business??
        builder.addCase(likePost.fulfilled, (state, { payload }) => {
            state.posts.data =
                state.posts.data.map(post => {
                    if (post._id === payload.post._id) return payload.post
                    return post
                })
        })

        builder.addCase(addComment.fulfilled, (state, { payload }) => {
            state.posts.data =
                state.posts.data.map(post => {
                    if (post._id === payload.post._id) return payload.post
                    return post
                })
        })
    }
})

export { postApi };

export const { setPost, clearPost, clearPosts } = postsSlice.actions

export default postsSlice.reducer;
