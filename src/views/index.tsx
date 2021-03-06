import React, { Fragment } from 'react';
import { Helmet } from 'react-helmet';
import { Switch, Route } from 'react-router-dom';

import 'semantic-ui-css/components/button.min.css';
import 'semantic-ui-css/components/card.min.css';
import 'semantic-ui-css/components/checkbox.min.css';
import 'semantic-ui-css/components/container.min.css';
import 'semantic-ui-css/components/divider.min.css';
import 'semantic-ui-css/components/dropdown.min.css';
import 'semantic-ui-css/components/header.min.css';
import 'semantic-ui-css/components/icon.min.css';
import 'semantic-ui-css/components/loader.min.css';
import 'semantic-ui-css/components/menu.min.css';
import 'semantic-ui-css/components/message.min.css';
import 'semantic-ui-css/components/segment.min.css';
import 'semantic-ui-css/components/statistic.min.css';
import 'semantic-ui-css/components/transition.min.css';

import { GlobalErrorsList } from '../components/global-error-list.component';
import { RequestStats } from '../containers/request-stats.container';
import { GlobalErrorHandlingProvider } from '../contexts/global-error-list.context';
import HomeView from './home';
import routes from '../routes';
import { configurationService } from '../services';

const RootView: React.StatelessComponent<{}> = () => (
  <Fragment>
    <Helmet
      titleTemplate='Microconf2 sample app - %s'
      defaultTitle='Microconf2 sample app'
    />

    <main>
      <GlobalErrorHandlingProvider>
        <GlobalErrorsList />
        <Switch>
          <Route path={routes.ROOT} component={HomeView}/>
        </Switch>
      </GlobalErrorHandlingProvider>
    </main>

    {configurationService.showsStats ? <RequestStats /> : <span />}

  </Fragment>
);

export default RootView;
