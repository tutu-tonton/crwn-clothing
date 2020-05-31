//========================================
//  個々のReducerをまとめる
//  reducerをまとめる巨大なオブジェクト
//  キー：任意
//  value: 個々のReducer名
//========================================

import { combineReducers } from 'redux';

import userReducer from './user/user.reducer';
import cartReducer from './cart/cart.reducer';

export default combineReducers({
	user: userReducer,
	cart: cartReducer,
});
