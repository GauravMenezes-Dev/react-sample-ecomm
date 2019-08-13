import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyA5JuNW8UzuF-keyU2a34GRGh73SKp5BgM",
    authDomain: "sampleapp-4e2b4.firebaseapp.com",
    databaseURL: "https://sampleapp-4e2b4.firebaseio.com",
    projectId: "sampleapp-4e2b4",
    storageBucket: "",
    messagingSenderId: "524849369507",
    appId: "1:524849369507:web:560d3d5812ef6288"
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const createUserProfileDoc = async(userAuth, addtnlData) => {
    if(!userAuth) return;
    const uRef= (firestore.doc(`users/${userAuth.uid}`))
    const snap = await uRef.get()
    if (!snap.exists){
        const {displayName,email} = userAuth;
        const createdAt = new Date();
        try {
            await uRef.set({
                displayName,
                email,
                createdAt,
                ...addtnlData
            })
        }
        catch(error){
            console.log(`Error: ${error}`)
        }
    }
    return uRef;
}
export const firestore = firebase.firestore();

/* Google Authentication */
const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({prompt: 'select_account'});
export const signInWithGoogle = () => auth.signInWithPopup(provider)

export default firebase;