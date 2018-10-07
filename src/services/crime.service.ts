import { BatchPromise } from '../decorators/batch-promise';
import { Conditional } from '../decorators/conditional';
import { IUserCrimeDTO } from '../dtos/user-crime.dto';
import { IPatchUserCrimeDTO } from '../dtos/patch-user-crime.dto';
import { configurationService } from './configuration.service';
import { createAPIEventBus, APIEventBus } from './events/api.events';
import { IHttpClient } from './http/interfaces';

export class CrimeService {
  eventBus: APIEventBus<IUserCrimeDTO>;

  constructor(private apiClient: IHttpClient) {
    this.eventBus = createAPIEventBus();
  }

  @Conditional(
    configurationService.shouldBatchApiRequests,
    BatchPromise(
      function(this: CrimeService) { return this.getCrimesById; },
      function(this: CrimeService, dtos: IUserCrimeDTO[], id: string) {
        return dtos.find((i) => i.id === id)!;
      }
    )
  )
  getCrime(id: string): Promise<IUserCrimeDTO> {
    return this.apiClient.get(`/crime/${id}`, {})
      .then(this.eventBus.handleObjectUpdate);
  }

  getCrimesById(ids: string[]): Promise<IUserCrimeDTO[]> {
    return this.apiClient.get(`/crime`, {ids})
      .then(this.eventBus.handleObjectsUpdate);
  }

  updateCrime(userCrime: IUserCrimeDTO, data: IPatchUserCrimeDTO): Promise<IUserCrimeDTO> {
    return this.apiClient.patch(`/crime/${userCrime.id}`, data)
      .then(this.eventBus.handleObjectUpdate);
  }

  deleteCrime(userCrime: IUserCrimeDTO): Promise<void> {
    return this.apiClient.delete(`/crime/${userCrime.id}`)
      .then(() => this.eventBus.handleObjectDeleteById(userCrime.id));
  }
}
