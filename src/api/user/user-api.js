import { createAsyncThunk } from "@reduxjs/toolkit"
import { signInWithGoogle } from "firebase"
import { ApiCore } from "../core"

const resource = 'users'
const plural = 'users'
const single = 'user'

const userApi = ApiCore({
    getAll: true,
    getSingle: true,
    post: true,
    put: true,
    patch: true,
    delete: false,
    resource,
    plural,
    single
})

// CUSTOM

userApi.search = userApi.createThunk({
    resource,
    actionType: 'search',
    requestConfig: { method: 'GET' }
})

userApi.getSuggestions = userApi.createThunk({
    resource,
    actionType: 'getSuggestions',
    requestConfig: { method: 'GET' }
})

userApi.getUserFriends = userApi.createThunk({
    resource,
    actionType: 'getUserFriends',
    requestConfig: { method: 'GET' }
})

userApi.addRemoveFriend = userApi.createThunk({
    resource,
    actionType: 'addRemoveFriend',
    requestConfig: { method: 'PATCH' }
})

userApi.signInWithGoogle = signInWithGoogle

// userApi.googleSignIn = createAsyncThunk(
//     'auth/googleSignIn',
//     async (_payload, { rejectWithValue }) => {
//         try {
//             const user = await signInWithGoogle()
//             console.log(user)
//             return user
//         } catch (error) {
//             rejectWithValue(error)
//         }
//     }
// )

export default userApi