//========================================
//  個別商品のコンポーネント
//  上に画像、下に商品名・価格
//  props: item 親コンポーネントから個別商品オブジェクト受け取っている
//	collection-preview.component >
//	> customButton.component
//========================================

import React from 'react';
import { connect } from 'react-redux';

import CustomButton from '../custom-button/custom-button.component';
import { addItem } from '../../redux/cart/cart.action';

import './collection-item.styles.scss';

const CollectionItem = ({ item, addItem }) => {
	const { name, price, imageUrl } = item;
	return (
		<div className="collection-item">
			<div className="image" style={{ backgroundImage: `url(${imageUrl})` }} />
			<div className="collection-footer">
				<span className="name">{name}</span>
				<span className="price">{price}</span>
			</div>
			{/* 普段は非表示 */}
			{/* ホバーすると表示 */}
			{/* クリックするとアイテム追加action発動 */}
			<CustomButton onClick={() => addItem(item)} inverted>
				Add to cart
			</CustomButton>
		</div>
	);
};

const mapDispatchToProps = (dispatch) => ({
	addItem: (item) => dispatch(addItem(item)),
});

export default connect(null, mapDispatchToProps)(CollectionItem);

//========================================
//  参考：
//  props: item
//  １つ分の商品情報
//========================================
// {
// 	id: 1,
// 	name: 'Brown Brim',
// 	imageUrl: 'https://i.ibb.co/ZYW3VTp/brown-brim.png',
// 	price: 25,
// },
