import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
	apiKey: 'AIzaSyBARD8rEZOrmUyPCjKeGzMdUM_zgyptGe4',
	authDomain: 'crwn-db-dc266.firebaseapp.com',
	databaseURL: 'https://crwn-db-dc266.firebaseio.com',
	projectId: 'crwn-db-dc266',
	storageBucket: 'crwn-db-dc266.appspot.com',
	messagingSenderId: '761292357638',
	appId: '1:761292357638:web:618c962fb583a2dbf1c387',
	measurementId: 'G-JCGSTQ4JXW',
};

//============================================================
//	Googleでサインインしたユーザーが、データベースに登録済みかどうか
//	未登録ならユーザー登録する
//============================================================

export const createUserProfileDocument = async (userAuth, additionalData) => {
	// ログアウト状態なら何もしない
	if (!userAuth) return;

	// referenceが取得できる？
	// console.log(firestore.doc('users/140dagrhd'));
	const userRef = firestore.doc(`users/${userAuth.uid}`);

	const snapShot = await userRef.get();
	// snapshotにid,データベースに登録済みかの情報入ってる
	console.log(snapShot);

	if (!snapShot.exists) {
		const { displayName, email } = userAuth;
		const createdAt = new Date();

		try {
			await userRef.set({
				displayName,
				email,
				createdAt,
				...additionalData,
			});
		} catch (error) {
			console.log('error creating user', error.message);
		}
	}

	return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
// ユーザーが以前にアクセスを承認した場合でも、常にアカウントを選択するようにできる
// 複数アカウント持ってる場合に便利
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
