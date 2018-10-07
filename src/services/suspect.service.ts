import { BatchPromise } from '../decorators/batch-promise';
import { Conditional } from '../decorators/conditional';
import { IUserCrimeDTO } from '../dtos/user-crime.dto';
import { IUserSuspectDTO } from '../dtos/user-suspect.dto';
import { configurationService } from './configuration.service';
import { createAPIEventBus, APIEventBus } from './events/api.events';
import { IHttpClient } from './http/interfaces';

export class SuspectService {
  eventBus: APIEventBus<IUserSuspectDTO>;

  constructor(private apiClient: IHttpClient) {
    this.eventBus = createAPIEventBus();
  }

  @Conditional(
    configurationService.shouldBatchApiRequests,
    BatchPromise(
      function(this: SuspectService) { return this.getSuspectForCrimes; },
      function(this: SuspectService, dtos: IUserSuspectDTO[], userCrime: IUserCrimeDTO) {
        return dtos.find((i) => i.id === userCrime.suspectId)!;
      }
    )
  )
  getSuspectForCrime(userCrime: IUserCrimeDTO): Promise<IUserSuspectDTO> {
    return this.apiClient.get(`/suspect/${userCrime.suspectId}`, {})
      .then(this.eventBus.handleObjectUpdate);
  }

  getSuspectForCrimes(userCrimes: IUserCrimeDTO[]): Promise<IUserSuspectDTO[]> {
    const ids: string[] = userCrimes.map((i) => i.suspectId);

    return this.apiClient.get(`/suspect`, { ids })
      .then(this.eventBus.handleObjectsUpdate);
  }
}