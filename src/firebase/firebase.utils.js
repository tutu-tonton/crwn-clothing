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

	// referenceを取得する
	// referenceは実際にデータが存在してなくても返ってくる
	// console.log(firestore.doc('users/140dagrhd'));
	const userRef = firestore.doc(`users/${userAuth.uid}`);
	// snapshotオブジェクトを取得
	// クエリした情報が実際に存在してるかどうか　.existsプロパティ　を持つ
	const snapShot = await userRef.get();
	console.log(snapShot); // existsプロパティを確認

	// firestore内にそのユーザーのドキュメントが未作成の場合
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

//========================================
//　firestoreにshopデータを移動する
//  あるコレクションにデータ追加
//  collectionKey: どのcollectionに入れたいか？
//
//========================================
export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
	const collectionRef = firestore.collection(collectionKey);
	console.log(collectionRef); // オブジェクトidにcollectionKey入る

	// アップロード途中で通信途切れたときには、全て失敗判定にする
	// リクエストを1グループにする。グループがきちんと完了して成功となる
	// batch right
	const batch = firestore.batch();
	// forEach: 新配列とならない。元の配列上書き
	objectsToAdd.forEach((obj) => {
		// ??? documentのid部分をユニークにしたいので、ランダムに振る
		const newDocRef = collectionRef.doc();
		// collectionRef.doc():ランダムにidが振られている
		// collectionRef.doc(obj.title):タイトルがidが振られている
		// console.log(newDocRef);
		// obj全てにidを割り振る作業をバッチ処理
		batch.set(newDocRef, obj);
	});

	// バッチコール開始
	return await batch.commit();
};

//========================================
//  初期設定
//
//========================================
firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
// google認証を使用するときはpopup表示
// ユーザーが以前にアクセスを承認した場合でも、常にアカウントを選択するようにできる
// 複数アカウント持ってる場合に便利
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;

//========================================
//  163.164. ショップデータをFirebaseに移動する
//
//
//========================================

//========================================
// const SHOP_DATA = [
// 	{
// 		id: 1,
// 		title: 'Hats',
// 		routeName: 'hats',
// 		items: [
// 			{
// 				id: 1,
// 				name: 'Brown Brim',
// 				imageUrl: 'https://i.ibb.co/ZYW3VTp/brown-brim.png',
// 				price: 25,
// 			},
