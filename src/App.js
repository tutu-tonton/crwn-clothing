// googleでログインしたら、ログインしている状態をstateに反映させる

import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
// 今後selectorが増えた時に、structuredにしておけば追加が楽
import { createStructuredSelector } from 'reselect';

import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import Header from './components/header/header.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import CheckoutPage from './pages/checkout/checkout.component';

import { auth, createUserProfileDocument } from './firebase/firebase.utils';

import { setCurrentUser } from './redux/user/user.actions';
import { selectCurrentUser } from './redux/user/user.selectors';

import './App.css';
class App extends React.Component {
	//========================================
	// componentDidMount:AuthStateをリッスン開始する
	// componentWillUnmount: AuthStateリッスンを終了する
	//========================================

	unsubscribeFromAuth = null;

	componentDidMount() {
		const { setCurrentUser } = this.props;

		// firebase authのメソッド
		// userオブジェクトにuser情報入ってる
		// auth.onAuthStateChanged()はfirebase.unsubscribe()を返す
		// firebase.unsubscribe()はログインアウトイベントリスニングを止めるメソッド
		this.unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
			// this.setState({ currentUser: user });	// 最初はこのコンポーネント内にstateを作っていた
			// createUserProfileDocument(user);

			// ログインしようとすると、createUserProfileDocumentメソッド発動
			// ユーザー情報がfirestoreに登録済みかどうか、未登録なら登録
			if (userAuth) {
				const userRef = await createUserProfileDocument(userAuth);

				//==============================
				//	ユーザー情報をstateに保存
				//	ユーザー情報をstoreに保存
				//  onSnapshotメソッド:
				//  ユーザー情報変更があったらすぐにfirestore側も変更反映されるように
				//==============================
				userRef.onSnapshot((snapShot) => {
					// console.log(snapShot);	// これだけだとまだデータ本体は表示されない
					// console.log(snapShot.data());	// これでデータ本体が表示

					// auth.uid で ユーザードキュメント作成してる
					// そのドキュメントのIDが auth.uid
					setCurrentUser({
						id: snapShot.id, // ドキュメントのID
						...snapShot.data(),
					});
				});
				// console.log(this.state);	// 確認
			}

			// ログアウトしている場合は、state側もnullに更新
			setCurrentUser(userAuth);
		});
	}

	//========================================
	//	ログインログアウトイベントのリスニングを停止
	//========================================

	componentWillUnmount() {
		this.unsubscribeFromAuth();
	}

	render() {
		return (
			<div>
				<Header />
				<Switch>
					<Route exact path="/" component={HomePage} />
					<Route path="/shop" component={ShopPage} />
					<Route exact path="/checkout" component={CheckoutPage} />
					{/* すでにサインイン済みならトップページへ、未サインインならサインインページを表示 */}
					<Route
						exact
						path="/signin"
						render={() => (this.props.currentUser ? <Redirect to="/" /> : <SignInAndSignUpPage />)}
					/>
				</Switch>
			</div>
		);
	}
}

const mapStateToProps = createStructuredSelector({
	currentUser: selectCurrentUser,
});

const mapDispatchToProps = (dispatch) => ({
	setCurrentUser: (user) => dispatch(setCurrentUser(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
