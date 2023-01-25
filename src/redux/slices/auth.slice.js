import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { userApi } from "./users.slice"

const initialState = {
    loading: 'idle', // 'idle' | 'loading' | 'sucess' | 'failure',
    token: null,
    user: null,
    error: null
}

export const logout = createAsyncThunk(
    "auth/logout",
    async function (_payload, thunkAPI) {
        thunkAPI.dispatch({ type: 'LOGOUT' })
        console.log('Logged out.')
    }
)


const createAddRemoveFriendBuilder = (builder, thunk) => {
    builder.addCase(thunk.pending, (state) => {
        state.loading = 'pending'
    })
    builder.addCase(thunk.fulfilled, (state, { payload }) => {
        state.loading = payload.status
        state.count = payload.count
        state.user.friends = payload.friends.map(friend => friend._id)
    })
    builder.addCase(thunk.rejected, (state, { error }) => {
        state.loading = 'failure'
        state.error = error
    })
}


const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setLogin: (state, { payload: { user, token } }) => {
            state.loading = 'success'
            state.user = user
            state.token = token
        },
        setLogout: (state) => {
            state.user = null
            state.token = null
        }
    },
    extraReducers: (builder) => {
        createAddRemoveFriendBuilder(builder, userApi.addRemoveFriend)
    }
})


//// ACTIONS
export { userApi }

export const { setLogin, setLogout } = authSlice.actions

export default authSlice.reducer