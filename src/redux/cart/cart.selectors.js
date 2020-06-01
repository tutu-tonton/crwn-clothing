//========================================
//  redux-reselector部分
//  stateから一部分の値のみを参照
//========================================

import { createSelector } from 'reselect';

// input selector
// state全体から一部のみを選択
const selectCart = (state) => state.cart;

// const selectUser = state => state.user;

export const selectCartItems = createSelector([selectCart], (cart) => cart.cartItems);

export const selectCartItemsCount = createSelector([selectCartItems], (cartItems) =>
	cartItems.reduce((accumalatedQuantity, cartItem) => accumalatedQuantity + cartItem.quantity, 0)
);
