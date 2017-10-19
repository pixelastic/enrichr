import request from 'request-promise';
import { get } from 'lodash';

const module = {
  /**
   * Return the url of the profile picture of the specified twitter account
   * Note that if a user update its profile picture, the resulting url will be
   * different.
   *
   * @param {String} handle Twitter handle
   * @returns {Promise.<String>} Url of the profile picture
   **/
  picture(handle) {
    const url = `https://twitter.com/${handle}/profile_image?size=original`;
    return request({
      uri: url,
      resolveWithFullResponse: true,
    }).then(data => get(data, 'request.href'));
  },
};
export default module;
