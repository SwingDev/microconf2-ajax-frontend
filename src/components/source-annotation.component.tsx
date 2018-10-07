import React from 'react';

import { IUserSourceDTO } from '../dtos/user-source.dto';

export interface SourceAnnotationProps {
  instance: IUserSourceDTO;
}
export const SourceAnnotation: React.SFC<SourceAnnotationProps> = (props: SourceAnnotationProps) =>
  (
    <p>Source: <a href={`https://${props.instance.tld}`}>{props.instance.name}</a></p>
  );
