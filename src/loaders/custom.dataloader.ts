import DataLoader from 'dataloader';
import { chain, isObject } from 'lodash';

export class CustomDataLoader<K, V> extends DataLoader<K, V> {
  constructor(batchLoadFn: DataLoader.BatchLoadFn<K, V>, options?: DataLoader.Options<K, V>) {
    super(
      batchLoadFn,
      {
        cacheKeyFn: CustomDataLoader.cacheKeyFn,
        ...options,
      },
    );
  }

  static cacheKeyFn(key: any): any {
    return isObject(key)
      ? JSON.stringify(chain(key).toPairs().sortBy(0).fromPairs().value())
      : key;
  }
}
