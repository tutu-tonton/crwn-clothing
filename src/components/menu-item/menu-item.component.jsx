import React from 'react';

import './menu-item.styles.scss';

const MenuItem = ({ title, imageUrl, size }) => (
	// 分割代入で書く
	// const MenuItem = (props) => (
	<div className={`${size} menu-item`}>
		<div className="background-image" style={{ backgroundImage: `url(${imageUrl})` }} />
		<div className="content">
			<h1 className="title">{title.toUpperCase()}</h1>
			<span className="subtitle">SHOP NOW</span>
		</div>
	</div>
);

export default MenuItem;
