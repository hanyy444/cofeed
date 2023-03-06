import { initializeApp } from "firebase/app";
import { getFirestore, snapshotEqual } from 'firebase/firestore'
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'

import config from "config";

const firebaseConfig = {
    ...config.firebase
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const firestore = getFirestore(app);
export const storage = getStorage(app)

const IMAGES_REF = 'images/'
export const uploadImage = async ({ userId, file }) => {
    try {
        const [fileName, fileType] = file.name.split('.')
        const imageRef = ref(storage, IMAGES_REF + fileName + userId + '.' + fileType)
        const { metadata, ref: temp } = await uploadBytes(imageRef, file)
        const imageUrl = await getDownloadURL(imageRef)
        return imageUrl
    } catch (error) {
        console.log(error)
        throw new Error(error.message)
    }
}


export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = async () => {
    try {
        const res = await signInWithPopup(auth, googleProvider)
        return res.user
    } catch (error) {
        throw error;
    }
};;

export default app;
