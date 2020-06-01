import { createSelector } from 'reselect';

const selectUser = (state) => state.user;

// 想定：このユーザーはこういう商品をカートに入れました的な
// どこかで使うかも？
// const selectCart = state => state.cart;

export const selectCurrentUser = createSelector([selectUser], (user) => user.currentUser);
