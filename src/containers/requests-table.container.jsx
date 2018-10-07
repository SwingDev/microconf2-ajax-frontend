import React from 'react';
import * as uuidv4 from 'uuid/v4';

import Table from 'semantic-ui-react/dist/commonjs/collections/Table/Table';

import { GIFRequestTableItem } from './gif-request-table-item.container';

export class RequestsTable extends React.Component {
  constructor() {
    super(...arguments);

    this.state = {
      requests: [
        { reqId: uuidv4(), gifId: '3f7e1f3d-f29f-4c6f-bc07-867214dfb552' },
        { reqId: uuidv4(), gifId: '3f7e1f3d-f29f-4c6f-bc07-867214dfb552' },
        { reqId: uuidv4(), gifId: '3f7e1f3d-f29f-4c6f-bc07-867214dfb552' },
        { reqId: uuidv4(), gifId: '3f7e1f3d-f29f-4c6f-bc07-867214dfb552' },
        { reqId: uuidv4(), gifId: '3f7e1f3d-f29f-4c6f-bc07-867214dfb552' },
        { reqId: uuidv4(), gifId: '3f7e1f3d-f29f-4c6f-bc07-867214dfb552' },
        { reqId: uuidv4(), gifId: '3f7e1f3d-f29f-4c6f-bc07-867214dfb552' },
        { reqId: uuidv4(), gifId: '3f7e1f3d-f29f-4c6f-bc07-867214dfb552' },
        { reqId: uuidv4(), gifId: '3f7e1f3d-f29f-4c6f-bc07-867214dfb552' },
        { reqId: uuidv4(), gifId: '3f7e1f3d-f29f-4c6f-bc07-867214dfb552' },
        { reqId: uuidv4(), gifId: '3f7e1f3d-f29f-4c6f-bc07-867214dfb552' },
        { reqId: uuidv4(), gifId: '3f7e1f3d-f29f-4c6f-bc07-867214dfb552' },
        { reqId: uuidv4(), gifId: '3f7e1f3d-f29f-4c6f-bc07-867214dfb552' },
        { reqId: uuidv4(), gifId: '3f7e1f3d-f29f-4c6f-bc07-867214dfb552' },
        { reqId: uuidv4(), gifId: '3439ec19-cde6-43aa-9887-cca60d696929' },
        { reqId: uuidv4(), gifId: '8868cbdc-efaf-4f97-88c0-7f1a136d31cc' },
        { reqId: uuidv4(), gifId: 'a7e16a35-83d8-47ea-8421-4d91d04f1325' },
        { reqId: uuidv4(), gifId: '2cc6ecde-519f-45af-869b-aaffae532bd2' },
        { reqId: uuidv4(), gifId: '8d46260b-5ec8-4e3b-a1b9-6448eb387396' },
        { reqId: uuidv4(), gifId: 'd5b84131-1890-4e4a-a21a-d975ce30c8e1' },
        { reqId: uuidv4(), gifId: 'd29a22d3-a42e-4b93-b3ae-a0b804fdf42a' },
        { reqId: uuidv4(), gifId: 'da9bd450-e00a-46b4-8ae0-8c04199d9628' },
        { reqId: uuidv4(), gifId: '807d100f-1dc3-4a3f-9578-150c29d1481d' },
        { reqId: uuidv4(), gifId: '20ab0994-c318-4a1c-9659-15d62850756c' },
        { reqId: uuidv4(), gifId: 'c7269256-3d18-490f-af97-3cca8980bba1' },
        { reqId: uuidv4(), gifId: '994a5c80-8ef9-4070-b2d2-6a2cc9e594a2' },
        { reqId: uuidv4(), gifId: '0916b1b6-0ed0-4738-9f75-36be013b0fe0' },
        { reqId: uuidv4(), gifId: '1859a8c4-8ce9-4aa0-84fb-fd0add4e04b8' },
        { reqId: uuidv4(), gifId: '2c61e784-8a72-47ff-a4ef-636fbb189372' }
      ]
    };
  }

  render() {
    const { requests } = this.state;

    return (
      <Table fixed singleLine compact='very'>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell style={{ width: '70px', maxWidth: '70px' }}>#</Table.HeaderCell>
            <Table.HeaderCell style={{ width: '400px', maxWidth: '400px' }}>ID</Table.HeaderCell>
            <Table.HeaderCell style={{ width: '80px', maxWidth: '80px' }}>Time</Table.HeaderCell>
            <Table.HeaderCell style={{ width: '80px', maxWidth: '80px' }}>Status</Table.HeaderCell>
            <Table.HeaderCell>Details</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {requests.map((request, idx) =>
            <GIFRequestTableItem
              key={`${request.reqId}`}
              name={`${idx}`}
              gifId={request.gifId}
            />
          )}
        </Table.Body>
      </Table>
    );
  }
}
