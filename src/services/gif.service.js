export class GifService {
  constructor(apiClient) {
    this.apiClient = apiClient;
  }

  getGifById(id) {
    return this.apiClient.get(`/gif/${id}`, {});
  }

  getGifsById(ids) {
    return this.apiClient.get(`/gif`, { ids });
  }
}
