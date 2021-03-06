const { UpgradedFiatToken, FiatTokenV1 } = require("./tokenTest");

// The following helpers make fresh original/upgraded tokens before each test.

async function newToken() {
  const token = await FiatTokenV1.new();
  return token;
}

async function newUpgradedToken() {
  const token = await UpgradedFiatToken.new();
  return token;
}

// Executes the run_tests_function using an original and
// an upgraded token. The test_suite_name is printed standard output.
function wrapTests(testSuiteName, runTestsFunction) {
  contract(testSuiteName, (accounts) => {
    runTestsFunction(newToken, accounts);
  });

  contract(testSuiteName + " (upgraded)", (accounts) => {
    runTestsFunction(newUpgradedToken, accounts);
  });
}

module.exports = wrapTests;
