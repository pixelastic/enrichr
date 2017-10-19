import module from './twitter.js';
jest.mock('request-promise');
const request = require('request-promise');

describe('twitter', () => {
  afterEach(() => {
    jest.resetAllMocks();
    jest.restoreAllMocks();
  });
  describe('picture', () => {
    beforeEach(() => {
      request.mockReturnValue(Promise.resolve());
    });
    afterEach(() => {
      request.mockReset();
    });
    it('should request the original size of the image', () => {
      // Given
      const input = 'dotcss';

      // When
      const actual = module.picture(input);

      // Then
      const expected = expect.objectContaining({
        uri: expect.stringContaining('size=original'),
      });
      return actual.then(() => {
        expect(request).toHaveBeenCalledWith(expected);
      });
    });
    it('should do a request with the whole response included', () => {
      // Given
      const input = 'dotcss';

      // When
      const actual = module.picture(input);

      // Then
      const expected = expect.objectContaining({
        resolveWithFullResponse: true,
      });
      return actual.then(() => {
        expect(request).toHaveBeenCalledWith(expected);
      });
    });
    it('should resolve to the href of the request', () => {
      // Given
      request.mockReturnValue(Promise.resolve({ request: { href: 'url' } }));

      // When
      const actual = module.picture();

      // Then
      return expect(actual).resolves.toEqual('url');
    });
  });
});
