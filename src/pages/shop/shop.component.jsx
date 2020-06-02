//========================================
//  ホーム直下のページ。
//  各カテゴリ毎にタイトル・画像・商品名の組み合わせ <- 4つ分
//  5カテゴリ分表示される
//  stateにショップデータ保有. ショップデータは別ファイルで保管。インポートする
//  > CollectionPreview.component
//========================================
import React from 'react';

import SHOP_DATA from './shop.data';

import CollectionPreview from '../../components/collection-preview/collection-preview.component';

class ShopPage extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			collections: SHOP_DATA,
		};
	}

	render() {
		const { collections } = this.state;
		return (
			// カテゴリ毎にCollectionPreviewコンポを出力
			<div className="shop-page">
				{collections.map(({ id, ...otherCollectionProps }) => (
					<CollectionPreview key={id} {...otherCollectionProps} />
				))}
			</div>
		);
	}
}

export default ShopPage;
