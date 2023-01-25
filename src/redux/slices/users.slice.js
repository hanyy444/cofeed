import { createSlice } from "@reduxjs/toolkit"

import { createBuilderCases } from "./helper"

import userApi from "../../api/user/user-api"

const SLICE_NAME = 'users'

const initialState = {
    users: {
        data: [],
        count: 0,
        page: 0,
        loading: 'idle',
        error: null
    },
    user: {
        data: null,
        loading: 'idle',
        error: null
    },
    search: {
        data: [],
        count: 0,
        page: 0,
        loading: 'idle',
        error: null
    },
}

const usersSlice = createSlice({
    name: SLICE_NAME,
    initialState,
    reducers: {
        clearSearch: (state) => {
            state.search = {
                ...initialState.search
            }
        }
    },
    extraReducers: (builder) => {
        const { getAll, getSingle, search } = userApi
        createBuilderCases({ builder, thunk: getAll, stateProp: 'users' })
        createBuilderCases({ builder, thunk: getSingle, stateProp: 'user' })
        builder.addCase(search.pending, (state) => {
            state.search = {
                loading: 'pending'
            }
        })
        builder.addCase(search.fulfilled, (state, { payload }) => {
            state.search = {
                error: null,
                data: payload.users,
                loading: payload.status,
                count: payload.count,
                page: payload.page
            }
        })
        builder.addCase(search.rejected, (state, { error }) => {
            state.search = {
                loading: 'failure',
                error
            }
        })
    }
})

export { userApi }

export const { clearSearch } = usersSlice.actions

export default usersSlice.reducer