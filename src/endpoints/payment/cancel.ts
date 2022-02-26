import { Endpoint } from "../../types";

const path = "/payments/cancel";
export const cancelForPayment: Endpoint[] = [
  {
    description: "Fail with bad status  cancel payment",
    path,
    expected: 400,
    method: "patch",
    useToken: true,
    token: "",
  },
  {
    description: "Pass for cancel payment",
    path,
    expected: 200,
    method: "patch",
    useToken: true,
    token: "",
    extendedTest: ({ data }) => {
      return data.status === "cancelled";
    },
  },
];
