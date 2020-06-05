//========================================
//  reselector
//  stateの内、一部の値のみを監視・メモ化
//
//  カテゴリの文字列とidの数値を対応させる　COLLECTION_ID_MAP
//
//========================================

import { createSelector } from 'reselect';

// データ正規化によりいらなくなる
// const COLLECTION_ID_MAP = {
// 	hats: 1,
// 	sneakers: 2,
// 	jackets: 3,
// 	womens: 4,
// 	mens: 5,
// };

const selectShop = (state) => state.shop;

export const selectCollections = createSelector([selectShop], (shop) => shop.collections);

export const selectCollection = (collectionUrlParam) =>
	createSelector(
		[selectCollections],
		// データ正規化。オブジェクトに格納済み
		(collections) => collections[collectionUrlParam]
		// データ正規化前
		// (collections) => collections.find((collection) => collection.id === COLLECTION_ID_MAP[collectionUrlParam])
	);

//========================================
// const SHOP_DATA = [
// 	{
// 		id: 1,
// 		title: 'Hats',
// 		routeName: 'hats',
// 		items: [
// 			{
// 				id: 1,
// 				name: 'Brown Brim',
// 				imageUrl: 'https://i.ibb.co/ZYW3VTp/brown-brim.png',
// 				price: 25,
// 			},
