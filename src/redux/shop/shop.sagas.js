import {all, call, put, takeLatest} from 'redux-saga/effects';

import {db, convertCollectionsSnapshortToMap} from '../../firebase/firebase.utils';
import {collection, getDocs } from "firebase/firestore";

import ShopActionTypes from './shop.types';
import {
    fetchCollectionsSuccess,
    fetchCollectionsFailure,
} from './shop.actions';

export function* fetchCollectionsAsync(){
    try{
        const collectionRef = collection(db, "collections");
        const querySnapshot = yield getDocs(collectionRef)
        const collectionsMap = yield call(convertCollectionsSnapshortToMap, querySnapshot);
        yield put(fetchCollectionsSuccess(collectionsMap));
    }
    catch(error){
        yield put(fetchCollectionsFailure(error.message));
    }
}

export function* fetchCollectionsStart(){
    yield takeLatest(
        ShopActionTypes.FETCH_COLLECTIONS_START,
        fetchCollectionsAsync
    );
};

export function* shopSagas(){
    yield all([
        call(fetchCollectionsStart)
    ])
}