//========================================
//  ショップページの大きなコンテナ
//  削除 > stateにショップデータ保有. ショップデータは別ファイルで保管。インポートする
//  削除> CollectionPreview.component
//  > CollectionOverview
//========================================
import React from 'react';
import { Route } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';

import CollectionsOverview from '../../components/collections-overview/collections-overview.component';
import CollectionPage from '../collection/collection.component';

// import { firestore, convertCollectionSnapshotToMap } from '../../firebase/firebase.utils';

import { fetchCollectionsStartAsync } from '../../redux/shop/shop.actions';
import { selectIsCollectionFetching } from '../../redux/shop/shop.selectors';
// import { updateCollections } from '../../redux/shop/shop.actions';

import WithSpinner from '../../components/with-spinner/with-spinner.component';

const CollectionsOverviewWithSpinner = WithSpinner(CollectionsOverview);
const CollectionPageWithSpinner = WithSpinner(CollectionPage);

class ShopPage extends React.Component {
	// -> redux-thunkに移した
	// // 新しい書き方
	// state = {
	// 	// 最初はデータをfirestoreに取りに行くのでloading中
	// 	loading: true,
	// };

	// // ??? クラスプロパティ
	// unsubscribeFromSnapshot = null;

	componentDidMount() {
		const { fetchCollectionsStartAsync } = this.props;
		fetchCollectionsStartAsync();

		// -> redux-thunkに移した
		// const { updateCollections } = this.props;
		// const collectionRef = firestore.collection('collections');

		// // ??? オブザーバーパターン
		// // 一般的なdbでonSnapshot見たいのを実現したいとき？
		// collectionRef.get().then((snapshot) => {
		// 	// console.log(snapshot); // collection内に格納されてるドキュメントのメタ情報。配列形式
		// 	// データ引っ張ってきて、オブジェクト形式にする
		// 	const collectionsMap = convertCollectionSnapshotToMap(snapshot);
		// 	// console.log(collectionsMap);	// オブジェクト形式になってるか確認
		// 	// redux.stateに保存する
		// 	updateCollections(collectionsMap);
		// 	this.setState({ loading: false });
		// });
		// -----
		// firestoreからshopDataを持ってくる
		// firestoreにはtitle,itemsの情報しかないから、その他の情報を付け足す関数を実行
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
		const { match, isCollectionFetching } = this.props;
		// const { loading } = this.state;
		return (
			// カテゴリ毎にCollectionPreviewコンポを出力
			<div className="shop-page">
				<Route
					exact
					path={`${match.path}`}
					render={(props) => <CollectionsOverviewWithSpinner isLoading={isCollectionFetching} {...props} />}
				/>
				{/* <Route exact path={`${match.path}`} component={CollectionsOverview} /> */}
				<Route
					path={`${match.path}/:collectionId`}
					render={(props) => <CollectionPageWithSpinner isLoading={isCollectionFetching} {...props} />}
				/>
				{/* <Route path={`${match.path}/:collectionId`} component={CollectionPage} /> */}
			</div>
		);
	}
}

const mapStateToProps = createStructuredSelector({
	isCollectionFetching: selectIsCollectionFetching,
});

const mapDispatchToProps = (dispatch) => ({
	fetchCollectionsStartAsync: () => dispatch(fetchCollectionsStartAsync()),
});

// 174. redux-thunkにより要らなくなる
// const mapDispatchToProps = (dispatch) => ({
// 	updateCollections: (collectionsMap) => dispatch(updateCollections(collectionsMap)),
// });

export default connect(mapStateToProps, mapDispatchToProps)(ShopPage);

//========================================
// 166. Bringing Shop Data to our app
// 	firestoreからデータを持ってきて、routeに必要な情報を追加した
// 167. Adding Shop Data to Redux
//  redux.stateに保存する為に、action,reducer作成した
// 169. WithSpinner HOC
//	 データが返ってくるまではローディング中表示
// 174. redux-thunk
// 	 redux-thunkにより非同期でaction dispatch
//   componentDidMount部分をredux-thunkへ移す
//========================================
