import React from 'react';
import { Helmet } from 'react-helmet';

import Menu from 'semantic-ui-react/dist/commonjs/collections/Menu';
import Container from 'semantic-ui-react/dist/commonjs/elements/Container';
import Header from 'semantic-ui-react/dist/commonjs/elements/Header';

import { RequestsTable } from '../../containers/requests-table.container';

const HomeView = () => (
	<section>
		<Helmet>
			<title>Home</title>
		</Helmet>
		<div>
			<Menu inverted>
				<Menu.Item><Header as='h3' inverted>Microconf 2</Header></Menu.Item>
			</Menu>
		</div>

		<Container style={{ marginTop: '25px', paddingBottom: '15px' }}>
			<RequestsTable />
		</Container>

	</section>
);

export default HomeView;
