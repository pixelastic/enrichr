import algoliasearch from 'algoliasearch';
import Promise from 'bluebird';
import { get } from 'lodash';

const module = {
  places: null,
  /**
   * Initiate the Algolia Places instance that will be used for all location
   * calls. The instance is shared accross all calls.
   *
   * @returns {Promise.<Object>} The Algolia Places instance
   **/
  init() {
    if (!module.places) {
      module.places = algoliasearch.initPlaces();
    }
    return Promise.resolve(module.places);
  },
  /**
   * Resolves to the lat/lng coordinates of the city passed.
   *
   * @param {String} address Any string is accepted, but the "City, Country"
   * form is recommended
   * @returns {Promise.<Object>} Object containing the lat and lng coordinates
   * fields
   **/
  getCityCoordinates(address) {
    return module
      .init()
      .then(places => places.search(address, { type: 'city' }))
      .then(results => {
        const coordinates = get(results, 'hits[0]._geoloc');
        if (!coordinates) {
          return Promise.reject(new Error('NO_COORDINATES_FOUND'));
        }
        return coordinates;
      });
  },
};
export default module;
