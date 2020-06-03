//========================================
//  トップページ内の全部を覆うコンテナ
//  各商品画像・真ん中にタイトル　<- これが5種類分
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
