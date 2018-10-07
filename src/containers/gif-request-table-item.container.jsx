import React from 'react';

import { RequestTableItem } from '../components/request-table-item.component';
import { gifService } from '../services';

export class GIFRequestTableItem extends React.Component {
  constructor() {
    super(...arguments);

    this.state = {
      status: 'pending',
      startedAt: new Date()
    }
  }

  static getDerivedStateFromProps(props, state) {
    if (props.gifId !== (state || {}).gifId) {
      return {
        gifId: props.gifId,
        startedAt: new Date(),
        status: 'pending',
        error: undefined
      };
    }

    return null;
  }

  componentDidMount() {
    this.fetch();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.gifId !== prevProps.gifId) {
      this.fetch();
    }
  }

  fetch() {
    this.setState((prevState) => {
      gifService.getGifById(prevState.gifId)
        .then((gif) => this.onFetchSuccess(prevState.gifId, gif))
        .catch((err) => this.onFetchFailure(prevState.gifId, err));
    });
  }

  onFetchSuccess(gifId, gif) {
    this.setState((prevState) => {
      if (prevState.gifId !== gifId) {
        return null;
      }

      return {
        finishedAt: new Date(),
        status: 'completed'
      };
    });
  }

  onFetchFailure(gifId, err) {
    this.setState((prevState) => {
      if (prevState.gifId !== gifId) {
        return null;
      }

      return {
        finishedAt: new Date(),
        status: 'failed',
        error: err
      };
    });
  }

  get secsPassed() {
    const startedAt = this.state.startedAt;
    const finishedAt = this.state.finishedAt || new Date();

    return (finishedAt.getTime() - startedAt.getTime()) / 1000.;
  }

  get details() {
    return this.state.error ? this.state.error.message : '-';
  }

  render() {
    return (
      <RequestTableItem
        name={this.props.name}
        gifId={this.props.gifId}
        secsPassed={this.secsPassed}
        status={this.state.status}
        details={this.details}
      />
    );
  }
}
