import { createSlice } from "@reduxjs/toolkit"

import { createBuilderCases } from '../helper'

import { objectDataState, arrayDataState } from "../helper"

import postApi from "api/post/post-api"

const SLICE_NAME = postApi.resource

export const selectPosts = state => state.posts.posts
export const selectPost = state => state.posts.post
export const selectPostsCount = state => state.posts.posts.count

const initialState = {
    posts: arrayDataState(),
    post: objectDataState(),
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

        const { getAll, getSingle, post, put, patch, likePost, addComment } = postApi

        createBuilderCases({ builder, thunk: getAll, stateProp: 'posts', payloadProp: 'posts' })
        createBuilderCases({ builder, thunk: post, stateProp: 'post' })

        builder.addCase(post.fulfilled, (state, { payload }) => {
            state.posts.data.unshift(payload.post)
            state.post.data = payload.post
            state.post.loading = payload.status
            state.post.error = null
        })

        createBuilderCases({ builder, thunk: getSingle, stateProp: 'post', payloadProp: 'post' })
        createBuilderCases({ builder, thunk: put, stateProp: 'post', payloadProp: 'post' })
        createBuilderCases({ builder, thunk: patch, stateProp: 'post', payloadProp: 'post' })

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
