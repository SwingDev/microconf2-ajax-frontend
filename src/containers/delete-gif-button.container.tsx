import React from 'react';

import { APIActionButton } from './api-action-button.container';
import { IUserGifDTO } from '../dtos/user-gif.dto';
import { gifService } from '../services';

export interface DeleteGifButtonProps {
  gif: IUserGifDTO;
}

export class DeleteGifButton extends React.Component<DeleteGifButtonProps, {}> {
  action = (): Promise<void> => gifService.deleteGif(this.props.gif);

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
