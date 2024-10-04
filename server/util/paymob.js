import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

export const GetAuthenticationToken = async () => {
  try {
    const response = await axios.post(`${process.env.PAYMOB_URL}/auth/tokens`, {
      api_key: process.env.PAYMOB_API_KEY,
    });

    return response.data.token;
  } catch (err) {
    console.log("Paymob-Failed To Get Auth Token:", err);
  }
};

export const GetOrderId = async (authenticationToken, amount, currency) => {
  try {
    const response = await axios.post(
      `${process.env.PAYMOB_URL}/ecommerce/orders`,
      {
        auth_token: authenticationToken,
        amount_cents: amount,
        currency: currency,
        delivery_needed: true,
        items: [],
      }
    );

    return response.data.id;
  } catch (err) {
    console.log("Paymob-Failed To Get Order ID:", err);
  }
};

export const GetPaymentKey = async (
  authenticationToken,
  orderId,
  amount,
  currency,
  shippingDetails
) => {
  try {
    const response = await axios.post(
      `${process.env.PAYMOB_URL}/acceptance/payment_keys`,
      {
        expiration: 3600,
        auth_token: authenticationToken,
        order_id: orderId,
        integration_id: process.env.PAYMOB_CARD_INTEGRATION_ID,
        amount_cents: amount,
        currency: currency,
        billing_data: {
          first_name: shippingDetails.first_name,
          last_name: shippingDetails.last_name,
          email: shippingDetails.email,
          phone_number: shippingDetails.phone,
          apartment: "NA",
          floor: shippingDetails.floor_number,
          street: shippingDetails.street,
          building: "NA",
          shipping_method: "NA",
          postal_code: "NA",
          city: shippingDetails.city,
          country: "EGYPT",
          state: "NA",
        },
      }
    );

    return response.data.token;
  } catch (err) {
    console.log("Paymob-Failed To Get Payment Key:", err);
  }
};

export const CheckPaymentSuccess = async (orderId) => {
  try {
    const response = await axios.get(
      `${process.env.PAYMOB_URL}/acceptance/post_pay?id=${orderId}`
    );

    return response.data.success;
  } catch (err) {
    console.log("Paymob-Failed To Check For Payment Success:", err);
  }
};
