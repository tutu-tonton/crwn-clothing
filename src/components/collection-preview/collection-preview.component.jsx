//========================================
//  カテゴリタイトル+4つの品物 が表示される個別コンポーネント <- 1組分
//  props: SHOP_DATA
//	shop.component >
//	> collection-item.component
//========================================

import React from 'react';

import CollectionItem from '../collection-item/collection-item.component';

import './collection-preview.styles.scss';

const CollectionPreview = ({ title, items }) => (
	<div className="collection-preview">
		{/* 商品カテゴリ名 */}
		<h1 className="title">{title.toUpperCase()}</h1>
		{/* 4つ分に絞る */}
		{/* それぞれのアイテム情報を子コンポに渡す */}
		<div className="preview">
			{items
				.filter((item, idx) => idx < 4)
				.map((item) => (
					<CollectionItem key={item.id} item={item} />
				))}
		</div>
	</div>
);

export default CollectionPreview;

//========================================
//  参考：
//  SHOP_DATA
//
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
// 			{
// 				id: 2,
// 				name: 'Blue Beanie',
// 				imageUrl: 'https://i.ibb.co/ypkgK0X/blue-beanie.png',
// 				price: 18,
// 			},
// 			{
// 				id: 3,
// 				name: 'Brown Cowboy',
// 				imageUrl: 'https://i.ibb.co/QdJwgmp/brown-cowboy.png',
// 				price: 35,
// 			},
// 			{
// 				id: 4,
// 				name: 'Grey Brim',
// 				imageUrl: 'https://i.ibb.co/RjBLWxB/grey-brim.png',
// 				price: 25,
// 			},
// 			{
// 				id: 5,
// 				name: 'Green Beanie',
// 				imageUrl: 'https://i.ibb.co/YTjW3vF/green-beanie.png',
// 				price: 18,
// 			},
