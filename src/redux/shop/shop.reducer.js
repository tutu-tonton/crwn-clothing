// import SHOP_DATA from './shop.data';

import ShopActionTypes from './shop.types';

const INITIAL_STATE = {
	// これは collections: [] の方がいいみたい？
	collections: null,
	// collections: SHOP_DATA,	// -> firestoreにデータを移したので削除
	isFetching: false,
	errorMessage: undefined,
};

const shopReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case ShopActionTypes.FETCH_COLLECTIONS_START:
			return {
				...state,
				isFetching: true,
			};
		case ShopActionTypes.FETCH_COLLECTIONS_SUCCESS:
			return {
				...state,
				isFetching: false,
				collections: action.payload,
			};
		case ShopActionTypes.FETCH_COLLECTIONS_FAILURE:
			return {
				...state,
				isFetching: false,
				errorMessage: action.payload,
			};

		// state.shopを更新
		// -> redux-thunkに移行
		// case ShopActionTypes.UPDATE_COLLECTIONS:
		// 	return {
		// 		...state,
		// 		collections: action.payload,
		// 	};
		default:
			return state;
	}
};

export default shopReducer;

//========================================
// 167. Adding Shop Data to Redux
//  redux.stateに保存する為に、action,reducer作成した
// 174. redux-thunk
// 	 redux-thunkにより非同期でaction dispatch
//   componentDidMount部分をredux-thunkへ移す
//
//
//========================================
