import opengraph from 'open-graph';
import Promise from 'bluebird';
import request from 'request-promise';

const module = {
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
};
export default module;
