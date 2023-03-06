import { createSlice } from "@reduxjs/toolkit"
import { createNewChat } from 'api/user-chats/user-chats-api'
import { arrayDataState, objectDataState } from "../helper"

const initialState = {
    chats: arrayDataState(),
    chat: objectDataState()
}

export const selectUserChats = state => state.userChats.chats
export const selectChat = state => state.userChats.chat

const userChatsSlice = createSlice({
    name: 'userChats',
    initialState,
    reducers: {
        clearChat: (state) => {
            state.chat = {
                ...initialState.chat
            }
        },
        setChat: (state, { payload }) => {
            const { chatId, lastMessage, recieverId } = payload
            state.chat.data = {
                chatId,
                lastMessage,
                recieverId
            }
        }
    },
    extraReducers: (builder) => {
        builder.addCase(createNewChat.pending, (state) => {
            state.chat.loading = 'pending'
        })
        builder.addCase(createNewChat.fulfilled, (state, { payload }) => {
            state.chat.loading = 'success'
            state.chat.data = payload
            state.chat.error = null
            state.chat.loading = 'idle'
        })
        builder.addCase(createNewChat.rejected, (state, { error }) => {
            state.chat.loading = 'failure'
            state.chat.error = error
        })
    }
})
export const { setChat, clearChat } = userChatsSlice.actions
export default userChatsSlice.reducer