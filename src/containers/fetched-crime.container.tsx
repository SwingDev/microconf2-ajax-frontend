import { Crime } from '../components/crime.component';
import { withErrorHandling } from '../contexts/global-error-list.context';
import { withFetchedInstance } from '../hocs/fetched-instance.hoc';
import { crimeService } from '../services';

export const FetchedCrime = withErrorHandling(withFetchedInstance(
  Crime,
  (props: { crimeId: string }) => crimeService.getCrime(props.crimeId),
  crimeService.eventBus
));
