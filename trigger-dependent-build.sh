#!/bin/bash

# pass the commit ID to downstream job
curl -X PATCH \
  -H "Content-Type: application/json" \
  -H "Travis-API-Version: 3" \
  -H "Authorization: token ${GIT_TOKEN}" \
  -d "{ \"env_var.value\": \"${TRAVIS_COMMIT}\", \"env_var.public\": true }" \
  https://api.travis-ci.org/repo/MCS-Lite%2Fmcs-lite-jmeter-test/env_var/efce64d3-827b-4631-a3c4-f931815dcc32

# pass the build number to downstream job
curl -X PATCH \
  -H "Content-Type: application/json" \
  -H "Travis-API-Version: 3" \
  -H "Authorization: token ${GIT_TOKEN}" \
  -d "{ \"env_var.value\": \"${TRAVIS_BUILD_NUMBER}\", \"env_var.public\": true }" \
  https://api.travis-ci.org/repo/MCS-Lite%2Fmcs-lite-jmeter-test/env_var/3f5d2fc1-dcbf-4fd6-9c9a-6078db906739

# trigger downstream test job
body='{
"request": {
"branch":"master"
}}'

curl -s -X POST \
   -H "Content-Type: application/json" \
   -H "Accept: application/json" \
   -H "Travis-API-Version: 3" \
   -H "Authorization: token ${GIT_TOKEN}" \
   -d "$body" \
   https://api.travis-ci.org/repo/MCS-Lite%2Fmcs-lite-jmeter-test/requests

