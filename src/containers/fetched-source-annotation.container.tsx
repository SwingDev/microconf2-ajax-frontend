import React from 'react';
import Loader from 'semantic-ui-react/dist/commonjs/elements/Loader/Loader';

import { withErrorHandling } from '../contexts/global-error-list.context';
import { SourceAnnotation } from '../components/source-annotation.component';
import { IUserGifDTO } from '../dtos/user-gif.dto';
import { withFetchedInstance } from '../hocs/fetched-instance.hoc';
import { sourceService } from '../services';

export const FetchedSourceAnnotation = withErrorHandling(withFetchedInstance(
  SourceAnnotation,
  (props: { gif: IUserGifDTO }) => sourceService.getSourceForGif(props.gif),
  sourceService.eventBus,
  <p>Source: <Loader active inline size='mini' /></p>
));
