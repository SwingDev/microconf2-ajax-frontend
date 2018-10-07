import axios from 'axios';

import { RequestStatistics } from './requests-statistics';

export class AxiosHttpClient {
  constructor(authService, baseUrl) {
    this.authService = authService;
    this.baseUrl = baseUrl;

    this.statistics = new RequestStatistics();
  }

  get(path, query) {
    return this.request(path, 'GET', query, {});
  }

  makeAxiosRequest(path, method, query, body) {
    return axios.request({
      baseURL: this.baseUrl,
      url: path,
      method,
      headers: {
        'Authorization': this.authService.authId
      },
      params: query,
      data: body
    });
  }

  request(path, method, query, body) {
    const request = this.statistics.createRequest(path, method);

    return this.makeAxiosRequest(path, method, query, body)
      .then((response) => {
        request.succeed();
        return response.data;
      })
      .catch((err) => {
        request.fail();
        throw err;
      });
  }
}
