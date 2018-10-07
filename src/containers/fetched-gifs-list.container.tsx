import React, { ReactNode } from 'react';
import Card from 'semantic-ui-react/dist/commonjs/views/Card/Card';

import { withErrorHandling } from '../contexts/global-error-list.context';
import { IUserGifDTO } from '../dtos/user-gif.dto';
import { IUserTagDTO } from '../dtos/user-tag-with-gifs.dto';
import { withFetchedList } from '../hocs/fetched-list.hoc';
import { gifService } from '../services';
import { FetchedGif } from './fetched-gif.container';

type IUserGifIDDTO = Pick<IUserGifDTO, 'id'>;

export interface GifsListFromIdsProps {
  instances: IUserGifIDDTO[];
}
class GifsListFromIds extends React.Component<GifsListFromIdsProps, {}>  {
  render(): ReactNode {
    return (
      <Card.Group stackable itemsPerRow={3}>
        {this.props.instances.map((i: IUserGifIDDTO) =>
          <FetchedGif key={i.id} gifId={i.id} />
        )}
      </Card.Group>
    );
  }
}

export const FetchedGifsListFromTag = withErrorHandling(withFetchedList(
  GifsListFromIds,
  (props: { tag: IUserTagDTO }) =>
    Promise.resolve(
      props.tag.gifIds.map(
        (id: string) => ({ id })
      )
    ),
  gifService.eventBus
));
