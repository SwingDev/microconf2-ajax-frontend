import React from 'react';
import Divider from 'semantic-ui-react/dist/commonjs/elements/Divider/Divider';
import Header from 'semantic-ui-react/dist/commonjs/elements/Header/Header';
import Icon from 'semantic-ui-react/dist/commonjs/elements/Icon/Icon';

import { FetchedGifsListFromTag } from '../containers/fetched-gifs-list.container';
import { IUserTagDTO } from '../dtos/user-tag-with-gifs.dto';

export interface TagProps {
  instance: IUserTagDTO;
}

export const Tag: React.SFC<TagProps> = (props: TagProps) =>
  (
    <div>
      <Header as='h3' style={{ marginBottom: '25px', textTransform: 'uppercase' }}>
        <Icon name='smile outline' />
        {props.instance.name}
      </Header>

      <FetchedGifsListFromTag tag={props.instance} />

      <Divider />
    </div>
  );
