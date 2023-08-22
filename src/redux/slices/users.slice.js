import { createSlice } from "@reduxjs/toolkit"
import { createBuilderCases } from "../helper"
import userApi from "api/user/user-api"

const SLICE_NAME = 'users'

export const selectUser = state => state.users.currentUser.data

// FRIENDS
export const selectFriends = state => state.users.friends.data
export const selectFriendsStatus = state => state.users.friends.status
export const selectFriendsError = state => state.users.friends.error

// SUGGESTIONS
export const selectSuggestions = state => state.users.suggestions.data
export const selectSuggestionsStatus = state => state.users.suggestions.status
export const selectSuggestionsError = state => state.users.suggestions.error

// SEARCH
export const selectSearch = state => state.users.search.data
export const selectSearchStatus = state => state.users.search.status
export const selectSearchError = state => state.users.search.error
export const selectSearchCount = state => state.users.search.count
export const selectSearchPage = state => state.users.search.page

const initialState = {
    friends: {
        data: [],
        count: 0,
        page: 0,
        status: 'idle', // 'idle' | 'loading' | 'sucess' | 'failure',
        error: null
    },
    currentUser: {
        data: {},
        status: 'idle',
        error: null
    },
    search: {
        data: [],
        count: 0,
        page: 0,
        status: 'idle', // 'idle' | 'loading' | 'sucess' | 'failure',
        error: null
    },
    suggestions: {
        data: [],
        count: 0,
        page: 0,
        status: 'idle', // 'idle' | 'loading' | 'sucess' | 'failure',
        error: null
    }
}


const usersSlice = createSlice({
    name: SLICE_NAME,
    initialState,
    reducers: {
        clearSearch: (state) => { state.search = initialState.search },
        clearCurrentUser: (state) => { state.currentUser = initialState.currentUser }
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