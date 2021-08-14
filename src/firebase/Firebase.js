import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
const config =
{
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: "photo-app-db-18733.firebaseapp.com",
    projectId: "photo-app-db-18733",
    storageBucket: "photo-app-db-18733.appspot.com",
    messagingSenderId: "950277745510",
    appId: "1:950277745510:web:27e9845c204ca144b9f6a7",
    measurementId: "G-0TP9P054GB"
};

export const createUserProfile = async (userAuth, additionalData)=>{
    if(!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);
    const snapShot = await userRef.get();
    if (!snapShot.exists){
        try{
        const {displayName, email} = userAuth;
        const createdAt = new Date();
        await userRef.set({displayName, email, createdAt, ...additionalData});
        }
        catch(err){
            console.log('Create profile fail: ', err.message);
        }
    }
    return userRef;
}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({prompt: 'select_account'});
export const singInWithGoogle = ()=> auth.signInWithPopup(provider);

export default firebase;