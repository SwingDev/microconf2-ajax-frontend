export function MemoizeOngoingPromises<R>(): MethodDecorator {
  return (
    // tslint:disable-next-line:ban-types
    target: Object,
    propertyKey: string | symbol,
    descriptor: PropertyDescriptor
  ) => {
    const originalFn: (...args: Array<unknown>) => Promise<R> = descriptor.value;
    const cache: {[k: string]: Promise<R> } = {};

    descriptor.value = function(...args: Array<unknown>): Promise<R> {
      const key: string = JSON.stringify(args);

      if (cache[key] === undefined) {
        cache[key] =
          originalFn.apply(this, args)
            .then((result: R) => {
              delete cache[key];

              return result;
            })
            .catch((e: Error) => {
              delete cache[key];
              throw e;
            });
      }

      return cache[key];
    };
  };
}
