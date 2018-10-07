export function Conditional(
  condition: boolean,
  decorator: MethodDecorator
) {
  // tslint:disable-next-line:ban-types
  return (target: Object, propertyKey: string | symbol, descriptor: PropertyDescriptor) => {
    if (condition) {
      return decorator(target, propertyKey, descriptor);
    }
  };
}
