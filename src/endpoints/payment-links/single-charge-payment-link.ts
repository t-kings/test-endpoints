import { Endpoint } from "../../types";

const path = "/payment-links/single-charge";
export const singleChargePaymentLinks: Endpoint[] = [
  {
    description: "Fail general validation for single charge payment link",
    path,
    expected: 400,
    method: "post",
    useToken: true,
    body: {
      amount: -1,
      customUrl: "//",
      redirectUrl: "u",
      baseCurrency: 2123,
      currencies: "currencies",
    },

    // Validations
    // paymentLinkName: 'required',
    // description: 'required',
    // amount: 'numeric|min:0',
    // customUrl: 'alpha_dash',
    // redirectUrl: 'url',
    // extraFields: 'array',
    // baseCurrency: 'string',
    // currencies: 'array'
  },
  {
    description: "Fail send bad currency for single charge payment link",
    path,
    expected: 400,
    method: "post",
    useToken: true,
    body: {
      amount: 10,
      baseCurrency: "ty",
      paymentLinkName: "paymentLinkName",
      description: "description",
      currencies: ["USD"],
    },
  },
  {
    description:
      "Fail send bad currency in currencies for single charge payment link",
    path,
    expected: 400,
    method: "post",
    useToken: true,
    body: {
      amount: 10,
      baseCurrency: "USD",
      paymentLinkName: "paymentLinkName",
      description: "description",
      currencies: ["bad-currency"],
    },
  },
  {
    description:
      "Fail amount is set without currency for single charge payment link",
    path,
    expected: 400,
    method: "post",
    useToken: true,
    body: {
      amount: 10,
      paymentLinkName: "paymentLinkName",
      description: "description",
      currencies: ["BTC"],
    },
  },
  {
    description:
      "Fail amount is set with bad currency for single charge payment link",
    path,
    expected: 400,
    method: "post",
    useToken: true,
    body: {
      amount: 10,
      baseCurrency: "tu",
      paymentLinkName: "paymentLinkName",
      description: "description",
      currencies: ["BTC"],
    },
  },
  {
    description:
      "Pass with  amount and currency for single charge payment link",
    path,
    expected: 201,
    method: "post",
    useToken: true,
    body: {
      amount: 10,
      baseCurrency: "USDT",
      paymentLinkName: "paymentLinkName",
      description: "description",
      currencies: ["BTC"],
    },
    extendedTest: ({ data }) => {
      return (
        data.amount === 10 &&
        data.baseCurrency === "USDT" &&
        data.currencies.length === 1 &&
        data.currencies[0] === "BTC"
      );
    },
  },
  {
    description:
      "Pass without amount and currency for single charge payment link",
    path,
    expected: 201,
    method: "post",
    useToken: true,
    body: {
      paymentLinkName: "paymentLinkName",
      description: "description",
      currencies: ["BTC"],
    },
    extendedTest: ({ data }) => {
      return (
        data.amount === 0 &&
        data.baseCurrency === "USD" &&
        data.currencies.length === 1 &&
        data.currencies[0] === "BTC"
      );
    },
  },
  {
    description: "Pass without currencies for single charge payment link",
    path,
    expected: 201,
    method: "post",
    useToken: true,
    body: {
      paymentLinkName: "paymentLinkName",
      description: "description",
    },
    extendedTest: ({ data }) => {
      return data.currencies.length > 0 && !data.currencies.includes("USD");
    },
  },
];
