import React, { Fragment } from 'react';
import { Helmet } from 'react-helmet';
import { Switch, Route } from 'react-router-dom';

import { RequestStats } from '../containers/request-stats.container';

import HomeView from './home';
import routes from '../routes';

const RootView = () => (
  <Fragment>
    <Helmet
      titleTemplate='Microconf2 sample app - %s'
      defaultTitle='Microconf2 sample app'
    />

    <main>
      <Switch>
        <Route path={routes.ROOT} component={HomeView} />
      </Switch>
    </main>

    <RequestStats />

  </Fragment>
);

export default RootView;
