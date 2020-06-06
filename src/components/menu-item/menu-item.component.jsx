//========================================
//  トップページにある各商品画像とタイトル　<--1組分
//  クリックすると各カテゴリページに飛ぶ
//  > props: sections
//========================================

import React from 'react';
import { withRouter } from 'react-router-dom';

import './menu-item.styles.scss';

// 分割代入で書く
// const MenuItem = (props) => (
const MenuItem = ({ title, imageUrl, size, history, linkUrl, match }) => (
	<div className={`${size} menu-item`} onClick={() => history.push(`${match.url}${linkUrl}`)}>
		<div className="background-image" style={{ backgroundImage: `url(${imageUrl})` }} />
		<div className="content">
			<h1 className="title">{title.toUpperCase()}</h1>
			<span className="subtitle">SHOP NOW</span>
		</div>
	</div>
);

// withRouterで囲むことで、historyが使える
// ネストされててもOK
export default withRouter(MenuItem);

// //========================================
// //  sections: [
// 	{
// 		title: 'hats',
// 		imageUrl: 'https://i.ibb.co/cvpntL1/hats.png',
// 		id: 1,
// 		linkUrl: 'shop/hats',
// 	},
// 	{
// 		title: 'jackets',
// 		imageUrl: 'https://i.ibb.co/px2tCc3/jackets.png',
// 		id: 2,
// 		linkUrl: 'shop/jackets',
// 	},
// 	{
// 		title: 'sneakers',
// 		imageUrl: 'https://i.ibb.co/0jqHpnp/sneakers.png',
// 		id: 3,
// 		linkUrl: 'shop/sneakers',
// 	},
// 	{
// 		title: 'womens',
// 		imageUrl: 'https://i.ibb.co/GCCdy8t/womens.png',
// 		size: 'large',
// 		id: 4,
// 		linkUrl: 'shop/womens',
// 	},
// 	{
// 		title: 'mens',
// 		imageUrl: 'https://i.ibb.co/R70vBrQ/men.png',
// 		size: 'large',
// 		id: 5,
// 		linkUrl: 'shop/mens',
// 	},
// ],
// //
// //
// //========================================
