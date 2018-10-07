import React from 'react';
import Message from 'semantic-ui-react/dist/commonjs/collections/Message';

import { ErrorWithId } from '../contexts/global-error-list.context';

interface GlobalErrorListItemProps {
  error: ErrorWithId,
  onDismiss: () => void
}

export const GlobalErrorItem: React.SFC<GlobalErrorListItemProps> =
  (props: GlobalErrorListItemProps) =>
    (
      <Message
        negative
        content={props.error.err.message}
        onDismiss={props.onDismiss}
      />
    );
