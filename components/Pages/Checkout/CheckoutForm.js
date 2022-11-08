import React, { useMemo, useState } from 'react';
import { PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useSelector } from 'react-redux';
import { Button, Form, Loader } from 'rsuite';
import { useRouter } from 'next/router';
import { urlStepsBack } from '@/helpers/urlStepsBack';

const CheckoutForm = () => {
	const stripe = useStripe();
	const router = useRouter();
	const elements = useElements();
	const [message, setMessage] = useState(null);
	const [isLoading, setIsLoading] = useState(false);
	const { currentUser } = useSelector((state) => state.user);
	const link = useMemo(
		() => process.env.NEXT_PUBLIC_CLIENT_URL + urlStepsBack(router.asPath, 1) + '/thanks-page',
		[router]
	);

	const handleSubmit = async () => {
		if (!stripe || !elements) return true;

		setIsLoading(true);

		//booking
		const { error } = await stripe.confirmPayment({
			elements,
			confirmParams: {
				return_url: link,
				receipt_email: currentUser.email,
				payment_method_data: {
					billing_details: {
						email: currentUser.email,
						name: currentUser.name,
					},
				},
			},
		});

		if (error.type === 'card_error' || error.type === 'validation_error') {
			setMessage(error.message);
		} else {
			setMessage('An unexpected error occured.');
		}

		setIsLoading(false);
	};

	return (
		<Form id="payment-form">
			<h6>Stripe payment method</h6>
			<PaymentElement id="payment-element" />
			<Button
				className="rs-btn-main mt-30"
				disabled={isLoading || !stripe || !elements}
				onClick={handleSubmit}
			>
				<span id="button-text">{isLoading ? <Loader /> : 'Submit Order'}</span>
			</Button>
			{/* Show any error or success messages */}
			{message && (
				<div id="payment-message" className="mt-30 color-dangerColor">
					{message}
				</div>
			)}
		</Form>
	);
};

export default CheckoutForm;
