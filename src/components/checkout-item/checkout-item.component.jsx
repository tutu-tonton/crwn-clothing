//========================================
//  チェックアウトページ
//  カートに入っているアイテムを表示 <- 一列分
//  画像・アイテム名・数量・価格・取り消す
//  > checkout.component
//
//========================================

import React from 'react';

import './checkout-item.styles.scss';

const CheckoutItem = ({ cartItem: { name, imageUrl, price, quantity } }) => (
	<div className="checkout-item">
		<div className="image-container">
			<img src={imageUrl} alt="item" />
		</div>
		<span className="name">{name}</span>
		<span className="quantity">{quantity}</span>
		<span className="price">{price}</span>
		<span className="remove-button">&#10005;</span>
	</div>
);

export default CheckoutItem;
