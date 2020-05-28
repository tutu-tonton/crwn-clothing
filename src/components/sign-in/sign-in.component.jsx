// signinコンポーネント
// mail,password入力欄あり
// stateあり　email, password

import React from 'react';

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

import { signInWithGoogle } from '../../firebase/firebase.utils';

import './sign-in.styles.scss';

class SignIn extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			email: '',
			password: '',
		};
	}

	// 送信ボタン押されたら...
	handleSubmit = (event) => {
		event.preventDefault();

		this.setState({ email: '', password: '' });
	};

	// 入力欄に変更あったら...
	handleChange = (event) => {
		// event.targetでイベント起こった場所のHTML要素取得 <input .../>
		const { value, name } = event.target;

		// 動的に値を格納
		// computed property name
		// email欄ならname=emailだから、　email: 値　になる
		this.setState({ [name]: value });
	};

	render() {
		return (
			<div className="sign-in">
				<h2>I already have an account</h2>
				<span>Sign in with your email and password</span>

				<form onSubmit={this.handleSubmit}>
					<FormInput
						name="email"
						type="email"
						handleChange={this.handleChange}
						value={this.state.email}
						label="email"
						required
					/>
					{/* <label>Email</label> */}
					<FormInput
						name="password"
						type="password"
						value={this.state.password}
						handleChange={this.handleChange}
						label="password"
						required
					/>
					{/* <label>Password</label> */}
					<div className="buttons">
						<CustomButton type="submit">Sign in</CustomButton>
						<CustomButton onClick={signInWithGoogle} isGoogleSignIn>
							Sign in with Google
						</CustomButton>
					</div>
				</form>
			</div>
		);
	}
}

export default SignIn;
