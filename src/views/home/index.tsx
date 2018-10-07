import React from 'react';
import { Helmet } from 'react-helmet';
import Menu from 'semantic-ui-react/dist/commonjs/collections/Menu';
import Icon from 'semantic-ui-react/dist/commonjs/elements/Icon';
import Header from 'semantic-ui-react/dist/commonjs/elements/Header';
import Dropdown from 'semantic-ui-react/dist/commonjs/modules/Dropdown';

import { FetchedTagList } from '../../containers/fetched-tag-list.container';
import { ConfigurationToggle } from '../../containers/configuration-toggle.container';

const HomeView: React.StatelessComponent<{}> = () => (
  <section>
    <Helmet>
      <title>Home</title>
    </Helmet>
    <div>
      <Menu inverted>
        <Menu.Item>
          <Header as='h3' inverted>
            Microconf 2
          </Header>
        </Menu.Item>
      </Menu>
    </div>

    <div style={{ marginTop: '25px', paddingBottom: '15px' }}>
      <FetchedTagList />
    </div>

    <Dropdown
      simple
      style={{ position: 'fixed', top: '14px', right: '14px' }}
      icon={<Icon inverted name='cog' size='large' />}
      closeOnChange={false}
      openOnFocus={false}
      direction='left'
    >
      <Dropdown.Menu>
        <Dropdown.Item
          content={
            <ConfigurationToggle
              configurationKey='showsStats'
              label='Show Statistics'
            />
          }
        />
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

  </section>
);

export default HomeView;
