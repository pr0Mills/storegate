import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function fetchStripeProducts() {
  const products = await stripe.products.list({ active: true });
  const prices = await stripe.prices.list({ active: true });

  return products.data.map((product) => {
    const productPrices = prices.data.filter((price) => price.product === product.id);
    return {
      ...product,
      prices: productPrices.map((price) => ({
        id: price.id,
        unit_amount: price.unit_amount,
        currency: price.currency,
        recurring: price.recurring,
      })),
    };
  });
}