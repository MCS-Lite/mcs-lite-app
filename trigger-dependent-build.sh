#!/bin/bash

# only execute this script when it is on master branch
#if [ "${TRAVIS_BRANCH}" != "master" ] || [ "${TRAVIS_PULL_REQUEST}" != "false" ]; then
#  exit 0
#fi

# Skip test for PR
if [ "${TRAVIS_PULL_REQUEST}" != "false" ]; then
  exit 0
fi

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
  https://api.travis-ci.org/repo/MCS-Lite%2Fmcs-lite-jmeter-test/env_var/fca9435a-d9ea-40f5-8eda-a688cc761fb5

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

