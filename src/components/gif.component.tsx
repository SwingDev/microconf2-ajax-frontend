import React from 'react';
import Card from 'semantic-ui-react/dist/commonjs/views/Card/Card';

import { DeleteGifButton } from '../containers/delete-gif-button.container';
import { FetchedSourceAnnotation } from '../containers/fetched-source-annotation.container';
import { GifPlayback } from '../containers/gif-playback.container';
import { SetGifPriorityButton } from '../containers/set-gif-vote-button.container';
import { IUserGifDTO } from '../dtos/user-gif.dto';

export interface GifProps {
  instance: IUserGifDTO;
}
export const Gif: React.SFC<GifProps> = (props: GifProps) =>
  (
    <Card>
      <GifPlayback instance={props.instance} />

      <Card.Content>
        <Card.Meta>
          <FetchedSourceAnnotation gif={props.instance} />
        </Card.Meta>
      </Card.Content>

      <Card.Content extra>
        <div className='ui two buttons'>
          <SetGifPriorityButton gif={props.instance} vote={1} />
          <SetGifPriorityButton gif={props.instance} vote={3} />
        </div>
        <div className='ui two buttons'>
          <DeleteGifButton gif={props.instance} />
        </div>
      </Card.Content>
    </Card>
  );
