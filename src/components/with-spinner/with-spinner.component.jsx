//========================================
//  spinnerを表示するコンポーネント
//  HOC : 別のコンポーネントをラップする
//
//========================================

import React from 'react';

import { SpinnerContainer, SpinnerOverlay } from './with-spinner.styles';

const WithSpinner = (WrappedComponent) => ({ isLoading, ...otherProps }) => {
	return isLoading ? (
		<SpinnerOverlay>
			<SpinnerContainer />
		</SpinnerOverlay>
	) : (
		<WrappedComponent {...otherProps} />
	);
};
// この書き方の省略形
// const withSpinner = (WrappedComponent) => {
// 	const Spinner = ({ isLoading, ...otherProps }) => {
// 		return isLoading ? (
// 			<SpinnerOverlay>
// 				<SpinnerContainer />
// 			</SpinnerOverlay>
// 		) : (
// 			<WrappedComponent {...otherProps} />
// 		);
// 	};
//  return Spinner;
// };

export default WithSpinner;

//========================================
//  169. WithSpinner HOC
//   @shop.component.jsx
//
//========================================
