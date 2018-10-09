import React from 'react';
import { Helmet } from 'react-helmet';
import Menu from 'semantic-ui-react/dist/commonjs/collections/Menu';
import Container from 'semantic-ui-react/dist/commonjs/elements/Container';
import Icon from 'semantic-ui-react/dist/commonjs/elements/Icon';
import Header from 'semantic-ui-react/dist/commonjs/elements/Header';
import Dropdown from 'semantic-ui-react/dist/commonjs/modules/Dropdown';

import { FetchedRegionList } from '../../containers/fetched-region-list.container';
import { ConfigurationToggle } from 'root/containers/configuration-toggle.container';

const HomeView: React.StatelessComponent<{}> = () => (
  <section>
    <Helmet>
      <title>Home</title>
    </Helmet>
    <Container fluid>
      <Menu fixed='top'>
        <Menu.Item>
          <Header as='h3'>
            2nd Microconf - AJAX hygiene
          </Header>
        </Menu.Item>

        <Menu.Menu position='right'>
          <Menu.Item>
            <Header as='h4'>
              <Icon name='cog'/>
              <Header.Content>
                <Dropdown inline text='Settings' closeOnChange={false} openOnFocus={false} simple>
                  <Dropdown.Menu>
                    <Dropdown.Item
                      content={
                        <ConfigurationToggle
                          configurationKey='shouldRetryApiRequests'
                          label='Automatic Retry on Error'
                        />
                      }
                    />
                    <Dropdown.Item
                      content={
                        <ConfigurationToggle
                          configurationKey='shouldUseHttp2'
                          label='Use HTTP/2'
                        />
                      }
                    />
                    <Dropdown.Item
                      content={
                        <ConfigurationToggle
                          configurationKey='shouldMemoizeApiRequests'
                          label='Memoize ongoing requests'
                        />
                      }
                    />
                    <Dropdown.Item
                      content={
                        <ConfigurationToggle
                          configurationKey='hasSpinners'
                          label='Show spinners and disable actions'
                        />
                      }
                    />
                    <Dropdown.Item
                      content={
                        <ConfigurationToggle
                          configurationKey='shouldQueueSameApiRequests'
                          label='Queue requests to the same resources'
                        />
                      }
                    />
                    <Dropdown.Item
                      content={
                        <ConfigurationToggle
                          configurationKey='shouldBatchApiRequests'
                          label='Make batch requests'
                        />
                      }
                    />
                  </Dropdown.Menu>
                </Dropdown>
              </Header.Content>
            </Header>
          </Menu.Item>
        </Menu.Menu>
      </Menu>
    </Container>
    <Container style={{ marginTop: '70px', paddingBottom: '15px' }}>
      <FetchedRegionList />
    </Container>
  </section>
);

export default HomeView;
