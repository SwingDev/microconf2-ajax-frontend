import React from 'react';
import Header from 'semantic-ui-react/dist/commonjs/elements/Header/Header';
import Segment from 'semantic-ui-react/dist/commonjs/elements/Segment/Segment';

import { FetchedCrimesListFromRegion } from '../containers/fetched-crimes-list.container';
import { IUserRegionDTO } from '../dtos/user-region-with-crimes.dto';

export interface RegionProps {
  instance: IUserRegionDTO;
}

export const Region: React.SFC<RegionProps> = (props: RegionProps) =>
  (
    <Segment>
      <Header as='h4'>
        {props.instance.name} (pop. {props.instance.pop})
      </Header>

      <FetchedCrimesListFromRegion region={props.instance} />
    </Segment>
  );
