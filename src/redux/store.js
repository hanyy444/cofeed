import { configureStore, combineReducers } from "@reduxjs/toolkit"
import storage from "redux-persist/lib/storage"
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER
} from "redux-persist"

import authReducer from "./slices/auth.slice"
import usersReducer from './slices/users.slice'
import postsReducer from "./slices/posts.slice"
import userChatsReducer from "./slices/user-chats.slice"

const persistConfig = {
    key: 'root',
    storage,
    version: 1
}

const appReducer = combineReducers({
    auth: authReducer,
    users: usersReducer,
    posts: postsReducer,
    userChats: userChatsReducer
})

const rootReducer = (state, action) => {
    if (action.type === 'LOGOUT') {
        return appReducer({}, action)
    }

    return appReducer(state, action)
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
    reducer: persistedReducer,
    // devTools: process.env.NODE_ENV !== 'production',
    middleware: (getDefaultMiddleware) => [...getDefaultMiddleware({
        serializableCheck: {
            ignoreActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
        }
    })]
})

export const persistor = persistStore(store)

