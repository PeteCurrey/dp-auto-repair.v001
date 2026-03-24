import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "next-themes";
import { AuthProvider } from "@/hooks/useAuth";
import AIChatWidget from "@/components/AIChatWidget";
import { Providers } from "./providers";
import SchemaMarkup from "@/components/SchemaMarkup";

const globalSchema = {
  "@context": "https://schema.org",
  "@type": ["AutoRepair", "LocalBusiness"],
  "name": "DP Automotive Repair & Diagnostics",
  "image": "https://dpautorepair.co.uk/og-image.jpg",
  "url": "https://dpautorepair.co.uk",
  "telephone": "01246233483",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Unit 5, Vanguard Trading Estate, Britannia Road",
    "addressLocality": "Chesterfield",
    "addressRegion": "Derbyshire",
    "postalCode": "S40 2TZ",
    "addressCountry": "GB"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 53.2304,
    "longitude": -1.4246
  },
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday"],
      "opens": "08:00",
      "closes": "17:30"
    },
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": "Saturday",
      "opens": "08:00",
      "closes": "13:00"
    }
  ],
  "priceRange": "££",
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Auto Repair Services",
    "itemListElement": [
      {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "Car Servicing"}},
      {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "MOT Preparation"}},
      {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "Engine Diagnostics"}},
      {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "Brake Repairs"}},
      {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "Clutch Replacement"}},
      {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "Cam Belt Replacement"}}
    ]
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.9",
    "reviewCount": "87"
  }
};

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "DP Auto Repair & Diagnostics | Expert Car Servicing Chesterfield",
    template: "%s | DP Auto Repair Chesterfield"
  },
  description: "Specialist car servicing, MOT testing, and advanced engine diagnostics in Chesterfield. Trusted local mechanics for all makes and models. Book your service today.",
  metadataBase: new URL('https://dpautorepair.co.uk'),
  keywords: ["car servicing chesterfield", "MOT testing chesterfield", "car diagnostics derbyshire", "local mechanic chesterfield", "garage services"],
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: "https://dpautorepair.co.uk",
    siteName: "DP Auto Repair & Diagnostics",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>
          <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
            <TooltipProvider>
              <AuthProvider>
                <AIChatWidget />
                <SchemaMarkup schema={globalSchema} />
                {children}
                <Toaster />
                <Sonner />
              </AuthProvider>
            </TooltipProvider>
          </ThemeProvider>
        </Providers>
      </body>
    </html>
  );
}
