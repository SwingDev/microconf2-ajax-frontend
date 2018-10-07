import { AxiosError } from 'axios';
import * as AsyncRetry from 'async-retry';

export function AutoRetryAxios<R>(
  onStatusCodes: number[] = [501, 502, 503, 504],
  opts: AsyncRetry.Options = {}
): MethodDecorator {
  return (
    // tslint:disable-next-line:ban-types
    target: Object,
    propertyKey: string | symbol,
    descriptor: PropertyDescriptor
  ) => {
    const originalFn: (...args: Array<unknown>) => Promise<R> = descriptor.value;

    descriptor.value = function(...args: Array<unknown>): Promise<R> {
      return AsyncRetry((bailFn: (err: Error) => void): Promise<R> => {
        return originalFn.apply(this, args)
          .catch((axiosErr: AxiosError) => {
            if (axiosErr.response !== undefined) {
              if (onStatusCodes.indexOf(axiosErr.response!.status) === -1) {
                bailFn(axiosErr);
              }
            }

            throw axiosErr;
          });
      }, opts);
    };
  };
}
