import React from 'react';

import StripeCheckout from 'react-stripe-checkout';

const StripeCheckoutButton = ({ price }) => {
	const priceForStripe = price * 100;
	const publishableKey = `pk_test_51Gqwi7BEFuUrS95mO4hgSXrqzJF3LTLPLaHG5zZmUG7SFbc9q5CrUaesoQSevEzZwHCxK4k0hI7VGCITqrvMZWeR001aWIe2M8`;

	const onToken = (token) => {
		console.log(token);
		alert('Payment Succeed');
	};

	return (
		<StripeCheckout
			label="Pay Now"
			name="CRWN Clothing Ltd."
			billingAddress
			shippingAddress
			image="https://svgshare.com/i/CUz.svg"
			description={`Your total is $${price}`}
			amount={priceForStripe}
			panellLabel="Pay Now"
			token={onToken}
			stripeKey={publishableKey}
		/>
	);
};

export default StripeCheckoutButton;
