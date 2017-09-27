'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _openGraph = require('open-graph');

var _openGraph2 = _interopRequireDefault(_openGraph);

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _module = {
  // Given an url, will resolve an object of opengraph values
  opengraph: function opengraph(url) {
    return _bluebird2.default.promisify(_openGraph2.default)(url);
  }
};
exports.default = _module;