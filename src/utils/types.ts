type Omit<T, K> = Pick<T, Exclude<keyof T, K>>;
type OmitKeys<T, P> = Omit<T, keyof P>;