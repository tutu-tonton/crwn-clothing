//========================================
//  redux-reselector部分
//  stateから一部分の値のみを参照
//========================================

import { createSelector } from 'reselect';

// input selector
// state全体から一部のみを選択
const selectCart = (state) => state.cart;

// const selectUser = state => state.user;

// stateからcart.hidden部分のみを持ってくる
export const selectCartHidden = createSelector([selectCart], (cart) => cart.hidden);

// stateからcartItems部分のみを持ってくる
export const selectCartItems = createSelector([selectCart], (cart) => cart.cartItems);

// カート内の総アイテム数を計算
export const selectCartItemsCount = createSelector([selectCartItems], (cartItems) =>
	cartItems.reduce((accumalatedQuantity, cartItem) => accumalatedQuantity + cartItem.quantity, 0)
);

// 総計を計算
export const selectCartTotal = createSelector([selectCartItems], (cartItems) =>
	cartItems.reduce((accumalatedQuantity, cartItem) => accumalatedQuantity + cartItem.quantity * cartItem.price, 0)
);
