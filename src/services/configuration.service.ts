export class ConfigurationService {
  private searchParams: URLSearchParams;

  constructor() {
    this.searchParams = (new URL(window.location.href)).searchParams;
  }

  get hasSpinners(): boolean { return this.getParam('spinners'); }
  set hasSpinners(value: boolean) { this.setParam('spinners', value); }
  get shouldUseHttp2(): boolean { return this.getParam('http2'); }
  set shouldUseHttp2(value: boolean) { this.setParam('http2', value); }
  get shouldBatchApiRequests(): boolean { return this.getParam('batch'); }
  set shouldBatchApiRequests(value: boolean) { this.setParam('batch', value); }
  get shouldRetryApiRequests(): boolean { return this.getParam('retry'); }
  set shouldRetryApiRequests(value: boolean) { this.setParam('retry', value); }
  get shouldMemoizeApiRequests(): boolean { return this.getParam('memoize'); }
  set shouldMemoizeApiRequests(value: boolean) { this.setParam('memoize', value); }
  get shouldQueueSameApiRequests(): boolean { return this.getParam('queue'); }
  set shouldQueueSameApiRequests(value: boolean) { this.setParam('queue', value); }

  private getParam(key: string): boolean {
    return !!this.searchParams.get(key);
  }

  private setParam(key: string, value: boolean): void {
    if (value) {
      this.searchParams.set(key, '1');
    } else {
      this.searchParams.delete(key);
    }

    window.location.search = this.searchParams.toString();
  }

}

export const configurationService: ConfigurationService = new ConfigurationService();
