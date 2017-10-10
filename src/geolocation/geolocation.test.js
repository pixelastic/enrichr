import module from './geolocation.js';
jest.mock('algoliasearch');
const algoliasearch = require('algoliasearch');

describe('geolocation', () => {
  afterEach(() => {
    jest.resetAllMocks();
    jest.restoreAllMocks();
    module.places = null;
  });
  describe('init', () => {
    it('should resolve to an Algolia Places instance', () => {
      // Given
      jest.spyOn(algoliasearch, 'initPlaces').mockReturnValue('expected');

      // When
      const actual = module.init();

      // Then
      return expect(actual).resolves.toEqual('expected');
    });
    it('should set the internal places reference', () => {
      // Given
      jest.spyOn(algoliasearch, 'initPlaces').mockReturnValue('expected');

      // When
      const actual = module.init();

      // Then
      return actual.then(() => {
        expect(module.places).toEqual('expected');
      });
    });
    it('should resolve to the same instance even if called several times', () => {
      // Given
      jest.spyOn(algoliasearch, 'initPlaces').mockReturnValue('expected');

      // When
      const actual = module.init().then(() => module.init());

      // Then
      return actual.then(result => {
        expect(algoliasearch.initPlaces).toHaveBeenCalledTimes(1);
        expect(module.places).toEqual('expected');
        expect(result).toEqual('expected');
      });
    });
  });
  describe('getCityCoordinates', () => {
    let mockSearch;
    beforeEach(() => {
      mockSearch = jest.fn().mockReturnValue(Promise.resolve());
      jest
        .spyOn(module, 'init')
        .mockReturnValue(
          Promise.resolve({
            search: mockSearch,
          })
        );
    });
    it('should search Places with the given address in city mode', () => {
      // Given
      const input = 'London, UK';

      // When
      const actual = module.getCityCoordinates(input);

      // Then
      return actual.catch(() => {
        expect(mockSearch).toHaveBeenCalledWith(input, expect.objectContaining({
            type: 'city',
          }));
      });
    });
    it('should resolve to the first result coordinates', () => {
      // Given
      mockSearch.mockReturnValue(Promise.resolve({
          hits: [{ _geoloc: 'expected' }, { _geoloc: 'nope' }],
        }));
      const input = 'London, UK';

      // When
      const actual = module.getCityCoordinates(input);

      // Then
      return expect(actual).resolves.toEqual('expected');
    });
    it('should reject if the Algolia Places call fails', () => {
      // Given
      mockSearch.mockReturnValue(Promise.reject(new Error('PLACES_FAILS')));
      const input = 'London, UK';

      // When
      const actual = module.getCityCoordinates(input);

      // Then
      return expect(actual).rejects.toEqual(new Error('PLACES_FAILS'));
    });
    it('should reject if no results found', () => {
      // Given
      mockSearch.mockReturnValue(Promise.resolve({ results: { hits: [] } }));
      const input = 'London, UK';

      // When
      const actual = module.getCityCoordinates(input);

      // Then
      return expect(actual).rejects.toEqual(new Error('NO_COORDINATES_FOUND'));
    });
  });
});
