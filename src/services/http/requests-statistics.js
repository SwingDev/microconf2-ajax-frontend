import { slot, createEventBus } from 'ts-event-bus';
import * as uuidv4 from 'uuid/v4';

class Request {
  constructor(url, method, eventBus) {
    this.url = url;
    this.method = method;
    this.eventBus = eventBus;
    this.id = uuidv4();
    this.finishedAt = undefined;
    this.state = 'pending';
    this.startedAt = new Date();
  }

  succeed() {
    this.state = 'success';

    this.finish();
  }

  fail() {
    this.state = 'failure';

    this.finish();
  }

  finish() {
    this.finishedAt = new Date();

    this.eventBus.requestsUpdated(undefined);
  }
}

export class RequestStatistics {
  constructor() {
    this.requests = [];
    this.eventBus = createEventBus({
      events: {
        requestsUpdated: slot()
      },
      channels: []
    });
  }
  createRequest(url, method) {
    const request = new Request(url, method, this.eventBus);

    this.requests.push(request);

    return request;
  }
}
