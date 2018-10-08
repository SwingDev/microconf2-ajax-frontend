import React, { ReactNode } from 'react';
import Container from 'semantic-ui-react/dist/commonjs/elements/Container/Container';

import { Region } from '../components/region.component';
import { withErrorHandling } from '../contexts/global-error-list.context';
import { IUserRegionDTO } from '../dtos/user-region-with-crimes.dto';
import { withFetchedList } from '../hocs/fetched-list.hoc';
import { regionService } from '../services';

export interface RegionListProps {
  instances: IUserRegionDTO[];
}
class RegionList extends React.Component<RegionListProps, {}>  {
  render(): ReactNode {
    return (
      <Container>
        {this.props.instances.map((i: IUserRegionDTO) =>
          <Region key={i.id} instance={i} />
        )}
      </Container>
    );
  }
}

export const FetchedRegionList = withErrorHandling(withFetchedList(
  RegionList,
  () => regionService.getRegionsForHomepage(),
  regionService.eventBus
));
