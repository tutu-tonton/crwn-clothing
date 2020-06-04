//========================================
//  ホーム直下のページ。
//  各カテゴリ毎にタイトル・画像・商品名の組み合わせ <- 4つ分
//  5カテゴリ分表示される
//  stateにショップデータ保有. ショップデータは別ファイルで保管。インポートする
//  > CollectionPreview.component
//  > CollectionOverview
//========================================
import React from 'react';

import CollectionsOverview from '../../components/collections-overview/collections-overview.component';

const ShopPage = ({ collections }) => (
	// カテゴリ毎にCollectionPreviewコンポを出力
	<div className="shop-page">
		<CollectionsOverview />
	</div>
);

export default ShopPage;
