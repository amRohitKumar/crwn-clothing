import ShopActionTypes from "./shop.types";

import {db, convertCollectionsSnapshortToMap} from '../../firebase/firebase.utils';
import {collection, getDocs } from "firebase/firestore";

export const fetchCollectionsStart = () => ({
    type: ShopActionTypes.FETCH_COLLECTIONS_START
});

export const fetchCollectionsSuccess = collectionsMap => ({
    type: ShopActionTypes.FETCH_COLLECTIONS_SUCCESS,
    payload: collectionsMap
});

export const fetchCollectionsFailure = errorMessage => ({
    type: ShopActionTypes.FETCH_COLLECTIONS_FAILURE,
    payload: errorMessage
})

export const fetchCollectionsStartAsync = () => {
    const fetchFunction = (dispatch) => {
        const collectionRef = collection(db, "collections");
        dispatch(fetchCollectionsStart());
        getDocs(collectionRef).then(querySnapshot => {
            const collectionsMap = convertCollectionsSnapshortToMap(querySnapshot);
            dispatch(fetchCollectionsSuccess(collectionsMap));
        })
        .catch(error => dispatch(fetchCollectionsFailure(error.message)))
    }
    return fetchFunction;
};