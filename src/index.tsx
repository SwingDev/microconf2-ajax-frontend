import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router-dom';

import 'normalize.css';
import 'styles/main.scss';

import Root from 'views';

import history from 'utils/history';

import { ROOT_NODE } from 'root/constants';

const render = () => {
  ReactDOM.render(
    (
      <Router history={history}>
        <Root />
      </Router>
    ),
    ROOT_NODE as HTMLElement,
  );
};

if (module.hot) {
  module.hot.accept(() => {
    ReactDOM.unmountComponentAtNode(ROOT_NODE as HTMLElement);
    render();
  });
}

render();
