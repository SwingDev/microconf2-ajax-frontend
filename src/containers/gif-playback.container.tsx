import React, { ReactNode } from 'react';
import LazyLoad from 'react-lazyload';
import Image from 'semantic-ui-react/dist/commonjs/elements/Image/Image';

import { IUserGifDTO } from '../dtos/user-gif.dto';

export interface GifPlaybackProps {
  instance: IUserGifDTO;
}
export interface GifPlaybackState {
  showsVideo: boolean;
}

export class GifPlayback extends React.Component<GifPlaybackProps, GifPlaybackState> {
  readonly state: GifPlaybackState = {
    showsVideo: false
  };

  showVideo = () => {
    this.setState({
      showsVideo: true
    });
  }

  render(): ReactNode {
    return (
      <div style={{ textAlign: 'center' }}>
        <a
          onClick={this.showVideo}
        >
          {
            this.state.showsVideo
            ?
              <video width='100%' height='200px' autoPlay loop>
                <source
                  src={this.props.instance.video}
                  type='video/mp4'
                />
              </video>
            :
            <LazyLoad height={200} offset={300} once>
              <Image
                src={this.props.instance.image}
                style={{ maxWidth: '100%', height: '200px' }}
              />
            </LazyLoad>
          }
        </a>
      </div>
    );
  }
}
