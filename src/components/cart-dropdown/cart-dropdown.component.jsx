//========================================
//  カートアイコンをクリックするとdropdown出てくる
//
//	redux-reselector必要
//  header.component >
//========================================

import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { withRouter } from 'react-router-dom';

import CustomButton from '../custom-button/custom-button.component';
import CartItem from '../cart-item/cart-item.component';
import { selectCartItems } from '../../redux/cart/cart.selectors';
import { toggleCartHidden } from '../../redux/cart/cart.action';

import './cart-dropdown.styles.scss';

// dispatch省略型
const CartDropdown = ({ cartItems, history, dispatch }) => (
	<div className="cart-dropdown">
		{/* カートにアイテムあれば商品情報表示 */}
		{/* カートに何もアイテムなければ文章表示 */}
		<div className="cart-items">
			{cartItems.length ? (
				cartItems.map((cartItem) => <CartItem key={cartItem.id} item={cartItem} />)
			) : (
				<span className="empty-message">Your cart is empty</span>
			)}
		</div>
		<CustomButton
			onClick={() => {
				history.push('/checkout');
				dispatch(toggleCartHidden());
			}}
		>
			GO TO CHECKOUT
		</CustomButton>
	</div>
);

const mapStateToProps = createStructuredSelector({
	cartItems: selectCartItems,
});

export default withRouter(connect(mapStateToProps)(CartDropdown));

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
