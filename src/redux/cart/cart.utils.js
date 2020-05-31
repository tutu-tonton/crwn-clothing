//========================================
//  追加ボタン押すと、既存アイテムが保存されずに毎回クリックしたアイテムが配列に格納される
//  accumulatorみたいなの必要
//  すでに追加済みのアイテムをさらに追加しようとしているか？
//========================================

export const addItemToCart = (cartItems, cartItemToAdd) => {
	const existingCartItem = cartItems.find((cartItem) => cartItem.id === cartItemToAdd.id);

	if (existingCartItem) {
		return cartItems.map((cartItem) =>
			cartItem.id === cartItemToAdd.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
		);
	}
	// オブジェクトに新しいプロパティ追加
	return [...cartItems, { ...cartItemToAdd, quantity: 1 }];
};
