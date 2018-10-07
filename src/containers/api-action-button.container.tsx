import React, { ReactNode } from 'react';
import Button, { ButtonProps } from 'semantic-ui-react/dist/commonjs/elements/Button';

import { ErrorWithId, IErrorHandlingContext, withErrorHandling } from '../contexts/global-error-list.context';
import { configurationService } from '../services';

export interface APIActionButtonProps {
  action: () => Promise<void>;
  errorHandlingCtx: IErrorHandlingContext;
}
export interface APIActionButtonState {
  isLoading: boolean;
  error?: ErrorWithId;
}

class UnwrappedAPIActionButton extends React.Component<APIActionButtonProps & ButtonProps, APIActionButtonState> {
  readonly state: APIActionButtonState = {
    isLoading: false,
    error: undefined
  };

  performAction = () => {
    this.onFetchStart();

    this.props.action()
      .then(this.onFetchSuccess)
      .catch(this.onFetchFailure);
  }

  render(): ReactNode {
    const {action, ...buttonProps} = this.props;

    return (
      <Button
        onClick={this.performAction}
        loading={configurationService.hasSpinners && this.state.isLoading}
        disabled={configurationService.hasSpinners && this.state.isLoading}

        {...buttonProps}
      >
        {this.props.children}
      </Button>
    );
  }

  private onFetchStart = (): void => {
    if (this.state.error) {
      this.props.errorHandlingCtx.removeError(this.state.error);
    }

    this.setState({ isLoading: true, error: undefined });
  }

  private onFetchSuccess = (): void => {
    this.setState({ isLoading: false });
  }

  private onFetchFailure = (err: Error): void => {
    console.trace(err);

    this.setState({
      isLoading: false,
      error: this.props.errorHandlingCtx.addError(err)
    });
  }
}

export const APIActionButton = withErrorHandling(UnwrappedAPIActionButton);
