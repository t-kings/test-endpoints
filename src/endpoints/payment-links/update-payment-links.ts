import { Endpoint } from "../../types";

const path = "/payment-links/6217e4dae318a4d8c4324aed";
export const updatePaymentLinks: Endpoint[] = [
  {
    description: "Fail general validation for updating payment link",
    path,
    expected: 400,
    method: "patch",
    useToken: true,
    body: {
      amount: -1,
      customUrl: "//",
      redirectUrl: "u",
      baseCurrency: 2123,
      currencies: "currencies",
      subscriptionInterval: "tu",
      subscriptionTimes: -1,
      paymentLinkName: 384,
      description: 2093840923,
    },

    // paymentLinkName: 'string',
    // description: 'string',
    // amount: 'numeric|min:0',
    // customUrl: 'alpha_dash',
    // redirectUrl: 'url',
    // extraFields: 'array',
    // baseCurrency: 'string',
    // currencies: 'array',
    // subscriptionInterval: [`in:${Object.values(Intervals)}`],
    // subscriptionTimes: 'numeric|min:1',
    // donationWebsite: 'url',
    // donationImageUrl: 'url',
    // donationPhoneNumber: [`regex:${MyExpressions.phoneNumber}`],
    // isActivated: 'boolean'
  },
  {
    description: "Fail payment link not found for updating payment link",
    path: "/payment-links/some-id",
    expected: 404,
    method: "patch",
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
      "Fail send bad currency in currencies for updating payment link",
    path,
    expected: 400,
    method: "patch",
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
    description: "Fail send bad currency for updating payment link",
    path,
    expected: 400,
    method: "patch",
    useToken: true,
    body: {
      amount: 10,
      baseCurrency: "currency",
      paymentLinkName: "paymentLinkName",
      description: "description",
      currencies: ["USDT"],
      subscriptionInterval: "hourly",
      subscriptionTimes: 1,
    },
  },
  {
    description: "Pass set amount for donation  for updating payment link",
    path: "/payment-links/6217e4dae318a4d8c4324aca",
    expected: 200,
    method: "patch",
    useToken: true,
    body: {
      amount: 10,
      baseCurrency: "USDT",
    },
    extendedTest: ({ data }) => {
      return data.amount === 0 && data.baseCurrency === "USD";
    },
  },
  {
    description:
      "Fail amount is set 0 for subscription for updating payment link",
    path,
    expected: 400,
    method: "patch",
    useToken: true,
    body: {
      amount: 0,
    },
  },
  {
    description:
      "Pass amount is set 0  for single charge for updating payment link",
    path: "/payment-links/6217eb9f3757ca59fc94eb8e",
    expected: 200,
    method: "patch",
    useToken: true,
    body: {
      amount: 0,
    },
    extendedTest: ({ data }) => {
      return data.amount === 0 && data.baseCurrency === "USD";
    },
  },
];
