import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Link from 'next/link';
import { useStripe } from '@stripe/react-stripe-js';
import { MWT_Col, MWT_Container, MWT_Row } from '@/components/UI/Grid';
import { useRouter } from 'next/router';
import { urlStepsBack } from '@/helpers/urlStepsBack';

const ThanksPageElement = () => {
	const stripe = useStripe();
	const router = useRouter();
	const { currentUser } = useSelector((state) => state.user);
	const [message, setMessage] = useState('');

	useEffect(() => {
		let isSubscribed = true;
		if (!stripe) return true;
		const clientSecret = new URLSearchParams(window.location.search).get(
			'payment_intent_client_secret'
		);
		if (!clientSecret) return true;

		stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
			switch (paymentIntent.status) {
				case 'succeeded':
					setMessage('Payment succeeded!');
					break;
				case 'processing':
					setMessage('Your payment is processing.');
					break;
				case 'requires_payment_method':
					setMessage('Your payment was not successful, please try again.');
					break;
				default:
					setMessage('Something went wrong.');
					break;
			}
		});

		return () => (isSubscribed = false);
	}, [stripe]);

	return (
		<section className="pt-60 pb-60">
			<MWT_Container>
				<MWT_Row>
					<MWT_Col>
						<div className="ls p-32 bordered">
							<h1 className="fs-24">Thank you for you payment!</h1>
							<p>{message}</p>
							{Object.keys(currentUser).length > 0 && (
								<p>
									<Link href={urlStepsBack(router.asPath, 2) + '/accept-offer'}>
										<a>Accept offer</a>
									</Link>
								</p>
							)}
						</div>
					</MWT_Col>
				</MWT_Row>
			</MWT_Container>
		</section>
	);
};

export default ThanksPageElement;
