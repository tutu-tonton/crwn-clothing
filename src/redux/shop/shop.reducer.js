import SHOP_DATA from './shop.data';

import ShopActionTypes from './shop.types';

const INITIAL_STATE = {
	collections: SHOP_DATA,
};

const shopReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		// state.shopを更新
		case ShopActionTypes.UPDATE_COLLECTIONS:
			return {
				...state,
				collections: action.payload,
			};
		default:
			return state;
	}
};

export default shopReducer;

//========================================
// 167. Adding Shop Data to Redux
//  redux.stateに保存する為に、action,reducer作成した
//
//
//
//========================================
