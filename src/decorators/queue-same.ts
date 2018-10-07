import * as pQueue from 'promise-queue';

interface IQueueSamePromisesOpts {
  takeFirstXArgs: number;
}

const defaultOpts: Pick<IQueueSamePromisesOpts, 'takeFirstXArgs'> = {
  takeFirstXArgs:  1
};

export function QueueSamePromises<R>(opts: Partial<IQueueSamePromisesOpts>): MethodDecorator {
  const resolvedOpts: IQueueSamePromisesOpts = { ...defaultOpts, ...opts };

  return (
    // tslint:disable-next-line:ban-types
    target: Object,
    propertyKey: string | symbol,
    descriptor: PropertyDescriptor
  ) => {
    const originalFn: (...args: Array<unknown>) => Promise<R> = descriptor.value;
    const cache: { [k: string]: pQueue } = {};

    descriptor.value = function(...args: Array<unknown>): Promise<R> {
      // Grab / create the right limited Queue
      const key: string = JSON.stringify(args.slice(0, resolvedOpts.takeFirstXArgs));
      if (cache[key] === undefined) {
        cache[key] = new pQueue(1);
      }

      // Add promise factory to the Queue
      const queuedPromise: Promise<R> =
        cache[key].add(() => originalFn.apply(this, args));

      // Add a GC task to the Queue
      cache[key].add(() => {
        if (cache[key] && cache[key].getPendingLength() + cache[key].getQueueLength() === 1) {
          delete cache[key];
        }

        return Promise.resolve();
      });

      return queuedPromise;
    };
  };
}
