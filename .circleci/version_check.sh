set -e

# latest commit
LATEST_COMMIT=$(git rev-parse HEAD)

# latest commit where path/to/folder1 was changed
LATEST_PACKAGE=$(git log -1 --format=format:%H --full-diff package.json)

PACKAGE_VERSION=$(cat package.json \
  | grep version \
  | head -1 \
  | awk -F: '{ print $2 }' \
  | sed 's/[",]//g' \
  | tr -d '[[:space:]]')

CURRENT_VERSION=$(npm view taskbook-ext version)

if [ $LATEST_PACKAGE = $LATEST_COMMIT ]; then
    if [ $PACKAGE_VERSION != $CURRENT_VERSION ]; then
        echo "//registry.npmjs.org/:_authToken=$npm_TOKEN" >> ~/repo/.npmrc
        echo "Version has changed, releasing"
        npm publish
    fi
else
     echo "No version increment"
     exit 0;
fi
