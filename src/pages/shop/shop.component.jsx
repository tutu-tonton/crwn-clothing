//========================================
//  ホーム直下のページ。
//  各カテゴリ毎にタイトル・画像・商品名の組み合わせ <- 4つ分
//  5カテゴリ分表示される
//  stateにショップデータ保有. ショップデータは別ファイルで保管。インポートする
//  削除> CollectionPreview.component
//  > CollectionOverview
//========================================
import React from 'react';
import { Route } from 'react-router-dom';

import CollectionsOverview from '../../components/collections-overview/collections-overview.component';
import CategoryPage from '../category/category.component';

// app.js内でRouteされてるので、match使える
const ShopPage = ({ match }) => (
	// カテゴリ毎にCollectionPreviewコンポを出力
	<div className="shop-page">
		<Route exact path={`${match.path}`} component={CollectionsOverview} />
		<Route path={`${match.path}/:categoryId`} component={CategoryPage} />
	</div>
);

export default ShopPage;
