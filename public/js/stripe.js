import axios from "axios";
import { showAlert } from "./alerts";

const stripe = Stripe(
  "pk_test_51JrPz0EODXM4eEdm9zPzgeNgK9hE3gxQDvRf3OYbFcOkQlRGND4MYWGv1qFEMHGVs7I6VhUlCcG74v4z9T6W4ZDC00A7OUjPm3"
);

export const bookTour = async (tourId) => {
  try {
    // 1) Get checkout session from the server endpoint
    const session = await axios(`/api/v1/bookings/checkout-session/${tourId}`);
    // console.log(session);

    // 2) Create checkout form + charge credit card
    await stripe.redirectToCheckout({
      sessionId: session.data.session.id,
    });
  } catch (error) {
    // console.log(error);
    showAlert("error", error);
  }
};
