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

// 正規化したことによりcollectionは配列ではなくなった
//
export const selectCollectionsForPreview = createSelector(
	[selectCollections],
	// object.keys オブジェクトのキーで配列を作る
	(collections) => (collections ? Object.keys(collections).map((key) => collections[key]) : [])
);

export const selectCollection = (collectionUrlParam) =>
	createSelector(
		[selectCollections],
		// データ正規化。オブジェクトに格納済み
		(collections) => (collections ? collections[collectionUrlParam] : null)
		// データ正規化前.　配列だからこれが使える
		// (collections) => collections.find((collection) => collection.id === COLLECTION_ID_MAP[collectionUrlParam])
	);

// データをfetch中かどうかを監視
export const selectIsCollectionFetching = createSelector([selectShop], (shop) => shop.isFetching);

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
