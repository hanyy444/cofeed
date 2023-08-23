import { configureStore, combineReducers, createAction } from "@reduxjs/toolkit"
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
import logger from "redux-logger"

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

export const clearError = createAction('CLEAR_ERROR')

const rootReducer = (state, action) => {
    // TODO: clear only the infered error
    // if (action.type === 'CLEAR_ERROR') return appReducer({}, action)
    if (action.type === 'LOGOUT') return appReducer({}, action)
    return appReducer(state, action)
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
    reducer: persistedReducer,
    // devTools: process.env.NODE_ENV !== 'production',
    middleware: (getDefaultMiddleware) => [
        // process.env.NODE_ENV !== 'production' ? logger : undefined,
        ...getDefaultMiddleware({
            serializableCheck: {
                ignoreActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
            }
        })]
})

export const persistor = persistStore(store)

