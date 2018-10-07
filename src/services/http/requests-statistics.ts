import { slot, createEventBus, EventDeclaration } from 'ts-event-bus';
import * as uuidv4 from 'uuid/v4';

export type RequestState = 'pending' | 'success' | 'failure';

export interface IRequest {
  id: string;
  startedAt: Date;
  finishedAt?: Date;
  state: RequestState;
  method: string;
  url: string;

  succeed(): void;
  fail(): void;
}

class Request implements IRequest {
  id: string = uuidv4();
  startedAt: Date;
  finishedAt?: Date = undefined;
  state: RequestState = 'pending';

  constructor(public url: string, public method: string, private eventBus: EventDeclaration) {
    this.startedAt = new Date();
  }

  succeed(): void {
    this.state = 'success';

    this.finish();
  }

  fail(): void {
    this.state = 'failure';

    this.finish();
  }

  private finish(): void {
    this.finishedAt = new Date();

    this.eventBus.requestsUpdated(undefined);
  }
}

// tslint:disable-next-line:max-classes-per-file
export class RequestStatistics {
  eventBus: EventDeclaration;
  requests: IRequest[] = [];

  constructor() {
    this.eventBus = createEventBus({
      events: {
        requestsUpdated: slot<void>()
      },
      channels: []
    });
  }

  createRequest(url: string, method: string): IRequest {
    const request: IRequest = new Request(url, method, this.eventBus);

    this.requests.push(request);

    return request;
  }
}