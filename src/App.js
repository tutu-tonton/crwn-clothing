// googleでログインしたら、ログインしている状態をstateに反映させる

import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import Header from './components/header/header.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import { auth, createUserProfileDocument } from './firebase/firebase.utils';
import { setCurrentUser } from './redux/user/user.actions';

import './App.css';
class App extends React.Component {
	//========================================
	// GoogleAuthログインアウトリッスン
	//========================================

	unsubscribeFromAuth = null;

	componentDidMount() {
		const { setCurrentUser } = this.props;

		// firebase authのメソッド
		// userオブジェクトにuser情報入ってる
		// auth.onAuthStateChanged()はfirebase.unsubscribe()を返す
		// firebase.unsubscribe()はログインアウトイベントリスニングを止めるメソッド
		this.unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
			// this.setState({ currentUser: user });
			// createUserProfileDocument(user);
			if (userAuth) {
				const userRef = await createUserProfileDocument(userAuth);

				//==============================
				//	ユーザー情報をstateに保存
				//	ユーザー情報をstoreに保存
				//==============================

				userRef.onSnapshot((snapShot) => {
					// console.log(snapShot);
					// ユーザーがログインしていて、userRefオブジェクトを確認する
					setCurrentUser({
						id: snapShot.id,
						...snapShot.data(),
					});
				});
			}

			// ログアウトしている場合は、nullに更新
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

const mapStateToProps = ({ user }) => ({
	currentUser: user.currentUser,
});

const mapDispatchToProps = (dispatch) => ({
	setCurrentUser: (user) => dispatch(setCurrentUser(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
