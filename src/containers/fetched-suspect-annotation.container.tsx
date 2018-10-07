import { withErrorHandling } from '../contexts/global-error-list.context';
import { SuspectAnnotation } from '../components/suspect-annotation.component';
import { IUserCrimeDTO } from '../dtos/user-crime.dto';
import { withFetchedInstance } from '../hocs/fetched-instance.hoc';
import { suspectService } from '../services';

export const FetchedSuspectAnnotation = withErrorHandling(withFetchedInstance(
  SuspectAnnotation,
  (props: { crime: IUserCrimeDTO }) => suspectService.getSuspectForCrime(props.crime),
  suspectService.eventBus
));
