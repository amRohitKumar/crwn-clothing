import {initializeApp} from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc, onSnapshot } from 'firebase/firestore';
 
const firebaseConfig = {
    apiKey: "AIzaSyCRMFFaETls_zC_YBcm9Af4NxXjWrsh2uU",
    authDomain: "crwn-clothing-306ab.firebaseapp.com",
    projectId: "crwn-clothing-306ab",
    storageBucket: "crwn-clothing-306ab.appspot.com",
    messagingSenderId: "19362077410",
    appId: "1:19362077410:web:48a52a9d027ccfbd86dcbb"
};


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth();

const provider = new GoogleAuthProvider();
provider.setCustomParameters({prompt: 'select_account'});
export const singInWithGoogle = () => signInWithPopup(auth, provider);

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if(!userAuth) return;
    // console.log(gi)
    const docRef = doc(db, "users", userAuth.uid);
    const docSnap = await getDoc(docRef);
    if(!docSnap.exists()){
        const {displayName, email} = userAuth;
        const currDate = new Date();
        try{
            await setDoc(docRef, {
                displayName,
                email,
                currDate,
                ...additionalData
            })
        }catch(error){
            console.log("Can't abe to add user object ", error.message);
        }
    }
    return docRef;
}

export {onSnapshot, auth, createUserWithEmailAndPassword, db, signInWithEmailAndPassword};