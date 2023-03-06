import { firestore } from 'firebase/index'
import { createAsyncThunk } from '@reduxjs/toolkit'

import {
    query,
    doc,
    orderBy,
    limit,
    collection,
    getDoc,
    serverTimestamp,
    addDoc,
    updateDoc,
    arrayUnion,
    where,
    setDoc,
} from 'firebase/firestore'

const CHATS_COLLECTION_REF = collection(firestore, `chats`)
const USER_CHATS_COLLECTION_REF = collection(firestore, `userChats`)

export const getUserChats = ({ userId }) => {
    return query(
        USER_CHATS_COLLECTION_REF,
        where('userId', '==', userId)
    )
}

const createNewUserChat = async ({ id, chatId, userId, userIds, lastMessage }) => {
    try {
        const newUserChat = await setDoc(doc(firestore, `/userChats/${id}`), {
            id,
            chatId,
            userId,
            userIds,
            lastMessage,
            createdAt: serverTimestamp()
        })
        return newUserChat
    } catch (error) {
        console.log(error)
        throw new Error(error.message)
    }
}

export const createNewChat = createAsyncThunk(
    'userChats/createNewChat',
    async ({ userId, userIds = [], message = {} }, { rejectWithValue }) => {
        // for each user participated, return a ref to user chat doc
        const users = [userId, ...userIds]
        const userChatDocs = users.map(_ => doc(USER_CHATS_COLLECTION_REF))

        const newChatRef = await addDoc(CHATS_COLLECTION_REF, {
            messages: [message],
            userChatsIds: userChatDocs.map(userChatDoc => userChatDoc.id)
        })

        // if (!newChat.exists) throw new Error('Chat creation failed!')

        // Rest of users in chat except creator
        Promise.all(userChatDocs.map(async (userChatDoc, idx) => {
            // all users except target user
            const uId = users[idx]
            const uIds = users.filter(id => id !== uId)
            await createNewUserChat({
                id: userChatDoc.id,
                chatId: newChatRef.id,
                userId: uId,
                userIds: uIds,
                lastMessage: message
            })
        }))

        const chat = (await getDoc(newChatRef)).data()

        return {
            chatId: newChatRef.id,
            ...chat
        }
    }
)

export const sendFirebaseMessage = async ({ chatId, content, senderId }) => {

    const chatRef = doc(firestore, `/chats/${chatId}`)

    const message = {
        content,
        createdAt: new Date().getTime(),
        sender: senderId
    }

    // update chat
    await updateDoc(chatRef, {
        messages: arrayUnion(message)
    })

    const chatDoc = (await getDoc(chatRef)).data()

    // update user chats 
    const userChatsIds = chatDoc.userChatsIds

    userChatsIds.forEach(async userChatId => {
        const userChatRef = doc(firestore, `/userChats/${userChatId}`)
        await updateDoc(userChatRef, {
            lastMessage: message
        })
    })

}

export const getChatMessages = async ({ chatId }) => {
    try {
        const chat = doc(CHATS_COLLECTION_REF, chatId)
        if (!chat.exists) throw new Error('No chat exists!')
        return chat.messages
    } catch (error) {
        // console.log(error)
        throw new Error(error.message)
    }
}

