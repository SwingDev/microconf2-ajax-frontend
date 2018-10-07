import React from 'react';

import { APIActionButton } from './api-action-button.container';
import { IUserGifDTO } from '../dtos/user-gif.dto';
import { gifService } from '../services';

export interface SetGifPriorityButtonProps {
  gif: IUserGifDTO;
  vote: number;
}

export class SetGifPriorityButton extends React.Component<SetGifPriorityButtonProps, {}> {
  action = async (): Promise<void> => {
    await gifService.updateGif(this.props.gif, { vote: this.props.vote });
  }

  get icon(): string | undefined {
    switch (this.props.vote) {
      case 1: return 'thumbs up outline';
      case 3: return 'thumbs down outline';
      default: return 'question';
    }
  }

  get isActive(): boolean {
    return this.props.vote === this.props.gif.vote;
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
