import { Metadata } from 'next';
import BookingClient from './BookingClient';

export const metadata: Metadata = {
  title: "Book a Service | DP Automotive",
  description: "Schedule your vehicle service, MOT, or repair online",
};

export default function BookingPage() {
  return <BookingClient />;
}
