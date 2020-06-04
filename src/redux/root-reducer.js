//========================================
//  個々のReducerをまとめる
//  reducerをまとめる巨大なオブジェクト
//  キー：任意
//  value: 個々のReducer名
//========================================

import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import userReducer from './user/user.reducer';
import cartReducer from './cart/cart.reducer';
import directoryReducer from './directory/directory.reducer';
import shopReducer from './shop/shop.reducer';

const persistConfig = {
	key: 'root',
	storage,
	// 永続化したいreducerを書く
	whitelist: ['cart'],
};

const rootReducer = combineReducers({
	user: userReducer,
	cart: cartReducer,
	directory: directoryReducer,
	shop: shopReducer,
});

//  stateが出来上がる。 user, cartという名前で呼ぶ
// export default combineReducers({
// 	user: userReducer,
// 	cart: cartReducer,
// });
export default persistReducer(persistConfig, rootReducer);

//  stateのcartに入っているもの. cartReducerを参照
//  cart = {
// 	 hidden,
// 	 cartItem
//  }
