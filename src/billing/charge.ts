import { APIGatewayProxyHandler } from 'aws-lambda';
import { ResponseLib } from '../libs/ResponseLib';
import * as stripePackage from 'stripe';
import { BillingLib } from '../libs/BillingLib';

export interface ChargeRequest {
  source: string;
  storage: number;
}

export const main: APIGatewayProxyHandler = async (event, _context) => {
  console.log('Deploying for Joaco')
  const parsedBody: ChargeRequest = JSON.parse(event.body);
  const source = parsedBody.source;
  const amount = BillingLib.calculateCost(parsedBody.storage);
  const description = "Scratch charge";

  const stripe = stripePackage(process.env.STRIPE_SECRET_KEY);

  try {
    await stripe.charges.create({
      source,
      amount,
      description,
      currency: "usd"
    });
    return ResponseLib.success({ status: true });
  } catch (e) {
    return ResponseLib.failure({ status: false, message: e.message});
  }
};
