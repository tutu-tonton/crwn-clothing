//========================================
//  redux-reselector部分
//  stateから一部分の値のみを参照したい
//========================================

import { createSelector } from 'reselect';

//  input selector
//  state全体から一部を選択
//  root-reducerによりcartという名前がついた部分を選択。　state = user + cart
const selectCart = (state) => state.cart;

// stateのcartからさらにhidden部分のみを選択
export const selectCartHidden = createSelector([selectCart], (cart) => cart.hidden);

// stateのcartからさらにcartItems部分のみを選択
export const selectCartItems = createSelector([selectCart], (cart) => cart.cartItems);

// カート内の総アイテム数を計算
export const selectCartItemsCount = createSelector([selectCartItems], (cartItems) =>
	cartItems.reduce((accumulatedQuantity, cartItem) => accumulatedQuantity + cartItem.quantity, 0)
);

// カート内の総計を計算
export const selectCartTotal = createSelector([selectCartItems], (cartItems) =>
	cartItems.reduce((accumulatedQuantity, cartItem) => accumulatedQuantity + cartItem.quantity * cartItem.price, 0)
);
