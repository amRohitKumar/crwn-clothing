import {initializeApp} from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore/lite';
 
const firebaseConfig = {
    apiKey: "AIzaSyCRMFFaETls_zC_YBcm9Af4NxXjWrsh2uU",
    authDomain: "crwn-clothing-306ab.firebaseapp.com",
    projectId: "crwn-clothing-306ab",
    storageBucket: "crwn-clothing-306ab.appspot.com",
    messagingSenderId: "19362077410",
    appId: "1:19362077410:web:48a52a9d027ccfbd86dcbb"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth();

const provider = new GoogleAuthProvider();
provider.setCustomParameters({prompt: 'select_account'});
export const singInWithGoogle = () => signInWithPopup(auth, provider);
