import React from 'react';
import Card from 'semantic-ui-react/dist/commonjs/views/Card/Card';
import Header from 'semantic-ui-react/dist/commonjs/elements/Header/Header';

import { DeleteCrimeButton } from '../containers/delete-crime-button.container';
import { SetCrimePriorityButton } from '../containers/set-crime-priority-button.container';
import { FetchedSuspectAnnotation } from '../containers/fetched-suspect-annotation.container';
import { IUserCrimeDTO } from '../dtos/user-crime.dto';

export interface CrimeProps {
  instance: IUserCrimeDTO;
}
export const Crime: React.SFC<CrimeProps> = (props: CrimeProps) =>
  (
    <Card>
      <Card.Content>
        <Header
          as='h5'
          style={
            {
              height: '2.4em',
              display: '-webkit-box',
              '-webkit-line-clamp': '2',
              '-webkit-box-orient': 'vertical',
              overflow: 'hidden'
            }
          }
        >
          {props.instance.description}
        </Header>
        <Card.Meta>
          <FetchedSuspectAnnotation crime={props.instance} />
        </Card.Meta>
      </Card.Content>

      <Card.Content extra>
        <div className='ui four buttons'>
          <SetCrimePriorityButton crime={props.instance} priority={1} />
          <SetCrimePriorityButton crime={props.instance} priority={2} />
          <SetCrimePriorityButton crime={props.instance} priority={3} />
          <DeleteCrimeButton crime={props.instance} />
        </div>
      </Card.Content>
    </Card>
  );