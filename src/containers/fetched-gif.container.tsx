import React from 'react';
import Container from 'semantic-ui-react/dist/commonjs/elements/Container/Container';
import Loader from 'semantic-ui-react/dist/commonjs/elements/Loader/Loader';
import Card from 'semantic-ui-react/dist/commonjs/views/Card/Card';

import { Gif } from '../components/gif.component';
import { withErrorHandling } from '../contexts/global-error-list.context';
import { withFetchedInstance } from '../hocs/fetched-instance.hoc';
import { gifService } from '../services';

export const FetchedGif = withErrorHandling(withFetchedInstance(
  Gif,
  (props: { gifId: string }) => gifService.getGif(props.gifId),
  gifService.eventBus,
  <Card><Container style={{ height: '366px' }}><Loader active /></Container></Card>
));
