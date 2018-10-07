// tslint:disable:no-any
import { RequestStatistics } from './requests-statistics';

export interface IHttpClient {
  statistics: RequestStatistics;

  get(path: string, query: any): Promise<any>;
  patch(path: string, body: any): Promise<any>;
  delete(path: string): Promise<void>;
}
