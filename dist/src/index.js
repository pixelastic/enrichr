'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _openGraph = require('open-graph');

var _openGraph2 = _interopRequireDefault(_openGraph);

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _requestPromise = require('request-promise');

var _requestPromise2 = _interopRequireDefault(_requestPromise);

var _algoliasearch = require('algoliasearch');

var _algoliasearch2 = _interopRequireDefault(_algoliasearch);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _module = {
  places: null,
  initPlaces: function initPlaces() {
    if (_module.places) {
      return _module.places;
    }
    return _module.places = _algoliasearch2.default.initPlaces();
  },

  // Given an url, will resolve an object of opengraph values
  opengraph: function opengraph(url) {
    return _bluebird2.default.promisify(_openGraph2.default)(url);
  },

  // Given a twitter account, will return the url of the profile picture
  twitterPicture: function twitterPicture(twitterAccount) {
    var url = 'https://twitter.com/' + twitterAccount + '/profile_image?size=original';
    return (0, _requestPromise2.default)({
      uri: url,
      resolveWithFullResponse: true
    }).then(function (data) {
      return data.request.href;
    });
  },
  geolocation: function geolocation(address) {
    return _module.initPlaces().search(address, { type: 'city' }).then(function (results) {
      return results.hits[0]._geoloc;
    });
  }
};
exports.default = _module;