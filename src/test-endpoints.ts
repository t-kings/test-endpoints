import { Endpoint } from "src/types";
import { EndpointRequest } from "./request";

const endpointRequest = new EndpointRequest();

interface Log {
  description: string;
  status: number;
  expected: number;
  message: string;
  data: any;
  res: boolean;
}
const successes: Log[] = [];
const errors: Log[] = [];

const addToSuccess = ({
  description,
  expected,
  status,
  message,
  data,
  res,
}: Log) => {
  console.info(
    "\x1b[32m",
    `
    ============================================================================================= \n
    Description \t \t \t \t ${description} 
    Message \t \t \t \t \t ${message}
    Expected \t \t \t \t \t ${expected}  
    Received \t \t \t \t \t ${status}
    Extended \t \t \t \t \t ${res}
    `
  );
  console.info("\x1b[32m", { data });
};

const addToError = ({
  description,
  expected,
  status,
  message,
  data,
  res,
}: Log) => {
  console.error(
    "\x1b[31m",
    `
      ============================================================================================= \n
      Description \t \t \t \t ${description} 
      Message \t \t \t \t \t ${message}
      Expected \t \t \t \t \t ${expected}  
      Received \t \t \t \t \t ${status}
      Extended  \t \t \t \t \t ${res}
    `
  );
  console.error("\x1b[31m", { data });
};

const checkEndpoint = async ({
  path,
  method,
  useToken,
  body,
  expected,
  description,
  extendedTest,
  token,
}: Endpoint) => {
  const { status, message, data } = await endpointRequest.request(
    path,
    method,
    useToken,
    body,
    token
  );
  let res = true;
  if (extendedTest) {
    try {
      res = extendedTest({ data, message });
    } catch {
      res = false;
    }
  }
  if (status === expected && res) {
    successes.push({
      description,
      expected,
      status,
      message,
      data,
      res,
    });
  } else {
    errors.push({
      description,
      expected,
      status,
      message,
      data,
      res,
    });
  }
};

export const testEndpoints = async (endpoints: Endpoint[]) => {
  for (let index = 0; index < endpoints.length; index++) {
    const endpoint = endpoints[index];
    await checkEndpoint(endpoint);
    successes.forEach((success) => {
      addToSuccess(success);
    });
    errors.forEach((error) => {
      addToError(error);
    });
  }
};
