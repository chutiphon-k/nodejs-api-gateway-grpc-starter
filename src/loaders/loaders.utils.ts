import DataLoader from 'dataloader';
import { chain, isObject } from 'lodash';

export const cacheKeyFn = (key: object): string => isObject(key)
  ? JSON.stringify(chain(key).toPairs().sortBy(0).value())
  : key;

export class CustomDataLoader<K, V> extends DataLoader<K, V> {
  constructor(batchLoadFn: DataLoader.BatchLoadFn<K, V>, options?: DataLoader.Options<K, V>) {
    super(
      batchLoadFn,
      { cacheKeyFn, ...options },
    );
  }
}
