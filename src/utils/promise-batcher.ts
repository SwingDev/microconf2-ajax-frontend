export type PromiseBatcherBatchFn<T, R> = (arg: T[]) => Promise<R[]>;
export type PromiseBatcherFindResultFn<T, R> = (results: R[], arg: T) => R;

export type PromiseResolveFn<R> = (result: R) => void;
export type PromiseRejectFn = (err: Error) => void;

interface QueuedPromise<T, R> {
  arg: T;
  resolve: PromiseResolveFn<R>;
  reject: PromiseRejectFn;
}

export class PromiseBatcher<T, R> {
  private queue: Array<QueuedPromise<T, R>> = [];

  private enqueuedExecutionHandle?: number;

  constructor(
    private batchFn: PromiseBatcherBatchFn<T, R>,
    private findResultFn: PromiseBatcherFindResultFn<T, R>
  ) {}

  execute(arg: T): Promise<R> {
    const promise: Promise<R> = new Promise((resolve: PromiseResolveFn<R>, reject: PromiseRejectFn) => {
      this.queue.push({ arg, resolve, reject });

      this.enqueueExecution();
    });

    return promise;
  }

  private enqueueExecution() {
    if (this.enqueuedExecutionHandle !== undefined) {
      clearTimeout(this.enqueuedExecutionHandle);
    }

    this.enqueuedExecutionHandle = window.setTimeout(() => {
      const queuedBatch: Array<QueuedPromise<T, R>> = this.queue;

      this.queue = [];
      this.enqueuedExecutionHandle = undefined;

      this.executeBatch(queuedBatch);
    }, 0);
  }

  private async executeBatch(queuedBatch: Array<QueuedPromise<T, R>>): Promise<void> {
    const argsSet: Set<T> = new Set(queuedBatch.map((i) => i.arg));

    await this.batchFn(Array.from(argsSet))
      .then((results: R[]) => {
        queuedBatch.forEach((i) => i.resolve(this.findResultFn(results, i.arg)));
      })
      .catch((err: Error) => {
        queuedBatch.forEach((i) => i.reject(err));
      });
  }
}