import opengraph from 'open-graph';
import Promise from 'bluebird';

const module = {
  // Given an url, will resolve an object of opengraph values
  opengraph(url) {
    return Promise.promisify(opengraph)(url);
  },
};
export default module;
