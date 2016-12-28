export default {
  "buildType": [
    {
      "id": "build_1_id",
      "name": "build 1",
      "builds": {
        "build": [
          {
            "number": "3.1.70.17327",
            "status": "FAILURE",
            "statusText": "Tests passed: 198, ignored: 9"
          }
        ]
      }
    },
    {
      "id": "build_2_id",
      "name": "build 2",
      "builds": {
        "build": [
          {
            "number": "3.1.6965.17318",
            "status": "SUCCESS",
            "statusText": "Tests passed: 2391, ignored: 6"
          }
        ]
      }
    },
    {
      "id": "build_3_id",
      "name": "build 3",
      "builds": {
        "build": [
          {
            "number": "123",
            "status": "SUCCESS",
            "statusText": "Tests passed: 35"
          }
        ]
      }
    },
    {
      "id": "build_4_id",
      "builds": {
        "build": [
          {
            "number": "3.1.54.17253",
            "status": "SUCCESS",
            "statusText": "Tests passed: 35"
          }
        ]
      }
    },
    {
      "id": "build_5_id",
      "name": "same name as other build",
      "builds": {
        "build": [
          {
            "number": "3.1.54.17287",
            "status": "FAILURE",
            "statusText": "Tests failed: 4 (1 new), passed: 31"
          }
        ]
      }
    },
    {
      "id": "build_6_id",
      "name": "same name as other build",
      "builds": {
        "build": [
          {
            "number": "1.2.54.17287",
            "status": "FAILURE",
            "statusText": "Tests failed: 2, passed: 33; snapshot dependency failed: Main :: Data Quality Tests :: build 6"
          }
        ]
      }
    },
    {
      "id": "build_7_id",
      "name": "build 7",
      "builds": {
        "build": [
          {
            "number": "3.5.54.17287",
            "status": "FAILURE",
            "statusText": "Tests failed: 3, passed: 32; snapshot dependency failed: Main :: Data Quality Tests :: build 7"
          }
        ]
      }
    },
    {
      "id": "build_8_id",
      "name": "build 8",
      "builds": {
        "build": [
          {
            "number": "3.5.87.17287",
            "status": "SUCCESS",
            "statusText": "Tests failed: 8 (1 new), passed: 27; snapshot dependency failed: Main :: Data Quality Tests :: build 8"
          }
        ]
      }
    },
    {
      "id": "build_9_id",
      "name": "build 9",
      "builds": {
        "build": [
          {
            "number": "3.5.99.17287",
            "status": "FAILURE",
            "statusText": "Tests failed: 13, passed: 22; snapshot dependency failed: Main :: Data Quality Tests :: build 9"
          }
        ]
      }
    },
    {
      "id": "build_10_id",
      "name": "build 10",
      "builds": {
        "build": [
          {
            "number": "3.5.99.21",
            "status": "FAILURE",
            "statusText": "Tests failed: 10, passed: 25"
          }
        ]
      }
    }
  ]
};