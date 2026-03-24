import React from "react";
import { TuningClient } from "./TuningClient";
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Performance Tuning Services | ECU Remapping & Exhaust Fabrication | DP Automotive",
  description: "Professional ECU remapping, performance exhaust fabrication, and intercooler services in Chesterfield. Unlock your vehicle's potential with our expert tuning solutions.",
  keywords: "ECU remapping, performance tuning, exhaust fabrication, intercooler installation, performance upgrades, engine tuning, Chesterfield",
};

export default function TuningPage() {
  return <TuningClient />;
}
