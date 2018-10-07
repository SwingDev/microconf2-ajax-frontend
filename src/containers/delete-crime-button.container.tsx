import React from 'react';

import { APIActionButton } from './api-action-button.container';
import { IUserCrimeDTO } from '../dtos/user-crime.dto';
import { crimeService } from '../services';

export interface DeleteCrimeButtonProps {
  crime: IUserCrimeDTO;
}

export class DeleteCrimeButton extends React.Component<DeleteCrimeButtonProps, {}> {
  action = (): Promise<void> => crimeService.deleteCrime(this.props.crime);

  render() {
    return (
      <APIActionButton
        action={this.action}
        icon='trash'
        color='red'
      />
    );
  }
}
