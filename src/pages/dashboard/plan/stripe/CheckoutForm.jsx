import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useState } from "react";

function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    setLoading(true);

    const res = await fetch("http://localhost:4000/stripe/payment-intend", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount: 5000 }), // $50.00
    });

    const { clientSecret } = await res.json();

    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
      },
    });

    if (result.error) {
      setMessage(result.error.message);
    } else if (result.paymentIntent.status === "succeeded") {
      setMessage("Payment successful!");
      // 🔐 Optional: call backend to verify and store payment
      // await fetch("/api/verify-payment", { method: "POST", ... })
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <button disabled={!stripe || loading} type="submit">
        {loading ? "Processing…" : "Pay $50"}
      </button>
      {message && <p>{message}</p>}
    </form>
  );
}

export default CheckoutForm;
