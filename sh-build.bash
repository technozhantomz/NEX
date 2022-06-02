
#cypress/browsers:node16.14.0-chrome99-ff97
CYPRESS_BROWSER_TAG=node16.14.0-chrome99-ff97
CYPRESS_IMAGE=cypress/browsers:${CYPRESS_BROWSER_TAG}

PACKAGES_SHA1=$(cat package-lock.json package.json | sha1sum | awk '{print $1}')

FINAL_TAG=cypress-${CYPRESS_BROWSER_TAG}-packages-${PACKAGES_SHA1}

echo $PACKAGES_SHA1

docker build -f Dockerfile.base --build-arg \
  BASE_IMAGE=$CYPRESS_IMAGE -t lolbase:${FINAL_TAG} . && \
  docker run --rm -it lolbase:${FINAL_TAG} /bin/bash

