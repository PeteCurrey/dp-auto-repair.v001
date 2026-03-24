import { Metadata } from 'next';
import CustomerLoginClient from './CustomerLoginClient';

export const metadata: Metadata = {
  title: "Customer Portal | Login | DP Automotive",
  description: "View your bookings, service history, and manage your vehicles",
};

export default function CustomerLoginPage() {
  return <CustomerLoginClient />;
}
