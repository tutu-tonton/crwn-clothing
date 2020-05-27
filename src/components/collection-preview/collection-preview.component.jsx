// 各カテゴリのタイトルと4つの品物が表示される個別コンポーネント <- 1組分

import React from 'react';

import CollectionItem from '../collection-item/collection-item.component';

import './collection-preview.styles.scss';

const CollectionPreview = ({ title, items }) => (
	<div className="collection-preview">
		{/* 商品カテゴリ名 */}
		<h1 className="title">{title.toUpperCase()}</h1>
		{/* 4つ分の画像・商品名 */}
		<div className="preview">
			{items
				.filter((item, idx) => idx < 4)
				.map(({ id, ...otherItemProps }) => (
					<CollectionItem key={id} {...otherItemProps} />
				))}
		</div>
	</div>
);

export default CollectionPreview;
