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

var _geolocation = require('./geolocation/geolocation.js');

var _geolocation2 = _interopRequireDefault(_geolocation);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _module = {
  places: null,
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
  cityCoordinates: function cityCoordinates(cityAddress) {
    return _geolocation2.default.getCityCoordinates(cityAddress);
  }
};
exports.default = _module;