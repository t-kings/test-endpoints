import { checkAllEnvironmentVariablesAreValid } from "./config";
import endpoints from "./endpoints";
import { testEndpoints } from "./test-endpoints";

const init = async () => {
  try {
    checkAllEnvironmentVariablesAreValid();
    await testEndpoints(endpoints);
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit();
  }
};

init();
