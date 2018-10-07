import { Conditional } from '../decorators/conditional';
import { BatchPromise } from '../decorators/batch-promise';
import { IUserGifDTO } from '../dtos/user-gif.dto';
import { IUserSourceDTO } from '../dtos/user-source.dto';
import { createAPIEventBus, APIEventBus } from './events/api.events';
import { configurationService } from './configuration.service';
import { IHttpClient } from './http/interfaces';

export class SourceService {
  eventBus: APIEventBus<IUserSourceDTO>;

  constructor(private apiClient: IHttpClient) {
    this.eventBus = createAPIEventBus();
  }

  @Conditional(
    configurationService.shouldBatchApiRequests,
    BatchPromise(
      function(this: SourceService) { return this.getSourceForGifs; },
      function(this: SourceService, dtos: IUserSourceDTO[], userGif: IUserGifDTO) {
        return dtos.find((i) => i.id === userGif.sourceId)!;
      }
    )
  )
  getSourceForGif(userGif: IUserGifDTO): Promise<IUserSourceDTO> {
    return this.apiClient.get(`/source/${userGif.sourceId}`, {})
      .then(this.eventBus.handleObjectUpdate);
  }

  getSourceForGifs(userGifs: IUserGifDTO[]): Promise<IUserSourceDTO[]> {
    const ids: string[] = userGifs.map((i) => i.sourceId);

    return this.apiClient.get(`/source`, { ids })
      .then(this.eventBus.handleObjectsUpdate);
  }
}