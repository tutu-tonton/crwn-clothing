//========================================
//  ショップページの大きなコンテナ
//  削除 > stateにショップデータ保有. ショップデータは別ファイルで保管。インポートする
//  削除> CollectionPreview.component
//  > CollectionOverview
//========================================
import React from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';

import CollectionsOverview from '../../components/collections-overview/collections-overview.component';
import CollectionPage from '../collection/collection.component';

import { firestore, convertCollectionSnapshotToMap } from '../../firebase/firebase.utils';

import { updateCollections } from '../../redux/shop/shop.actions';

import WithSpinner from '../../components/with-spinner/with-spinner.component';

const CollectionsOverviewWithSpinner = WithSpinner(CollectionsOverview);
const CollectionPageWithSpinner = WithSpinner(CollectionPage);

class ShopPage extends React.Component {
	// 新しい書き方
	state = {
		// 最初はデータをfirestoreに取りに行くのでloading中
		loading: true,
	};

	// ??? クラスプロパティ
	unsubscribeFromSnapshot = null;

	// firestoreからshopDataを持ってくる
	// firestoreにはtitle,itemsの情報しかないから、その他の情報を付け足す関数を実行
	componentDidMount() {
		const { updateCollections } = this.props;
		const collectionRef = firestore.collection('collections');

		// ??? オブザーバーパターン
		// 一般的なdbでonSnapshot見たいのを実現したいとき？
		collectionRef.get().then((snapshot) => {
			// console.log(snapshot); // collection内に格納されてるドキュメントのメタ情報。配列形式
			// データ引っ張ってきて、オブジェクト形式にする
			const collectionsMap = convertCollectionSnapshotToMap(snapshot);
			// console.log(collectionsMap);	// オブジェクト形式になってるか確認
			// redux.stateに保存する
			updateCollections(collectionsMap);
			this.setState({ loading: false });
		});
		// -----
		// collectionRef.onSnapshot(async (snapshot) => {
		// 	// console.log(snapshot); // collection内に格納されてるドキュメントのメタ情報。配列形式
		// 	// データ引っ張ってきて、オブジェクト形式にする
		// 	const collectionsMap = convertCollectionSnapshotToMap(snapshot);
		// 	// console.log(collectionsMap);	// オブジェクト形式になってるか確認
		// 	// redux.stateに保存する
		// 	updateCollections(collectionsMap);
		// 	this.setState({ loading: false });
		// });
		// -----
		// fetch('https://firestore.googleapis.com/v1/projects/crwn-db-dc266/databases/(default)/documents/collections')
		// 	.then((response) => response.json())
		// 	.then((collections) => console.log(collections));
	}

	render() {
		// app.js内でRouteされてるので、propsとしてmatch受け取る
		const { match } = this.props;
		const { loading } = this.state;
		return (
			// カテゴリ毎にCollectionPreviewコンポを出力
			<div className="shop-page">
				<Route
					exact
					path={`${match.path}`}
					render={(props) => <CollectionsOverviewWithSpinner isLoading={loading} {...props} />}
				/>
				{/* <Route exact path={`${match.path}`} component={CollectionsOverview} /> */}
				<Route
					path={`${match.path}/:collectionId`}
					render={(props) => <CollectionPageWithSpinner isLoading={loading} {...props} />}
				/>
				{/* <Route path={`${match.path}/:collectionId`} component={CollectionPage} /> */}
			</div>
		);
	}
}

const mapDispatchToProps = (dispatch) => ({
	updateCollections: (collectionsMap) => dispatch(updateCollections(collectionsMap)),
});

export default connect(null, mapDispatchToProps)(ShopPage);

//========================================
// 166. Bringing Shop Data to our app
// 	firestoreからデータを持ってきて、routeに必要な情報を追加した
// 167. Adding Shop Data to Redux
//  redux.stateに保存する為に、action,reducer作成した
// 169. WithSpinner HOC
//	 データが返ってくるまではローディング中表示
//========================================
