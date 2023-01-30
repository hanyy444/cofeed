import { createSlice } from "@reduxjs/toolkit"

import { createBuilderCases } from './helper'

//// IMPORT all thunks from post API
import postApi from "../../api/post/post-api"

const SLICE_NAME = postApi.resource

const initialState = {
    posts: {
        data: [],
        count: 0,
        page: 0,
        loading: 'idle',
        error: null
    },
    post: {
        data: null,
        count: 1,
        page: 1,
        loading: 'idle',
        error: null
    }
}

const postsSlice = createSlice({
    name: SLICE_NAME,
    initialState,
    reducers: {},
    extraReducers: (builder) => {

        const { getAll, getSingle, post, put, patch, likePost } = postApi

        createBuilderCases({ builder, thunk: getAll, stateProp: 'posts' })
        createBuilderCases({ builder, thunk: getSingle, stateProp: 'post' })

        createBuilderCases({ builder, thunk: post, stateProp: 'posts' })
        createBuilderCases({ builder, thunk: put, stateProp: 'post' })
        createBuilderCases({ builder, thunk: patch, stateProp: 'post' })

        // Like post
        builder.addCase(likePost.fulfilled, (state, { payload }) => {
            state.posts.data =
                state.posts.data.map(post => {
                    if (post._id === payload.post._id) return payload.post
                    return post
                })
        })

    }
})

export { postApi };

export default postsSlice.reducer;
