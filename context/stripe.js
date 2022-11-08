import React from 'react';
import { loadStripe } from '@stripe/stripe-js';

export const stripe = loadStripe(process.env.NEXT_PUBLIC_PUBLISHABLE_KEY);
export const StripeContext = React.createContext();