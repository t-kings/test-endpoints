import { Endpoint } from "../../types";

const path = "/payment-links/subscription-link";
export const subscriptionPaymentLinks: Endpoint[] = [
  {
    description: "Fail general validation for subscription payment link",
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
      subscriptionInterval: "tu",
      subscriptionTimes: -1,
    },

    // Validations
    // paymentLinkName: 'required',
    // description: 'required',
    // customUrl: 'alpha_dash',
    // redirectUrl: 'url',
    // extraFields: 'array',
    // currencies: 'array'
    // subscriptionInterval: ['required', `in:${Object.values(Intervals)}`],
    // subscriptionTimes: 'numeric|min:1|required',
    // amount: 'numeric|min:0|required',
    // baseCurrency: 'string|required'
  },
  {
    description: "Fail send bad currency for subscription payment link",
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
      subscriptionInterval: "hourly",
      subscriptionTimes: 1,
    },
  },
  {
    description:
      "Fail send bad currency in currencies for subscription payment link",
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
      subscriptionInterval: "hourly",
      subscriptionTimes: 1,
    },
  },
  {
    description: "Fail amount is set to 0 for subscription payment link",
    path,
    expected: 400,
    method: "post",
    useToken: true,
    body: {
      amount: 0,
      paymentLinkName: "paymentLinkName",
      description: "description",
      currencies: ["BTC"],
      subscriptionInterval: "hourly",
      subscriptionTimes: 1,
    },
  },
  {
    description:
      "Fail amount is set with bad currency for subscription payment link",
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
      subscriptionInterval: "hourly",
      subscriptionTimes: 1,
    },
  },
  {
    description: "Pass with currencies for subscription payment link",
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
      subscriptionInterval: "hourly",
      subscriptionTimes: 1,
    },
    extendedTest: ({ data }) => {
      return data.currencies.length === 1 && data.currencies[0] === "BTC";
    },
  },
  {
    description: "Pass without currencies for subscription payment link",
    path,
    expected: 201,
    method: "post",
    useToken: true,
    body: {
      paymentLinkName: "paymentLinkName",
      description: "description",
      subscriptionInterval: "hourly",
      subscriptionTimes: 1,
      amount: 10,
      baseCurrency: "USDT",
    },
    extendedTest: ({ data }) => {
      return data.currencies.length > 0 && !data.currencies.includes("USD");
    },
  },
];
