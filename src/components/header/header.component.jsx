//========================================
//  ヘッダーコンポーネント
//  どのページに行っても上部に表示される
//  > 各リンクへ
//  > CartIcon.component
//  > CartDropdown.component
//========================================

import React from 'react';
// import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { auth } from '../../firebase/firebase.utils';
import CartIcon from '../cart-icon/cart-icon.component';
import CartDropdown from '../cart-dropdown/cart-dropdown.component';
import { selectCartHidden } from '../../redux/cart/cart.selectors';
import { selectCurrentUser } from '../../redux/user/user.selectors';

// svgファイルの読み込み方
import { ReactComponent as Logo } from '../../assets/crown.svg';

import { HeaderContainer, LogoContainer, OptionsContainer, OptionLink, OptionDiv } from './header.styles';
// import './header.styles.scss';

// storeからprops渡ってきてる
const Header = ({ currentUser, hidden }) => (
	<HeaderContainer>
		<LogoContainer to="/">
			<Logo className="logo" />
		</LogoContainer>
		<OptionsContainer>
			<OptionLink to="/shop">SHOP</OptionLink>
			<OptionLink to="/shop">CONTACT</OptionLink>
			{/* ログインしてるしてないで表示変わる */}
			{currentUser ? (
				// ログインしている時
				<OptionDiv onClick={() => auth.signOut()}>SIGN OUT</OptionDiv>
			) : (
				<OptionLink to="/signin">SIGN IN</OptionLink>
			)}
			<CartIcon />
		</OptionsContainer>
		{hidden ? null : <CartDropdown />}
	</HeaderContainer>
);

const mapStateToProps = createStructuredSelector({
	currentUser: selectCurrentUser,
	hidden: selectCartHidden,
});

export default connect(mapStateToProps)(Header);

//========================================
//  154. styledComponent適用
//
//
//========================================
