import { Conditional } from '../decorators/conditional';
import { BatchPromise } from '../decorators/batch-promise';
import { IUserGifDTO } from '../dtos/user-gif.dto';
import { IPatchUserGifDTO } from '../dtos/patch-user-gif.dto';
import { configurationService } from './configuration.service';
import { createAPIEventBus, APIEventBus } from './events/api.events';
import { IHttpClient } from './http/interfaces';

export class GifService {
  eventBus: APIEventBus<IUserGifDTO>;

  constructor(private apiClient: IHttpClient) {
    this.eventBus = createAPIEventBus();
  }

  @Conditional(
    configurationService.shouldBatchApiRequests,
    BatchPromise(
      function(this: GifService) { return this.getGifsById; },
      function(this: GifService, dtos: IUserGifDTO[], id: string) {
        return dtos.find((i) => i.id === id)!;
      }
    )
  )
  getGif(id: string): Promise<IUserGifDTO> {
    return this.apiClient.get(`/gif/${id}`, {})
      .then(this.eventBus.handleObjectUpdate);
  }

  getGifsById(ids: string[]): Promise<IUserGifDTO[]> {
    return this.apiClient.get(`/gif`, {ids})
      .then(this.eventBus.handleObjectsUpdate);
  }

  updateGif(userGif: IUserGifDTO, data: IPatchUserGifDTO): Promise<IUserGifDTO> {
    return this.apiClient.patch(`/gif/${userGif.id}`, data)
      .then(this.eventBus.handleObjectUpdate);
  }

  deleteGif(userGif: IUserGifDTO): Promise<void> {
    return this.apiClient.delete(`/gif/${userGif.id}`)
      .then(() => this.eventBus.handleObjectDeleteById(userGif.id));
  }
}
