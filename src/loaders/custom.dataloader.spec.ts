import { CustomDataLoader } from "./custom.dataloader";

describe('CustomDataLoader', () => {
  let customDataLoader: CustomDataLoader<any, any>;

  beforeEach(async () => {
     customDataLoader = new CustomDataLoader(jest.fn());
  });

  describe('cacheKeyFn', () => {
    it ('key is object, should return json string sorted by key', () => {
      const cacheKey = CustomDataLoader.cacheKeyFn({ b: 'b', c: 'c', a: 'a' });
      expect(cacheKey).toBe(JSON.stringify({ a: 'a', b: 'b', c: 'c' }));
    });

    it ('key isn\'t object, should return return key', () => {
      const cacheKey = CustomDataLoader.cacheKeyFn('a');
      expect(cacheKey).toBe('a');
    });
  });

  it('should custom cacheKeyFn', async () => {
    expect(customDataLoader).toHaveProperty('_options.cacheKeyFn', CustomDataLoader.cacheKeyFn);
  });
});
