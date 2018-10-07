import React from 'react';
import { Helmet } from 'react-helmet';
import { Container, Header, Menu } from 'semantic-ui-react';

import { FetchedRegionList } from '../../containers/fetched-region-list.container';

const HomeView: React.StatelessComponent<{}> = () => (
  <section>
    <Helmet>
      <title>Home</title>
    </Helmet>
    <Container fluid>
      <Menu fixed='top' borderless inverted color='blue'>
        <Container text>
          <Menu.Item>
            <Header inverted>
              2nd Microconf - AJAX hygiene
            </Header>
          </Menu.Item>
        </Container>
      </Menu>
    </Container>
    <Container style={{ marginTop: '70px', paddingBottom: '15px' }}>
      <FetchedRegionList />
    </Container>
  </section>
);

export default HomeView;
