import { Endpoint } from "../../types";

const path = "/payments/currency/lock";
export const lockCurrencyForPayment: Endpoint[] = [
  {
    description: "Fail with status not in progress lock currency payment",
    path,
    expected: 400,
    method: "patch",
    useToken: true,
    token: "",
  },
  {
    description: "Fail with currency already locked for lock currency payment",
    path,
    expected: 400,
    method: "patch",
    useToken: true,
    token: "",
  },
  {
    description:
      "Fail with currency not part of accepted already locked for lock currency payment",
    path,
    expected: 400,
    method: "patch",
    useToken: true,
    token: "",
  },
  {
    description: "Pass  for lock currency payment",
    path,
    expected: 200,
    method: "patch",
    useToken: true,
    token: "",
    extendedTest: ({ data }) => {
      return !!data.address && !!data.payout && !!data.isCurrencyLocked;
    },
  },
];
