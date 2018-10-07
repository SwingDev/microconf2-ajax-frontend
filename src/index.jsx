import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router-dom';

import createHistory from 'history/createBrowserHistory';

import 'normalize.css';
import 'semantic-ui-css/components/reset.min.css';
import 'semantic-ui-css/components/site.min.css';
import 'semantic-ui-css/components/container.min.css';
import 'semantic-ui-css/components/header.min.css';
import 'semantic-ui-css/components/icon.min.css';
import 'semantic-ui-css/components/label.min.css';
import 'semantic-ui-css/components/loader.min.css';
import 'semantic-ui-css/components/menu.min.css';
import 'semantic-ui-css/components/segment.min.css';
import 'semantic-ui-css/components/statistic.min.css';
import 'semantic-ui-css/components/table.min.css';
import 'semantic-ui-css/components/transition.min.css';

import { ROOT_NODE } from './constants';
import Root from './views';

const history = createHistory();

const render = () => {
    ReactDOM.render(
        (
            <Router history={history}>
                <Root />
            </Router>
        ),
        ROOT_NODE
    );
};

if (module.hot) {
    module.hot.accept(() => {
        ReactDOM.unmountComponentAtNode(ROOT_NODE);
        render();
    });
}

render();
