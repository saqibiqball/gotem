import React, { useContext } from 'react';
import DashboardLayout from '@/layouts/dashboard.layout';
import { StripeContext } from '@/context/stripe';
import { Elements } from '@stripe/react-stripe-js';
import ThanksPageElement from '@/components/Pages/Checkout/ThanksPageElement';

const ThanksPage = () => {
	const stripe = useContext(StripeContext);
	return (
		<Elements stripe={stripe}>
			<ThanksPageElement />
		</Elements>
	);
};

ThanksPage.Layout = DashboardLayout;

export default ThanksPage;
