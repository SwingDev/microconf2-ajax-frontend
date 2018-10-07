import React from 'react';
import Header from 'semantic-ui-react/dist/commonjs/elements/Header/Header';
import Segment from 'semantic-ui-react/dist/commonjs/elements/Segment/Segment';
import SegmentGroup from 'semantic-ui-react/dist/commonjs/elements/Segment/SegmentGroup';

import { FetchedCrimesListFromRegion } from '../containers/fetched-crimes-list.container';
import { IUserRegionDTO } from '../dtos/user-region-with-crimes.dto';

export interface RegionProps {
  instance: IUserRegionDTO;
}

export const Region: React.SFC<RegionProps> = (props: RegionProps) =>
  (
    <Segment>
      <Header attached='top'>
        {props.instance.name} (pop. {props.instance.pop})
      </Header>
      <SegmentGroup>
        <FetchedCrimesListFromRegion region={props.instance} />
      </SegmentGroup>
    </Segment>
  );
