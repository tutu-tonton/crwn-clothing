//========================================
//  signinコンポーネント
//  Email,passwordでのサインイン + Googleでサインイン
//  stateあり　email, password
//========================================

import React, { useState } from 'react';

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

import { auth, signInWithGoogle } from '../../firebase/firebase.utils';

import './sign-in.styles.scss';

const SignIn = () => {
	const [userCredentials, setCredentials] = useState({ email: '', password: '' });
	// constructor(props) {
	// 	super(props);

	// 	this.state = {
	// 		email: '',
	// 		password: '',
	// 	};
	// }
	const { email, password } = userCredentials;

	//========================================
	//  Submitイベント
	//  Email,Passwordでのsubmit
	//========================================
	const handleSubmit = async (event) => {
		event.preventDefault();

		try {
			await auth.signInWithEmailAndPassword(email, password);
			setCredentials({ email: '', password: '' });
		} catch (error) {
			console.log(error);
		}
	};

	//========================================
	//  Changeイベント
	//========================================
	const handleChange = (event) => {
		// event.targetでイベント起こった場所のHTML要素取得 <input .../>
		const { value, name } = event.target;

		// 動的に値を格納
		// computed property name
		// email欄ならname=emailだから、　email: 値　になる
		setCredentials({ ...userCredentials, [name]: value });
	};

	return (
		<div className="sign-in">
			<h2>I already have an account</h2>
			<span>Sign in with your email and password</span>

			<form onSubmit={handleSubmit}>
				<FormInput name="email" type="email" handleChange={handleChange} value={email} label="email" required />
				{/* <label>Email</label> */}
				<FormInput
					name="password"
					type="password"
					value={password}
					handleChange={handleChange}
					label="password"
					required
				/>
				{/* <label>Password</label> */}
				<div className="buttons">
					<CustomButton type="submit">Sign in</CustomButton>
					<CustomButton type="button" onClick={signInWithGoogle} isGoogleSignIn>
						Sign in with Google
					</CustomButton>
				</div>
			</form>
		</div>
	);
};

export default SignIn;

//========================================
//  200. hooks-useState書き換え
//
//
//========================================
