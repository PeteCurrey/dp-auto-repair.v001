import { Metadata } from 'next';
import AuthClient from './AuthClient';

export const metadata: Metadata = {
  title: "Login | DP Automotive",
  description: "Access your automotive service dashboard",
};

export default function AuthPage() {
  return <AuthClient />;
}
