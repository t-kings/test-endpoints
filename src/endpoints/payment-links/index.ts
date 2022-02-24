import { Endpoint } from "../../types";
import { donationPaymentLinks } from "./donation-payment-link";
import { singleChargePaymentLinks } from "./single-charge-payment-link";
import { subscriptionPaymentLinks } from "./subscription-payment-link";
import { updatePaymentLinks } from "./update-payment-links";

const paymentLinkEndpoints: Endpoint[] = [
  ...singleChargePaymentLinks,
  ...donationPaymentLinks,
  ...subscriptionPaymentLinks,
  ...updatePaymentLinks,
];

export default paymentLinkEndpoints;
