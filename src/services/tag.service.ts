import { IUserTagDTO } from '../dtos/user-tag-with-gifs.dto';
import { APIEventBus, createAPIEventBus } from './events/api.events';
import { IHttpClient } from './http/interfaces';

export class TagService {
  eventBus: APIEventBus<IUserTagDTO>;

  constructor(private apiClient: IHttpClient) {
    this.eventBus = createAPIEventBus();
  }

  getTagsForHomepage(): Promise<IUserTagDTO[]> {
    return this.apiClient.get('/tag', {})
      .then(this.eventBus.handleObjectsUpdate);
  }
}