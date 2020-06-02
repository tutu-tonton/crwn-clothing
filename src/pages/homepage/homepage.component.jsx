//========================================
//  トップページ
//  ヘッダー以外の部分
//  > Directory.component
//
//========================================

import React from 'react';

import Directory from '../../components/directory/directory.component';

import './homepage.styles.scss';

const HomePage = () => (
	<div className="homepage">
		<Directory />
	</div>
);

export default HomePage;
