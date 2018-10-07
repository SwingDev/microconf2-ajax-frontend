import { IUserRegionDTO } from '../dtos/user-region-with-crimes.dto';
import { APIEventBus, createAPIEventBus } from './events/api.events';
import { IHttpClient } from './http/interfaces';

export class RegionService {
  eventBus: APIEventBus<IUserRegionDTO>;

  constructor(private apiClient: IHttpClient) {
    this.eventBus = createAPIEventBus();
  }

  getRegionsForHomepage(): Promise<IUserRegionDTO[]> {
    return this.apiClient.get('/region', {})
      .then(this.eventBus.handleObjectsUpdate);
  }
}