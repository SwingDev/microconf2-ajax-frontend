import React from 'react';

import Label from 'semantic-ui-react/dist/commonjs/elements/Label/Label';
import Table from 'semantic-ui-react/dist/commonjs/collections/Table/Table';

import { RequestStatus } from './request-status.component';
import { RequestTimeLabel } from './request-time-label.component';

export const RequestTableItem = (props) => {
  const { name, gifId, secsPassed, status, details } = props;

  const cellStyle = {
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  };

  return (
    <Table.Row>
      <Table.Cell style={cellStyle}>
        <Label ribbon>{name}</Label>
      </Table.Cell>
      <Table.Cell style={cellStyle}>
        {gifId}
      </Table.Cell>
      <Table.Cell style={cellStyle} textAlign='right'>
        <RequestTimeLabel secs={secsPassed} />
      </Table.Cell>
      <Table.Cell style={cellStyle} textAlign='center'>
        <RequestStatus status={status} />
      </Table.Cell>
      <Table.Cell style={cellStyle}>
        {details}
      </Table.Cell>
    </Table.Row>
  );
};
