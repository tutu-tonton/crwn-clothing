//========================================
//  ショップページの大きなコンテナ
//  削除 > stateにショップデータ保有. ショップデータは別ファイルで保管。インポートする
//  削除> CollectionPreview.component
//  > CollectionOverview
//========================================
import React from 'react';
import { Route } from 'react-router-dom';

import CollectionsOverview from '../../components/collections-overview/collections-overview.component';
import CollectionPage from '../collection/collection.component';

import { firestore, convertCollectionSnapshotToMap } from '../../firebase/firebase.utils';

class ShopPage extends React.Component {
	// ??? クラスプロパティ
	unsubscribeFromSnapshot = null;

	// firestoreからshopDataを持ってくる
	// firestoreにはtitle,itemsの情報しかないから、その他の情報を付け足す関数を実行
	componentDidMount() {
		const collectionRef = firestore.collection('collections');

		collectionRef.onSnapshot(async (snapshot) => {
			// console.log(snapshot); // collection内に格納されてるドキュメントのメタ情報。配列形式
			convertCollectionSnapshotToMap(snapshot);
		});
	}

	render() {
		// app.js内でRouteされてるので、propsとしてmatch受け取る
		const { match } = this.props;
		return (
			// カテゴリ毎にCollectionPreviewコンポを出力
			<div className="shop-page">
				<Route exact path={`${match.path}`} component={CollectionsOverview} />
				<Route path={`${match.path}/:collectionId`} component={CollectionPage} />
			</div>
		);
	}
}

export default ShopPage;

//========================================
// 166. Bringing Shop Data to our app
// 	firestoreからデータを持ってきて、routeに必要な情報を追加した
//
//
//========================================
