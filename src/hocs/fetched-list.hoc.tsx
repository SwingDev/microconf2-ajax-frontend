// tslint:disable:max-line-length

import React, { ReactNode } from 'react';
import Loader from 'semantic-ui-react/dist/commonjs/elements/Loader/Loader';
import Segment from 'semantic-ui-react/dist/commonjs/elements/Segment/Segment';

import { IErrorHandlingContext, ErrorWithId } from '../contexts/global-error-list.context';
import { InstanceWithId } from '../interfaces/resources.interface';
import { configurationService } from '../services';
import { APIEventBus, APIEventUnsubscribe } from '../services/events/api.events';

// P -> Component Props
// FP -> Fetcher Props
// T -> Fetched Instance Type

interface WithFetchedListState<T> {
  instances: T[];
  isLoading: boolean;
  error?: ErrorWithId;
}

interface WithFetchedListSetProps<T> {
  instances: T[];
}

interface WithFetchedListOwnProps {
  errorHandlingCtx: IErrorHandlingContext;
}

type WithFetchedListProps<P extends WithFetchedListSetProps<T>, FP, T> = OmitKeys<P, WithFetchedListSetProps<T>> & FP & WithFetchedListOwnProps;
type WithFetchedListFetcher<FP, T> = (props: Readonly<FP>) => Promise<T[]>;

export const withFetchedList = <P extends WithFetchedListSetProps<T>, FP, T extends InstanceWithId>(
  Component: React.ComponentType<P>,
  fetcher: WithFetchedListFetcher<FP, T>,
  apiEventBus?: APIEventBus<T>,
  loader?: ReactNode
) =>
  class WithFetchedList extends React.Component<WithFetchedListProps<P, FP, T>, WithFetchedListState<T>> {
    readonly state: WithFetchedListState<T> = {
      instances: [],
      isLoading: false,
      error: undefined
    };

    private updatedObjectHandlerUnsubscribe?: APIEventUnsubscribe;
    private deletedObjectByIdHandlerUnsubscribe?: APIEventUnsubscribe;

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
        return loader || <Segment borderless><Loader active inline='centered' size='tiny' /></Segment>;
      } else {
        return <Component instances={this.state.instances} {...this.props} />;
      }
    }

    private bindApiEvents() {
      if (apiEventBus !== undefined) {
        this.updatedObjectHandlerUnsubscribe = apiEventBus.updatedObject.on((instance: T) => {
          this.setState({
            instances: this.state.instances.map((i: T) => (i.id === instance.id) ? instance : i)
          });
        });

        this.deletedObjectByIdHandlerUnsubscribe = apiEventBus.deletedObjectById.on((id: string) => {
          this.setState({
            instances: this.state.instances.filter((i: T) => (i.id !== id))
          });
        });
      }
    }

    private unbindApiEvents() {
      if (this.updatedObjectHandlerUnsubscribe !== undefined) {
        this.updatedObjectHandlerUnsubscribe();
      }
      if (this.deletedObjectByIdHandlerUnsubscribe !== undefined) {
        this.deletedObjectByIdHandlerUnsubscribe();
      }
    }

    private onFetchStart = (): void => {
      if (this.state.error) {
        this.props.errorHandlingCtx.removeError(this.state.error);
      }

      this.setState({ isLoading: true, error: undefined });
    }

    private onFetchSuccess = (instances: T[]): void => {
      this.setState({ instances, isLoading: false });
    }

    private onFetchFailure = (err: Error): void => {
      console.trace(err);

      this.setState({
        isLoading: false,
        error: this.props.errorHandlingCtx.addError(err)
      });
    }
  };
