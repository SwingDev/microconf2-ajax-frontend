import React, { ReactNode, CSSProperties } from 'react';
import Divider from 'semantic-ui-react/dist/commonjs/elements/Divider/Divider';
import Segment from 'semantic-ui-react/dist/commonjs/elements/Segment/Segment';
import Statistic from 'semantic-ui-react/dist/commonjs/views/Statistic/Statistic';
import { Unsubscribe } from 'ts-event-bus/build/Slot';

import { apiClient } from '../services';
import { IRequest } from 'root/services/http/requests-statistics';

interface RequestStatsState {
  requestsStarted: number;
  requestsSuccessful: number;
  requestsFailed: number;
  avgRequestTime?: number;
  timeUntilIdle?: number;
}

export class RequestStats extends React.Component<{}, RequestStatsState> {
  readonly state: RequestStatsState = {
    requestsStarted: 0,
    requestsSuccessful: 0,
    requestsFailed: 0
  };
  private requestsUpdatedHandlerUnsubscribe: Unsubscribe;
  private computationIntervalHandle: number;

  componentWillMount() {
    this.requestsUpdatedHandlerUnsubscribe =
      apiClient.statistics.eventBus.requestsUpdated.on(this.updateStatistics);

    this.computationIntervalHandle = window.setInterval(this.updateTimeUntilIdle, 500);
  }

  componentDidUnmount() {
    this.requestsUpdatedHandlerUnsubscribe();
    window.clearInterval(this.computationIntervalHandle);
  }

  updateStatistics = () => {
    const requests: IRequest[] = apiClient.statistics.requests;

    this.setState({
      requestsStarted: requests.length,
      requestsSuccessful: requests.filter((r: IRequest) => r.state === 'success').length,
      requestsFailed: requests.filter((r: IRequest) => r.state === 'failure').length,
      avgRequestTime:
        requests
          .map((r) => (r.finishedAt || new Date()).getTime() - r.startedAt.getTime())
          .reduce((a, b) => a + b, 0)
        / requests.length
    });
  }

  updateTimeUntilIdle = () => {
    const requests: IRequest[] = apiClient.statistics.requests;

    const startTime = Math.min(...requests.map((r) => r.startedAt.getTime()));
    const finishTime = Math.max(...requests.map((r) => (r.finishedAt || new Date()).getTime()));

    this.setState({
      timeUntilIdle: finishTime - startTime
    });
  }

  render(): ReactNode {
    const wrapperStyle: CSSProperties = {
      position: 'fixed',
      bottom: '10px',
      right: '10px',
      left: '10px'
    };

    return (
      <Segment style={wrapperStyle}>
        <Statistic.Group size='mini' widths='3'>
          <Statistic>
            <Statistic.Value>{this.state.requestsStarted}</Statistic.Value>
            <Statistic.Label>Started</Statistic.Label>
          </Statistic>
          <Statistic>
            <Statistic.Value>{this.state.requestsSuccessful + this.state.requestsFailed}</Statistic.Value>
            <Statistic.Label>Finished</Statistic.Label>
          </Statistic>
          <Statistic color='red'>
            <Statistic.Value>{this.state.requestsFailed}</Statistic.Value>
            <Statistic.Label>Failed</Statistic.Label>
          </Statistic>
        </Statistic.Group>
        <Divider />
        <Statistic.Group size='mini' widths='3'>
          <Statistic>
            <Statistic.Value style={{textTransform: 'none'}}>
              {this.state.avgRequestTime ? `~${(this.state.avgRequestTime / 1000).toFixed(2)} s` : '-'}
            </Statistic.Value>
            <Statistic.Label>Per Req.</Statistic.Label>
          </Statistic>
          <Statistic>
            <Statistic.Value style={{textTransform: 'none'}}>
              {this.state.timeUntilIdle ? `${(this.state.timeUntilIdle / 1000).toFixed(1)} s` : '-'}
            </Statistic.Value>
            <Statistic.Label>Total</Statistic.Label>
          </Statistic>
        </Statistic.Group>
      </Segment>
    );
  }
}
