import {BuildService} from '../../../src/services/build-service';

describe('the buildService', () => {
    it('gives', (done) => { 
      let response = {
        "buildType": [{
            "name": "Build1",
            "builds": {
                "build": [
                {
                    "status": "SUCCESS",
                    "statusText": "Tests passed: 198, ignored: 9"
                }
                ]
            }
        },
        {
            "name": "Build2",
            "builds": {
                "build": [
                {
                    "status": "FAILURE",
                    "statusText": "Tests passed: 198, ignored: 9"
                }
                ]
            }
        },
        {
            "name": "Build3",
            "builds": {
                "build": [
                {
                    "status": "FAILURE",
                    "statusText": "Tests passed: 198, ignored: 9"
                }
                ]
            }
        }
        ]
    }

      let clientStub = {fetch: () => Promise.resolve({json: () => response})}
      new BuildService(clientStub)
      .getAllBuilds()
      .then(result => expect(result).toBe(response))
      .finally(done);
    })
});


