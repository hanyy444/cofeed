export default {
    firebase: {
        apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
        authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
        projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
        storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
        messageSenderId: import.meta.env.VITE_FIREBASE_MESSAGE_SENDER_ID,
        appId: import.meta.env.VITE_FIREBASE_APP_ID
    }
}