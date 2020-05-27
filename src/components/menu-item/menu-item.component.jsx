// トップページにある各商品画像とタイトル　1組分
// クリックすると各カテゴリページに飛ぶ

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
export default withRouter(MenuItem);
