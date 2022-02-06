import {initializeApp} from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc, onSnapshot, collection, writeBatch } from 'firebase/firestore';
 
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
            console.log("Can't able to add user object ", error.message);
        }
    }
    return docRef;
}

export const convertCollectionsSnapshortToMap = collections => {
    const transformedCollection = collections.docs.map(doc => {
        const {title, items} = doc.data();
        return {
            routeName: encodeURI(title.toLowerCase()),
            id: doc.id,
            title,
            items
        }
    }); 
    return transformedCollection.reduce((accumulator, collection) => {
        accumulator[collection.title.toLowerCase()] = collection;
        return accumulator;
    }, {});
}

export const addCollectionAndItems = async (collectionKey, objectsToAdd) => {
    const collectionRef = collection(db, collectionKey);
    const batch = writeBatch(db);
    objectsToAdd.forEach(obj => {
        const newDocRef = doc(collectionRef);
        batch.set(newDocRef, obj);
    })
    await batch.commit();
}

export {onSnapshot, auth, createUserWithEmailAndPassword, db, signInWithEmailAndPassword, onAuthStateChanged};