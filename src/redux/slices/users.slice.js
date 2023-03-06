import { createSlice } from "@reduxjs/toolkit"

import {
    createBuilderCases,
    objectDataState,
    arrayDataState,
} from "../helper"

import userApi from "api/user/user-api"

const SLICE_NAME = 'users'

export const selectUser = state => state.users.currentUser
export const selectFriends = state => state.users.friends
export const selectSearch = state => state.users.search
export const selectSuggestions = state => state.users.suggestions

const initialState = {
    friends: arrayDataState(),
    currentUser: objectDataState(),
    search: arrayDataState(),
    suggestions: arrayDataState()
}


const usersSlice = createSlice({
    name: SLICE_NAME,
    initialState,
    reducers: {
        clearSearch: (state) => {
            state.search = {
                ...initialState.search
            }
        },
        clearCurrentUser: (state) => {
            state.currentUser = {
                ...initialState.currentUser
            }
        }
    },
    extraReducers: (builder) => {
        const { getUserFriends, getSingle, search, getSuggestions, addRemoveFriend } = userApi
        createBuilderCases({ builder, thunk: getUserFriends, stateProp: 'friends', payloadProp: 'users' })
        createBuilderCases({ builder, thunk: addRemoveFriend, stateProp: 'friends', payloadProp: 'friends' })
        createBuilderCases({ builder, thunk: getSingle, stateProp: 'currentUser', payloadProp: 'user' })
        createBuilderCases({ builder, thunk: getSuggestions, stateProp: 'suggestions', payloadProp: 'users' })
        createBuilderCases({ builder, thunk: search, stateProp: 'search', payloadProp: 'users' })
    }
})

export { userApi }

export const { clearSearch, clearCurrentUser } = usersSlice.actions

export default usersSlice.reducer