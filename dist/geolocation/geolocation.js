'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _algoliasearch = require('algoliasearch');

var _algoliasearch2 = _interopRequireDefault(_algoliasearch);

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _lodash = require('lodash');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _module = {
  places: null,
  /**
   * Initiate the Algolia Places instance that will be used for all location
   * calls. The instance is shared accross all calls.
   *
   * @returns {Promise.<Object>} The Algolia Places instance
   **/
  init: function init() {
    if (!_module.places) {
      _module.places = _algoliasearch2.default.initPlaces();
    }
    return _bluebird2.default.resolve(_module.places);
  },

  /**
   * Resolves to the lat/lng coordinates of the city passed.
   *
   * @param {String} address Any string is accepted, but the "City, Country"
   * form is recommended
   * @returns {Promise.<Object>} Object containing the lat and lng coordinates
   * fields
   **/
  getCityCoordinates: function getCityCoordinates(address) {
    return _module.init().then(function (places) {
      return places.search(address, { type: 'city' });
    }).then(function (results) {
      var coordinates = (0, _lodash.get)(results, 'hits[0]._geoloc');
      if (!coordinates) {
        return _bluebird2.default.reject(new Error('NO_COORDINATES_FOUND'));
      }
      return coordinates;
    });
  }
};
exports.default = _module;