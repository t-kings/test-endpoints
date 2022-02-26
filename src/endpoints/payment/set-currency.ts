import { Endpoint } from "../../types";

const path = "/payments/currency/set";
export const setCurrencyForPayment: Endpoint[] = [
  {
    description: "Fail with bad currency set currency payment",
    path: `${path}/USD/DOGE`,
    expected: 400,
    method: "patch",
    useToken: true,
    token: "",
  },
  {
    description: "Fail with bad network set currency payment",
    path: `${path}/USDT/DOGE`,
    expected: 400,
    method: "patch",
    useToken: true,
    token: "",
  },
  {
    description: "Fail with status not in progress lock currency payment",
    path,
    expected: 400,
    method: "patch",
    useToken: true,
    token: "",
  },
  {
    description: "Fail with currency already locked for set currency payment",
    path: `${path}/USDT/BEP20`,
    expected: 400,
    method: "patch",
    useToken: true,
    token: "",
  },
  {
    description:
      "Fail with currency not part of accepted already locked for set currency payment",
    path: `${path}/USDT/BEP20`,
    expected: 400,
    method: "patch",
    useToken: true,
    token: "",
  },
  {
    description: "Pass with good currency and network for set currency payment",
    path: `${path}/USDT/BEP20`,
    expected: 200,
    method: "patch",
    useToken: true,
    token: "",
    extendedTest: ({ data }) => {
      return (
        data.currency === "USDT" &&
        data.currencyNetwork === "BEP20" &&
        !!data.fee &&
        data.amount >= data.settlement + data.fee &&
        !!data.dollarFee &&
        data.dollarAmount >= data.dollarSettlement + data.dollarFee &&
        !!data.localCurrencyFee &&
        data.localCurrencyAmount >=
          data.localCurrencySettlement + data.localCurrencyFee
      );
    },
  },
];
