import { createSlice, createAsyncThunk, createDraftSafeSelector } from "@reduxjs/toolkit"
import { userApi } from "./users.slice"
import { postApi } from "./posts.slice"
import { objectDataState } from "../helper"

const initialState = {
    token: null,
    user: objectDataState()
}

// export const selectAuth = createDraftSafeSelector(state => state, state => ({
//     token: state.auth.token,
//     user: state.auth.user?.data
// }))

export const selectAuth = state => ({
    token: state.auth.token,
    user: state.auth.user?.data
})

export const logout = createAsyncThunk(
    "auth/logout",
    async function (_payload, thunkAPI) {
        thunkAPI.dispatch({ type: 'LOGOUT' })
        console.log('Logged out.')
    }
)

export const logoutFromFirebase = () => { }

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setLogin: (state, { payload: { status, user, token } }) => {
            state.user.error = null
            state.user.loading = status
            state.user.data = user
            state.token = token
        },
        setLogout: (state) => {
            state.user = null
            state.token = null
        }
    },
    extraReducers: (builder) => {
        // builder.addCase(userApi.googleSignIn.pending, (state) => {
        //     state.loading = 'pending'
        // })
        // builder.addCase(userApi.googleSignIn.fulfilled, (state, { payload }) => {
        //     console.log(payload)
        //     state.loading = payload.status
        //     state.user = payload.user
        // })
        // builder.addCase(userApi.googleSignIn.rejected, (state, { error }) => {
        //     state.loading = 'failure'
        //     state.error = error
        // })

        builder.addCase(postApi.savePost.fulfilled, (state, { payload }) => {
            state.user = {
                ...state.user,
                data: payload.user,
            }
        })
    }
})


//// ACTIONS
export { userApi }

export const { setLogin, setLogout } = authSlice.actions

export default authSlice.reducer