import { Endpoint } from "../../types";
import { cancelForPayment } from "./cancel";
import { lockCurrencyForPayment } from "./lock-currency";
import { setCurrencyForPayment } from "./set-currency";

const paymentEndpoints: Endpoint[] = [
  ...setCurrencyForPayment,
  ...cancelForPayment,
  ...lockCurrencyForPayment,
];

export default paymentEndpoints;
