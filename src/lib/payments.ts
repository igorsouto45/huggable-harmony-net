/**
 * Mercado Pago Integration Utility
 */

export interface PixPaymentRequest {
  transaction_amount: number;
  description: string;
  payer: {
    email: string;
    first_name: string;
    last_name: string;
    identification: {
      type: string;
      number: string;
    };
  };
}

export async function createPixPayment(data: PixPaymentRequest, accessToken: string) {
  // This should normally be called from a backend/edge function to hide the accessToken
  const response = await fetch("https://api.mercadopago.com/v1/payments", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${accessToken}`,
      "Content-Type": "application/json",
      "X-Idempotency-Key": crypto.randomUUID(),
    },
    body: JSON.stringify({
      ...data,
      payment_method_id: "pix",
      notification_url: "https://your-domain.com/api/webhooks/mercadopago", // You should configure this
    }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to create payment");
  }

  return response.json();
}
