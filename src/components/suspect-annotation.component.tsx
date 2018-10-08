import React from 'react';

import { IUserSuspectDTO } from '../dtos/user-suspect.dto';

export interface SuspectAnnotationProps {
  instance: IUserSuspectDTO;
}
export const SuspectAnnotation: React.SFC<SuspectAnnotationProps> = (props: SuspectAnnotationProps) =>
  (
    <p>{props.instance.name}</p>
  );
