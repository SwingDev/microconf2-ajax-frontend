import React, { ReactNode } from 'react';
import Container from 'semantic-ui-react/dist/commonjs/elements/Container/Container';
import Segment from 'semantic-ui-react/dist/commonjs/elements/Segment/Segment';

import { withErrorHandling } from '../contexts/global-error-list.context';
import { IUserCrimeDTO } from '../dtos/user-crime.dto';
import { IUserRegionDTO } from '../dtos/user-region-with-crimes.dto';
import { withFetchedList } from '../hocs/fetched-list.hoc';
import { crimeService } from '../services';
import { FetchedCrime } from './fetched-crime.container';

type IUserCrimeIDDTO = Pick<IUserCrimeDTO, 'id'>;

export interface CrimesListFromIdsProps {
  instances: IUserCrimeIDDTO[];
}
class CrimesListFromIds extends React.Component<CrimesListFromIdsProps, {}>  {
  render(): ReactNode {
    return (
      <Container>
        <Segment>
          {this.props.instances.map((i: IUserCrimeIDDTO) =>
            <FetchedCrime key={i.id} crimeId={i.id} />
          )}
        </Segment>
      </Container>
    );
  }
}

export const FetchedCrimesListFromRegion = withErrorHandling(withFetchedList(
  CrimesListFromIds,
  (props: { region: IUserRegionDTO }) =>
    Promise.resolve(
      props.region.crimeIds.map(
        (id: string) => ({ id })
      )
    ),
  crimeService.eventBus
));
