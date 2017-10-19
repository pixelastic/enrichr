import opengraph from 'open-graph';
import Promise from 'bluebird';
import geolocation from './geolocation/geolocation.js';
import twitter from './twitter/twitter.js';

const module = {
  // Given an url, will resolve an object of opengraph values
  opengraph(url) {
    return Promise.promisify(opengraph)(url);
  },
  /**
   * Return the url of the profile picture of the specified twitter account
   * Note that if a user update its profile picture, the resulting url will be
   * different.
   *
   * @param {String} handle Twitter handle
   * @returns {Promise.<String>} Url of the profile picture
   **/
  twitterPicture(handle) {
    return twitter.picture(handle);
  },
  /**
   * Resolves to the lat/lng coordinates of the city passed.
   *
   * @param {String} cityAddress Any string is accepted, but the "City, Country"
   * form is recommended
   * @returns {Promise.<Object>} Object containing the lat and lng coordinates
   * fields
   **/
  cityCoordinates(cityAddress) {
    return geolocation.getCityCoordinates(cityAddress);
  },
};
export default module;
