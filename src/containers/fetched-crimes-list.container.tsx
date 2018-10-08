import React, { ReactNode } from 'react';
import Card from 'semantic-ui-react/dist/commonjs/views/Card/Card';

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
      <Card.Group itemsPerRow={4}>
        {this.props.instances.map((i: IUserCrimeIDDTO) =>
          <FetchedCrime key={i.id} crimeId={i.id} />
        )}
      </Card.Group>
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
