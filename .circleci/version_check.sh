set -e

PACKAGE_VERSION=$(cat package.json \
  | grep version \
  | head -1 \
  | awk -F: '{ print $2 }' \
  | sed 's/[",]//g' \
  | tr -d '[[:space:]]')

CURRENT_VERSION=$(npm view taskbook-ext version)

if [ $PACKAGE_VERSION != $CURRENT_VERSION ]; then
    echo "//registry.npmjs.org/:_authToken=$npm_TOKEN" >> ~/repo/.npmrc
    echo "Version has changed, releasing"
    npm publish
else
     echo "No version increment"
     exit 0;
fi
