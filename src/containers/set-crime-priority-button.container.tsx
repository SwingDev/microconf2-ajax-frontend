import React from 'react';

import { APIActionButton } from './api-action-button.container';
import { IUserCrimeDTO } from '../dtos/user-crime.dto';
import { crimeService } from '../services';

export interface SetCrimePriorityButtonProps {
  crime: IUserCrimeDTO;
  priority: number;
}

export class SetCrimePriorityButton extends React.Component<SetCrimePriorityButtonProps, {}> {
  action = async (): Promise<void> => {
    await crimeService.updateCrime(this.props.crime, { priority: this.props.priority });
  }

  get icon(): string | undefined {
    switch (this.props.priority) {
      case 1: return 'thermometer empty';
      case 2: return 'thermometer half';
      case 3: return 'thermometer full';
      default: return 'question';
    }
  }

  get isActive(): boolean {
    return this.props.priority === this.props.crime.priority;
  }

  render() {
    return (
      <APIActionButton
        active={this.isActive}
        action={this.action}
        icon={this.icon}
      />
    );
  }
}
