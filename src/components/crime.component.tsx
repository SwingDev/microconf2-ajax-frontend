import React from 'react';

import { DeleteCrimeButton } from '../containers/delete-crime-button.container';
import { SetCrimePriorityButton } from '../containers/set-crime-priority-button.container';
import { FetchedSuspectAnnotation } from '../containers/fetched-suspect-annotation.container';
import { IUserCrimeDTO } from '../dtos/user-crime.dto';
import Segment from 'semantic-ui-react/dist/commonjs/elements/Segment/Segment';
import Header from 'semantic-ui-react/dist/commonjs/elements/Header/Header';

export interface CrimeProps {
  instance: IUserCrimeDTO;
}
export const Crime: React.SFC<CrimeProps> = (props: CrimeProps) =>
  (
    <Segment>
      <Header attached='top'>{props.instance.description}</Header>
      <FetchedSuspectAnnotation crime={props.instance} />

      <SetCrimePriorityButton crime={props.instance} priority={1} />
      <SetCrimePriorityButton crime={props.instance} priority={2} />
      <SetCrimePriorityButton crime={props.instance} priority={3} />
      <DeleteCrimeButton crime={props.instance} />
    </Segment>
  );
