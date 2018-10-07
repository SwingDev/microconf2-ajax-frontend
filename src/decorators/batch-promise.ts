import 'reflect-metadata';
import { PromiseBatcherBatchFn, PromiseBatcherFindResultFn, PromiseBatcher } from '../utils/promise-batcher';

const promiseBatcherMetadataKey = Symbol('promiseBatcherMetadataKey');

export function BatchPromise<C, T, R>(
  batchFnFactory: (this: C) => PromiseBatcherBatchFn<T, R>,
  findResultFn: PromiseBatcherFindResultFn<T, R>
): MethodDecorator {
  return (
    // tslint:disable-next-line:ban-types
    target: Object,
    propertyKey: string | symbol,
    descriptor: PropertyDescriptor
  ) => {
    descriptor.value = function(this: C, arg: T): Promise<R> {
      let promiseBatcher: PromiseBatcher<T, R> | undefined =
        Reflect.getMetadata(promiseBatcherMetadataKey, target, propertyKey);

      if (promiseBatcher === undefined) {
        const batchFn: PromiseBatcherBatchFn<T, R> = batchFnFactory.call(this);
        const boundBatchFn: PromiseBatcherBatchFn<T, R> = batchFn.bind(this);

        promiseBatcher = new PromiseBatcher(boundBatchFn, findResultFn);

        Reflect.defineMetadata(promiseBatcherMetadataKey, promiseBatcher, target, propertyKey);
      }

      return promiseBatcher!.execute(arg);
    };
  };
}
