import { takeLatest, put, all, call } from "redux-saga/effects";

import UserActionTypes from "./user.types";
import { auth, googleProvider, createUserProfileDocument, signInWithPopup, signInWithEmailAndPassword, db, getCurrentUser, createUserWithEmailAndPassword } from "../../firebase/firebase.utils";
import { getDoc, doc } from "firebase/firestore";
import { signOut } from "firebase/auth";

import { 
    SignInSuccess, 
    SignInFailure,
    signOutError,
    signOutSuccess,
    signUpFailure,
    singUpSuccess
} from "./user.action";

export function *signInWithGoogle(){
    try{
        const {user} = yield signInWithPopup(auth, googleProvider);
        const docRef = yield call(createUserProfileDocument, user);
        const userSanpshot = yield call(getDoc, docRef);
        yield put(SignInSuccess({id: userSanpshot.id, ...userSanpshot.data()}));
    }catch(error){
        yield put(SignInFailure(error));
    }
}

export function *onGoogleSingInStart(){
    yield takeLatest(UserActionTypes.GOOGLE_SIGN_IN_START, signInWithGoogle);
};

export function *signInWithEmail({payload: {email, password}}){
    try{
        const {user} = yield signInWithEmailAndPassword(auth, email, password);
        const docRef = yield doc(db, "users", user.uid);
        const userSanpshot = yield call(getDoc, docRef);
        yield put(SignInSuccess({id: userSanpshot.id, ...userSanpshot.data()}));
    }catch(error){
        yield put(SignInFailure(error)); 
    }
}

export function *onEmailSignInStart(){
    yield takeLatest(UserActionTypes.EMAIL_SIGN_IN_START, signInWithEmail);
}

export function *isUserAuthenticated(){
    try{
        const userAuth = yield getCurrentUser();
        if(!userAuth) return;
        const docRef = yield call(createUserProfileDocument, userAuth);
        const userSanpshot = yield call(getDoc, docRef);
        yield put(SignInSuccess({id: userSanpshot.id, ...userSanpshot.data()}));
    }catch(error){
        yield put(SignInFailure(error));
    }
}

export function *onCheckUserSession(){
    yield takeLatest(UserActionTypes.CHECK_USER_SESSION, isUserAuthenticated);
}

export function *singOut(){
    try{
        yield call(signOut, auth);
        yield put(signOutSuccess());
    }catch(error){
        yield put(signOutError(error));
    }
};

export function *onSignOutStart(){
    yield takeLatest(UserActionTypes.SIGN_OUT_START, signOut);
};

function *singUp({payload: {email, password, displayName}}){
    try{
        const {user} = yield createUserWithEmailAndPassword(auth, email, password);
        yield createUserProfileDocument(user, {displayName});
        yield put(singUpSuccess({email,password}));
    }catch(error){
        yield put(signUpFailure(error));
    }
}

export function *onSignUpStart(){
    yield takeLatest(UserActionTypes.SIGN_UP_START, singUp);
}

export function *onSignUpSuccess(){
    yield takeLatest(UserActionTypes.SIGN_UP_SUCCESS, signInWithEmail);
}

export function *userSagas(){
    yield all([
        call(onGoogleSingInStart),
        call(onEmailSignInStart),
        call(onCheckUserSession),
        call(onSignOutStart),
        call(onSignUpStart),
        call(onSignUpSuccess)
    ])
};
