import React from 'react';

import * as uuidv4 from 'uuid/v4';

export interface ErrorWithId {
  id: string;
  err: Error;
}

export interface IErrorHandlingContext {
  addError: (err: Error) => ErrorWithId;
  removeError: (error: ErrorWithId) => void;

  errors: ErrorWithId[];
}

export const ErrorHandlingContext = React.createContext<IErrorHandlingContext>({
  addError: () => ({ id: '', err: new Error() }),
  removeError: () => undefined,

  errors: []
});

export function withErrorHandling<
  P extends {errorHandlingCtx?: IErrorHandlingContext},
  R = Omit<P, 'errorHandlingCtx'>
  >(
    Component: React.ComponentClass<P> | React.StatelessComponent<P>
  ): React.SFC<R> {
  return function BoundComponent(props: R) {
    return (
      <ErrorHandlingContext.Consumer>
        {(value) => <Component {...props} errorHandlingCtx={value} />}
      </ErrorHandlingContext.Consumer>
    );
  };
}

export class GlobalErrorHandlingProvider extends React.Component<{}, IErrorHandlingContext> {
  constructor(props: {}) {
    super(props);

    this.state = {
      addError: this.addError,
      removeError: this.removeError,
      errors: []
    };
  }

  addError: (err: Error) => ErrorWithId = (err: Error) => {
    const error: ErrorWithId = { id: this.generateId(), err };

    this.setState({
      errors: [ ...this.state.errors, error ]
    });

    setTimeout(() => this.state.removeError(error), 2500);

    return error;
  }

  removeError: (error: ErrorWithId) => void = (error: ErrorWithId) => {
    this.setState({
      errors: this.state.errors.filter((e: ErrorWithId) => e.id !== error.id)
    });
  }

  render() {
    return (
      <ErrorHandlingContext.Provider value={this.state}>
        {this.props.children}
      </ErrorHandlingContext.Provider>
    );
  }

  private generateId(): string {
    return uuidv4();
  }
}