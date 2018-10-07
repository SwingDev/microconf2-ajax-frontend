// tslint:disable:no-any
import axios, { AxiosResponse } from 'axios';

import { Conditional } from '../../decorators/conditional';
import { MemoizeOngoingPromises } from '../../decorators/memoize-promise';
import { AutoRetryAxios } from '../../decorators/retry-axios';
import { QueueSamePromises } from '../../decorators/queue-same';
import { AuthService } from '../auth.service';
import { configurationService } from '../configuration.service';
import { IHttpClient } from './interfaces';

export class AxiosHttpClient implements IHttpClient {
  constructor(private authService: AuthService, private baseUrl: string) {}

  get(path: string, query: any): Promise<any> {
    return this.request(path, 'GET', query, {}) as Promise<any>;
  }

  @Conditional(
    configurationService.shouldQueueSameApiRequests,
    QueueSamePromises({takeFirstXArgs: 1})
  )
  patch(path: string, body: any): Promise<any> {
    return this.request(path, 'PATCH', {}, body) as Promise<any>;
  }

  delete(path: string): Promise<void> {
    return this.request(path, 'DELETE', {}, {})
      .then(() => { return; });
  }

  @Conditional(
    configurationService.shouldMemoizeApiRequests,
    MemoizeOngoingPromises()
  )
  @Conditional(
    configurationService.shouldRetryApiRequests,
    AutoRetryAxios([501, 502, 503, 504], {
      retries: 5
    })
  )
  private request(
    path: string, method: string, query: any, body: any
  ): Promise<any | any[]> {
    return axios.request({
      baseURL: this.baseUrl,
      url: path,
      method,
      headers: {
        Authorization: this.authService.authId
      },
      params: query,
      data: body
    }).then((response: AxiosResponse) => response.data);
  }
}
