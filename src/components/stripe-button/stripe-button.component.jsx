import React from "react";
import StripeCheckout from "react-stripe-checkout";

const StripeCheckoutButton = ({ price }) => {
  const priceForStripe = price * 100; //1 dollar = 100 cents
  const publishablekey =
    "pk_test_51IfKFVFOesHuVqeUAV2m20STeYGjcBh6HRXHJcJEL1LHDTwr01SbL5HJgrV2QvgcQivdJCilLV2Rx5QMRfrXbMwN00kMemYsCQ";

  const onToken = (token) => {
    console.log(token);
    alert("Payment Successful");
  };

  return (
    <StripeCheckout
      label="Pay Now"
      name="CRWN Clothing Ltd."
      billingAddress
      shippingAddress
      // image="https://svgshare.com/i/W6z.svg" //副檔名記得寫
      description={`Your total is $${price}`}
      amount={priceForStripe}
      panelLabel="Pay Now"
      token={onToken}
      stripeKey={publishablekey}
      locale="en"
    />
  );
};

export default StripeCheckoutButton;
