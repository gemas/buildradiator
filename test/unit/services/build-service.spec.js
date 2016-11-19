import buildService from '../../../src/services/build-service';

describe('the buildService', () => {
  it('returns all the buildFiles', () => {
    buildService.getAllBuilds().then(result => expect(result).toBe('Hello World!'));
  });
});