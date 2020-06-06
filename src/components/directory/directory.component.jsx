//========================================
//  トップページ内の全部を覆うコンテナ
//  各カテゴリ・真ん中にタイトル　<- これが5種類分
//  stateにカテゴリ名・画像・url所有
//  homepage.component >
//  > MenuItem.component
//========================================

import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectDirectorySections } from '../../redux/directory/directory.selector';

import MenuItem from '../menu-item/menu-item.component';

import './directory.styles.scss';

const Directory = ({ sections }) => (
	<div className="directory-menu">
		{/* this.state.sections.map(section => ( */}
		{/* {this.state.sections.map(({ title, imageUrl, id, size, linkUrl }) => ( */}
		{sections.map(({ id, ...otherSectionProps }) => (
			// <MenuItem key={id} title={title} imageUrl={imageUrl} size={size} linkUrl={linkUrl} />
			<MenuItem key={id} {...otherSectionProps} />
		))}
	</div>
);

const mapStateToProps = createStructuredSelector({
	sections: selectDirectorySections,
});

export default connect(mapStateToProps)(Directory);

// //========================================
// //  sections: [
// 		{
// 			title: 'hats',
// 			imageUrl: 'https://i.ibb.co/cvpntL1/hats.png',
// 			id: 1,
// 			linkUrl: 'shop/hats',
// 		},
// 		{
// 			title: 'jackets',
// 			imageUrl: 'https://i.ibb.co/px2tCc3/jackets.png',
// 			id: 2,
// 			linkUrl: 'shop/jackets',
// 		},
// 		{
// 			title: 'sneakers',
// 			imageUrl: 'https://i.ibb.co/0jqHpnp/sneakers.png',
// 			id: 3,
// 			linkUrl: 'shop/sneakers',
// 		},
// 		{
// 			title: 'womens',
// 			imageUrl: 'https://i.ibb.co/GCCdy8t/womens.png',
// 			size: 'large',
// 			id: 4,
// 			linkUrl: 'shop/womens',
// 		},
// 		{
// 			title: 'mens',
// 			imageUrl: 'https://i.ibb.co/R70vBrQ/men.png',
// 			size: 'large',
// 			id: 5,
// 			linkUrl: 'shop/mens',
// 		},
// 	],
// //
// //
// //========================================
