// tslint:disable:no-any

export interface IHttpClient {
  get(path: string, query: any): Promise<any>;
  patch(path: string, body: any): Promise<any>;
  delete(path: string): Promise<void>;
}
