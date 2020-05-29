// googleでログインしたら、ログインしている状態をstateに反映させる

import React from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';

import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import Header from './components/header/header.component';
import { auth, createUserProfileDocument } from './firebase/firebase.utils';

class App extends React.Component {
	constructor() {
		super();

		this.state = {
			currentUser: null,
		};
	}

	//========================================
	// GoogleAuthログインアウトリッスン
	//========================================

	unsubscribeFromAuth = null;

	componentDidMount() {
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
				//==============================

				userRef.onSnapshot((snapShot) => {
					// console.log(snapShot);
					this.setState({
						currentUser: {
							id: snapShot.id,
							...snapShot.data(),
						},
					});
				});
			}

			this.setState({ currentUser: userAuth });
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
				<Header currentUser={this.state.currentUser} />
				<Switch>
					<Route exact path="/" component={HomePage} />
					<Route path="/shop" component={ShopPage} />
					<Route path="/signin" component={SignInAndSignUpPage} />
				</Switch>
			</div>
		);
	}
}

export default App;
