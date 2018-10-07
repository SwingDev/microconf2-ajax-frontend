import React from 'react';
import Segment from 'semantic-ui-react/dist/commonjs/elements/Segment/Segment';

import { IUserSuspectDTO } from '../dtos/user-suspect.dto';

export interface SuspectAnnotationProps {
  instance: IUserSuspectDTO;
}
export const SuspectAnnotation: React.SFC<SuspectAnnotationProps> = (props: SuspectAnnotationProps) =>
  (
    <Segment floated='right' circular>
      {props.instance.name}
    </Segment>
  );
