//========================================
//  トップページ
//  ヘッダー以外の部分
//  > Directory.component
//
//========================================

import React from 'react';

import Directory from '../../components/directory/directory.component';

// import './homepage.styles.scss';

import { HomePageContainer } from './homepage.styles';

const HomePage = () => (
	<HomePageContainer>
		<Directory />
	</HomePageContainer>
);

export default HomePage;

//========================================
//  154 styledComponentを適用
//
//
//========================================
