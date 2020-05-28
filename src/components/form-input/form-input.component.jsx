// formコンポーネント
// 個別の入力欄
// 再利用するために、親からlabel情報受け取ってたらlabelあり

import React from 'react';

import './form-input.styles.scss';

// stateいらないからfuncCompo
const FormInput = ({ handleChange, label, ...otherProps }) => (
	<div className="group">
		{/* otherProps: type=emailなど/ value=入力文字数 */}
		<input className="form-input" onChange={handleChange} {...otherProps} />
		{/* 再利用するために、labelProp受け取ってればlabelあり required などを受け取る */}
		{/* otherProps.value.length = 何らかの入力がしてある状態.文字数1以上 */}
		{/* 入力欄に入力してあれば、shrink発動。入力値なければフォーカスはずれるとshrink外れる */}
		{label ? (
			<label className={`${otherProps.value.length ? 'shrink' : ''} form-input-label`}>{label}</label>
		) : null}
	</div>
);

export default FormInput;
