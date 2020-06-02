//========================================
//  カスタムボタン
//  いろいろなところで使われる
//  signIn, signUp, addToCart, goToCart
//========================================

import React from 'react';

import './custom-button.styles.scss';

//  children: ボタンに表示する文章用
//  inverted: 背景色　黒or白
const CustomButton = ({ children, isGoogleSignIn, inverted, ...otherProps }) => (
	<button
		className={`${inverted ? 'inverted' : ''} ${isGoogleSignIn ? 'google-sign-in' : ''} custom-button`}
		{...otherProps}
	>
		{children}
	</button>
);

export default CustomButton;
