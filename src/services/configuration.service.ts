class ConfigurationService {
  hasSpinners: boolean;
  shouldBatchApiRequests: boolean;
  shouldRetryApiRequests: boolean;
  shouldMemoizeApiRequests: boolean;
  shouldQueueSameApiRequests: boolean;

  constructor() {
    const queryParams: URLSearchParams = (new URL(window.location.href)).searchParams;

    this.hasSpinners = !!queryParams.get('spinners');
    this.shouldBatchApiRequests = !!queryParams.get('batch');
    this.shouldRetryApiRequests = !!queryParams.get('retry');
    this.shouldMemoizeApiRequests = !!queryParams.get('memoize');
    this.shouldQueueSameApiRequests = !!queryParams.get('queue');
  }
}

export const configurationService: ConfigurationService = new ConfigurationService();
