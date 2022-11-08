import React, { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import DashboardLayout from '@/layouts/dashboard.layout';
import { StripeContext } from '@/context/stripe';
import { createPaymentIntent } from '@/http/paymentAPI';
import { MWT_Col, MWT_Container, MWT_Row } from '@/components/UI/Grid';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from '@/components/Pages/Checkout/CheckoutForm';
import CustomNotice from '@/components/UI/CustomNotice';

const Checkout = () => {
	const router = useRouter();
	const stripe = useContext(StripeContext);
	const [milestoneAmount, setMilestoneAmount] = useState(0);
	const [clientSecret, setClientSecret] = useState('');

	const appearance = {
		theme: 'stripe',
		variables: {
			borderRadius: '0px',
		},
	};
	const stripeOptions = {
		clientSecret,
		appearance,
	};

	useEffect(() => {
		const fetchData = async () => {
			const isHaveVariables =
				'missionId' in router.query &&
				'proposalId' in router.query &&
				'milestoneId' in router.query;
			if (isHaveVariables) {
				try {
					const res = await createPaymentIntent({
						missionId: router.query.missionId,
						proposalId: router.query.proposalId,
						milestoneId: router.query.milestoneId,
					});
					setClientSecret(res.clientSecret);
					setMilestoneAmount(res.amount);
				} catch (e) {
					CustomNotice({
						content: e.response?.data?.message,
						type: 'error',
					});
				}
			}
		};
		fetchData();
	}, [router]);

	return (
		<section className="s-py-50">
			<MWT_Container>
				<MWT_Row className="c-mb-30">
					<MWT_Col lg={8} className="offset-lg-2">
						<div className="ls p-32 bordered">
							<h6>Let&apos;s roll!</h6>
							<p className="color-darkColor">
								Milestone amount:{' '}
								<span className="color-main2">${milestoneAmount}</span>
							</p>
						</div>
					</MWT_Col>
					{clientSecret && (
						<MWT_Col lg={8} className="offset-lg-2">
							<div className="ls p-32 bordered">
								<Elements options={stripeOptions} stripe={stripe}>
									<CheckoutForm />
								</Elements>
							</div>
						</MWT_Col>
					)}
				</MWT_Row>
			</MWT_Container>
		</section>
	);
};

Checkout.Layout = DashboardLayout;

export default Checkout;
