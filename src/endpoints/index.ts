import { Endpoint } from "../types";
import paymentEndpoints from "./payment";
import paymentLinkEndpoints from "./payment-links";

const endpoints: Endpoint[] = [...paymentLinkEndpoints, ...paymentEndpoints];

export default endpoints;
