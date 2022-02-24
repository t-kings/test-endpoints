import { Endpoint } from "../../types";

const path = "/payment-links/donation";
export const donationPaymentLinks: Endpoint[] = [
  {
    description: "Fail general validation for donation payment link",
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
      donationWebsite: "yu",
      donationPhoneNumber: "081",
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
    // donationWebsite: 'url',
    // donationPhoneNumber: [`regex:${MyExpressions.phoneNumber}`]
  },
  {
    description:
      "Fail send bad currency in currencies for donation payment link",
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
    description: "Pass with currencies for donation payment link",
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
    description: "Pass without currencies for donation payment link",
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
