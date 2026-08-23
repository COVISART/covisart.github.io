/* Order intake for the demo-request form.

   The form posts to the NGS market API — the same endpoint and payload shape
   the previous configurator site used, so leads keep landing in one place. */

export const ORDERS_ENDPOINT = 'https://ngsmarket.azurewebsites.net/api/Orders/';

/** Body accepted by `POST /api/Orders/`. */
export interface OrderPayload {
  email: string;
  name: string;
  country: string;
  description: string;
  size: string;
  phone: string;
  accessory: string;
  color: string;
  /** Reserved by the API for configurator line items; unused by this form. */
  reservedObjects: string[];
}

export class OrderError extends Error {
  readonly status?: number;

  constructor(message: string, status?: number) {
    super(message);
    this.name = 'OrderError';
    this.status = status;
  }
}

/* The endpoint is a hosted Azure app: a request can hang on a cold start, so
   it is bounded rather than left to the browser's own (minutes-long) limit. */
const TIMEOUT_MS = 20_000;

/** Posts one order. Resolves on a 2xx response, throws otherwise. */
export async function submitOrder(payload: OrderPayload): Promise<void> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), TIMEOUT_MS);

  try {
    const response = await fetch(ORDERS_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });
    if (!response.ok) {
      throw new OrderError(`Orders API responded with ${response.status}`, response.status);
    }
  } catch (err) {
    if (err instanceof OrderError) throw err;
    if (err instanceof DOMException && err.name === 'AbortError') {
      throw new OrderError('Orders API timed out');
    }
    throw new OrderError('Orders API could not be reached');
  } finally {
    clearTimeout(timeout);
  }
}
