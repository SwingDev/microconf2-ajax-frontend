import React from 'react';
import Container from 'semantic-ui-react/dist/commonjs/elements/Container';

import { ErrorHandlingContext, IErrorHandlingContext, ErrorWithId } from '../contexts/global-error-list.context';
import { GlobalErrorItem } from './global-error-item.component';

export const GlobalErrorsList: React.SFC = () => (
  <ErrorHandlingContext.Consumer>
    {(context: IErrorHandlingContext) => (
      <Container
        style={{
          position: 'fixed',
          top: '25px',
          right: '25px',
          width: '300px',
          zIndex:  '1000'
        }}
      >
        {context.errors.map((error: ErrorWithId) =>
          <GlobalErrorItem
            key={error.id}
            error={error}
            onDismiss={context.removeError.bind(context, error)}
          />
        )}
      </Container>
    )}
  </ErrorHandlingContext.Consumer>
);
