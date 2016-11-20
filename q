[33mcommit bcd648686d1d906ef2c17fe303ebf75ef3f7b1d0[m
Author: robs <rob.swartenbroekx@cegeka.com>
Date:   Sun Nov 20 12:46:34 2016 +0100

    http must be added in the code to the baseurl of the buildserver

[33mcommit 5b34b1c61378f5d4737fc9a49e28cabb00b7a75a[m
Author: robs <rob.swartenbroekx@cegeka.com>
Date:   Sun Nov 20 12:31:44 2016 +0100

    get the baseurl from the buildserver from the route

[33mcommit e1e22c781c8665fd368a41813230a1317619b3d5[m
Author: robs <rob.swartenbroekx@cegeka.com>
Date:   Sun Nov 20 11:35:43 2016 +0100

    mapped responses from teamcity server to objects thate make sense in our domain

[33mcommit 2488dbf0faf2a50a139a4fb995f2c3732abb2159[m
Author: robs <rob.swartenbroekx@cegeka.com>
Date:   Sun Nov 20 11:16:31 2016 +0100

    improved behavior stub in build-service-spec

[33mcommit 5bb90b1e84a6f348718a3fe7a3c25e187a064a02[m
Author: robs <rob.swartenbroekx@cegeka.com>
Date:   Sun Nov 20 10:49:04 2016 +0100

    made a seperate folder for the teamcitystub

[33mcommit 4c615dfbcbd569c7739b3c813ecd8e259bdb2ff8[m
Author: robs <rob.swartenbroekx@cegeka.com>
Date:   Sun Nov 20 10:37:09 2016 +0100

    replaced the build-service routing by the http-client routing for stubs

[33mcommit 8a533190c31133ed7b4a4f1d3bb18ab3bc1696cc[m
Author: robs <rob.swartenbroekx@cegeka.com>
Date:   Sun Nov 20 10:22:59 2016 +0100

    Added http-client-router

[33mcommit 4d26a9e793af119a06e9838a61106a7b2ce30b46[m
Author: robs <rob.swartenbroekx@cegeka.com>
Date:   Sun Nov 20 07:51:22 2016 +0100

    Added http client stub for teamcity

[33mcommit 315620b035c169e48f369a44e4284d4e7f2efdfc[m
Author: robs <rob.swartenbroekx@cegeka.com>
Date:   Sat Nov 19 22:24:51 2016 +0100

    made buildservice that switch between real and mocked builservice depending on baseUrl

[33mcommit 3bb4fc92d526c7f0056816821b5eff317868454b[m
Author: robs <rob.swartenbroekx@cegeka.com>
Date:   Sat Nov 19 21:04:59 2016 +0100

    Added mock-build-service

[33mcommit d141534dbd2f2ea611eaef4f00ed206a46295de7[m
Author: robs <rob.swartenbroekx@cegeka.com>
Date:   Sat Nov 19 20:38:03 2016 +0100

    small refactorings

[33mcommit 00f82f810cdd3c7b2f8b323691f13ea035990da2[m
Author: robs <rob.swartenbroekx@cegeka.com>
Date:   Sat Nov 19 20:27:14 2016 +0100

    small refactoring

[33mcommit 95184bf50313921e36980efa3b9b1adbdad8a7dc[m
Author: robs <rob.swartenbroekx@cegeka.com>
Date:   Sat Nov 19 20:22:11 2016 +0100

    Add test to see if app is correctly initialized

[33mcommit 0448f11038a6df4b0ed938e2491da826476e3fb2[m
Author: robs <rob.swartenbroekx@cegeka.com>
Date:   Sat Nov 19 18:03:33 2016 +0100

    fix layout issue

[33mcommit 15fa77816273a98063b1ea34caba420296a45eb3[m
Author: robs <rob.swartenbroekx@cegeka.com>
Date:   Sat Nov 19 18:02:42 2016 +0100

    Added test for getAllFailedBuilds

[33mcommit d3b636186d25f49c9ac03f487f7d73a76f20492e[m
Author: robs <rob.swartenbroekx@cegeka.com>
Date:   Sat Nov 19 17:49:36 2016 +0100

    Added a test for getAllFailedBuilds in buildService and noticed that the other one was a false positive because I did not catch the error from the promise

[33mcommit 921c185a05bb29c6977763f14ad82ecc3334bf60[m
Author: robs <rob.swartenbroekx@cegeka.com>
Date:   Sat Nov 19 17:18:30 2016 +0100

    improved some tesdata in the buildservice test

[33mcommit 4195ce1dd82929fe9db98d792712a930d04b0d20[m
Author: robs <rob.swartenbroekx@cegeka.com>
Date:   Sat Nov 19 17:13:39 2016 +0100

    in the buildservice selected only the failed builds from the response

[33mcommit f57ec35206a5a16ff48e20d88c7f66bf69ce280f[m
Author: robs <rob.swartenbroekx@cegeka.com>
Date:   Sat Nov 19 17:01:12 2016 +0100

    Write a test for the buildService

[33mcommit d647542a3e12e09a10020a5cfb25399f504da187[m
Author: robs <rob.swartenbroekx@cegeka.com>
Date:   Sat Nov 19 15:18:19 2016 +0100

    Make use of the dependency injection framework, because I think it is necessary to unit test my components individually

[33mcommit 70dba586f107416487c93ae591f4ec7658271e37[m
Author: robs <rob.swartenbroekx@cegeka.com>
Date:   Sat Nov 19 11:25:07 2016 +0100

    added bootstrap

[33mcommit 182f8000bf957a1fa2af80278f5fa19a58b8d5ae[m
Author: robs <rob.swartenbroekx@cegeka.com>
Date:   Sat Nov 19 10:47:04 2016 +0100

    Improved way to do rest-calls

[33mcommit 324ca3897336d36834f3a6ffbcc5687a62fe3e32[m
Author: robs <rob.swartenbroekx@cegeka.com>
Date:   Sat Nov 19 09:36:43 2016 +0100

    End to end call to rest-api

[33mcommit d2fa5370d03b834bf568a56a2bf6e746bd57c417[m
Author: robs <rob.swartenbroekx@cegeka.com>
Date:   Thu Nov 17 20:48:24 2016 +0100

    setup aurelia project with aurelia cli

[33mcommit 3870e90adc9e18249d4cb2c7d139842935260359[m
Author: robisrob <rob.swartenbroekx@gmail.com>
Date:   Thu Nov 17 20:19:24 2016 +0100

    Initial commit
