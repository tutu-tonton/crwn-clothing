//========================================
//  追加ボタン押すと、既存アイテムが保存されずに毎回クリックしたアイテムが配列に格納される
//  accumulatorみたいなの必要
//  すでに追加済みのアイテムをさらに追加しようとしているか？
//========================================

export const addItemToCart = (cartItems, cartItemToAdd) => {
	// すでに追加済みのものをさらに追加しようとしているか
	const existingCartItem = cartItems.find((cartItem) => cartItem.id === cartItemToAdd.id);

	if (existingCartItem) {
		return cartItems.map((cartItem) =>
			cartItem.id === cartItemToAdd.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
		);
	}
	// オブジェクトに新しいプロパティ追加
	return [...cartItems, { ...cartItemToAdd, quantity: 1 }];
};

//========================================
//  チェックアウトページの数量増減ボタンの内、減量ボタン
//
//
//========================================

export const removeItemFromCart = (cartItems, cartItemToRemove) => {
	// 削除しようとしているアイテムと同じアイテムがすでに存在しているか
	const existingCartItem = cartItems.find((cartItem) => cartItem.id === cartItemToRemove.id);

	// すでにある数量が1なら、そのアイテムを削除。他を残す
	if (existingCartItem.quantity === 1) {
		return cartItems.filter((cartItem) => cartItem.id !== cartItemToRemove.id);
	}

	// 削除希望アイテム--->数量を1減らす
	return cartItems.map((cartItem) =>
		cartItem.id === cartItemToRemove.id ? { ...cartItem, quantity: cartItem.quantity - 1 } : cartItem
	);
};
