import opengraph from 'open-graph';
import Promise from 'bluebird';
import request from 'request-promise';
import algoliasearch from 'algoliasearch';

const module = {
  places: null,
  initPlaces() {
    if (module.places) {
      return module.places;
    }
    return (module.places = algoliasearch.initPlaces());
  },
  // Given an url, will resolve an object of opengraph values
  opengraph(url) {
    return Promise.promisify(opengraph)(url);
  },
  // Given a twitter account, will return the url of the profile picture
  twitterPicture(twitterAccount) {
    const url = `https://twitter.com/${twitterAccount}/profile_image?size=original`;
    return request({
      uri: url,
      resolveWithFullResponse: true,
    }).then(data => data.request.href);
  },
  geolocation(address) {
    return module
      .initPlaces()
      .search(address, { type: 'city' })
      .then(results => results.hits[0]._geoloc);
  },
};
export default module;
