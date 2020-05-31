//========================================
//  dropdown内に表示
//  カートに入れた商品の画像・商品名・数量・価格　<- 個別、1列分
//  cart-dropdown.component >
//
//========================================

import React from 'react';

import './cart-item.styles.scss';

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
