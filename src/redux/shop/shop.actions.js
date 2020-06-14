import ShopActionTypes from './shop.types';

import { firestore, convertCollectionSnapshotToMap } from '../../firebase/firebase.utils';

export const fetchCollectionsStart = () => ({
	type: ShopActionTypes.FETCH_COLLECTIONS_START,
});

// collectionsMap: オブジェクト形式に変換済みのデータ
export const fetchCollectionsSuccess = (collectionsMap) => ({
	type: ShopActionTypes.FETCH_COLLECTIONS_SUCCESS,
	payload: collectionsMap,
});

export const fetchCollectionsFailure = (errorMessage) => ({
	type: ShopActionTypes.FETCH_COLLECTIONS_FAILURE,
	payload: errorMessage,
});

export const fetchCollectionsStartAsync = () => {
	return (dispatch) => {
		const collectionRef = firestore.collection('collections');
		dispatch(fetchCollectionsStart());

		collectionRef
			.get()
			.then((snapshot) => {
				// convertCollectionSnapshotToMap: オブジェクト形式に変換する関数
				const collectionsMap = convertCollectionSnapshotToMap(snapshot);
				dispatch(fetchCollectionsSuccess(collectionsMap));
				// this.setState({ loading: false });
			})
			.catch((error) => dispatch(fetchCollectionsFailure(error.message)));
	};
};

// export const updateCollections = (collectionsMap) => ({
// 	type: ShopActionTypes.UPDATE_COLLECTIONS,
// 	payload: collectionsMap,
// });

//========================================
// 167. Adding Shop Data to Redux
//  redux.stateに保存する為に、action,reducer作成した
// 174. redux-thunk
// 	 redux-thunkにより非同期でaction dispatch
//   componentDidMount部分をredux-thunkへ移す
//
//
//========================================
