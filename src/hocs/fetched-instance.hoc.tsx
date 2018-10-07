// tslint:disable:max-line-length

import React, { ReactNode } from 'react';
import Segment from 'semantic-ui-react/dist/commonjs/elements/Segment/Segment';

import { IErrorHandlingContext, ErrorWithId } from '../contexts/global-error-list.context';
import { InstanceWithId } from '../interfaces/resources.interface';
import { configurationService } from '../services';
import { APIEventBus, APIEventUnsubscribe } from '../services/events/api.events';

// P -> Component Props
// FP -> Fetcher Props
// T -> Fetched Instance Type

interface WithFetchedInstanceState<T> {
  instance?: T;
  isLoading: boolean;
  error?: ErrorWithId;
}

interface WithFetchedInstanceSetProps<T> {
  instance: T;
}

interface WithFetchedInstanceOwnProps {
  errorHandlingCtx: IErrorHandlingContext;
}

type WithFetchedInstanceProps<P extends WithFetchedInstanceSetProps<T>, FP, T> = OmitKeys<P, WithFetchedInstanceSetProps<T>> & FP & WithFetchedInstanceOwnProps;
type WithFetchedInstanceFetcher<FP, T> = (props: Readonly<FP>) => Promise<T>;

export const withFetchedInstance = <P extends WithFetchedInstanceSetProps<T>, FP, T extends InstanceWithId>(
  Component: React.ComponentType<P>,
  fetcher: WithFetchedInstanceFetcher<FP, T>,
  apiEventBus?: APIEventBus<T>
) =>
  class WithFetchedInstance extends React.Component<WithFetchedInstanceProps<P, FP, T>, WithFetchedInstanceState<T>> {
    readonly state: WithFetchedInstanceState<T> = {
      instance: undefined,
      isLoading: false,
      error: undefined
    };

    private updatedObjectHandlerUnsubscribe?: APIEventUnsubscribe;

    componentDidMount() {
      this.bindApiEvents();

      this.fetch();
    }

    componentWillUnmount() {
      this.unbindApiEvents();
    }

    fetch(): void {
      this.onFetchStart();

      fetcher(this.props)
        .then(this.onFetchSuccess)
        .catch(this.onFetchFailure);
    }

    render(): ReactNode {
      if (configurationService.hasSpinners && this.state.isLoading) {
        return <Segment loading style={{ height: '100px' }} />;
      } else {
        if (this.state.instance) {
          return <Component {...this.props} instance={this.state.instance} />;
        } else {
          return <Segment> - </Segment>;
        }
      }
    }
    private bindApiEvents() {
      if (apiEventBus !== undefined) {
        this.updatedObjectHandlerUnsubscribe = apiEventBus.updatedObject.on((instance: T) => {
          if (this.state.instance && instance.id === this.state.instance.id) {
            this.setState({instance});
          }
        });
      }
    }

    private unbindApiEvents() {
      if (this.updatedObjectHandlerUnsubscribe !== undefined) {
        this.updatedObjectHandlerUnsubscribe();
      }
    }

    private onFetchStart = (): void => {
      if (this.state.error) {
        this.props.errorHandlingCtx.removeError(this.state.error);
      }

      this.setState({ isLoading: true, error: undefined });
    }

    private onFetchSuccess = (instance: T): void => {
      this.setState({ instance, isLoading: false });
    }

    private onFetchFailure = (err: Error): void => {
      console.trace(err);

      this.setState({
        isLoading: false,
        error: this.props.errorHandlingCtx.addError(err)
      });
    }
  };
