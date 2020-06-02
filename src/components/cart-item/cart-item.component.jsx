//========================================
//  dropdown内に表示
//  カートに入れた商品の画像・商品名・数量・価格　<- 個別、1列分
//  props: カートに入ったアイテム　item
//  cart-dropdown.component >
//========================================

import React from 'react';

import './cart-item.styles.scss';

// ネストされたオブジェクトの分割代入
const CartItem = ({ item: { imageUrl, price, name, quantity } }) => (
	<div className="cart-item">
		<img src={imageUrl} alt="item" />
		<div className="item-details">
			<span className="name">{name}</span>
			<span className="price">
				{quantity} x ${price}
			</span>
		</div>
	</div>
);

export default CartItem;

//========================================
//  カートに入った商品情報
//
//========================================
// {
// 	id: 1,
// 	name: 'Brown Brim',
// 	imageUrl: 'https://i.ibb.co/ZYW3VTp/brown-brim.png',
// 	price: 25,
// },
