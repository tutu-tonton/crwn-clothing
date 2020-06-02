//========================================
//  追加ボタン押すと、数量が積算していくように。
//  追加ボタン押すと、既存アイテムが保存されずに毎回クリックしたアイテムが配列に格納される
//  accumulatorみたいなの必要
//  すでに追加済みのアイテムをさらに追加しようとしているか？
//========================================

export const addItemToCart = (cartItems, cartItemToAdd) => {
	// すでに追加済みのものをさらに追加しようとしているか
	const existingCartItem = cartItems.find((cartItem) => cartItem.id === cartItemToAdd.id);

	// 増量パターン
	if (existingCartItem) {
		return cartItems.map((cartItem) =>
			cartItem.id === cartItemToAdd.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
		);
	}
	// 新規追加パターン
	// オブジェクトに新しいプロパティ追加
	return [...cartItems, { ...cartItemToAdd, quantity: 1 }];
};

//========================================
//  チェックアウトページの数量減量ボタン
//  購入希望数1から減量するときは、アイテム削除する
//========================================

export const removeItemFromCart = (cartItems, cartItemToRemove) => {
	// 削除しようとしているアイテムと同じアイテムがすでに存在しているか
	const existingCartItem = cartItems.find((cartItem) => cartItem.id === cartItemToRemove.id);

	// すでにある数量が1なら、そのアイテムを削除。他を残す
	if (existingCartItem.quantity === 1) {
		return cartItems.filter((cartItem) => cartItem.id !== cartItemToRemove.id);
	}

	// 複数購入パターン
	// 削除希望アイテム--->数量を1減らす
	return cartItems.map((cartItem) =>
		cartItem.id === cartItemToRemove.id ? { ...cartItem, quantity: cartItem.quantity - 1 } : cartItem
	);
};
