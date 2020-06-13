import ShopActionTypes from './shop.types';

export const updateCollections = (collectionsMap) => ({
	type: ShopActionTypes.UPDATE_COLLECTIONS,
	payload: collectionsMap,
});

//========================================
// 167. Adding Shop Data to Redux
//  redux.stateに保存する為に、action,reducer作成した
//
//
//
//========================================
