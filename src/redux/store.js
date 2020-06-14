import { createStore, applyMiddleware } from 'redux';
import { persistStore } from 'redux-persist';
import logger from 'redux-logger';
import thunk from 'redux-thunk';

import rootReducer from './root-reducer';

// loggerは本番環境では出て欲しくない
// const middlewares = [logger];
const middlewares = [thunk];

if (process.env.NODE_ENV === 'development') {
	middlewares.push(logger);
}

export const store = createStore(rootReducer, applyMiddleware(...middlewares));

export const persistor = persistStore(store);

export default { store, persistor };

//========================================
// 174. redux-thunk
// 	 redux-thunkにより非同期でaction dispatch
//   componentDidMount部分をredux-thunkへ移す
//
//========================================
