export interface ManufacturerPackage {
  name: string;
  price: string;
  interval: string;
  services: string[];
}

export interface ManufacturerSEOData {
  type: 'manufacturer';
  manufacturer: string;
  pageTitle?: string;
  description?: string;
  manufacturerLogo?: string;
  specialServices: string[];
  commonIssues: string[];
  servicePackages: ManufacturerPackage[];
}

export interface ServiceSEOData {
  type: 'service';
  pageTitle: string;
  description: string;
  h1: string;
  intro: string;
  serviceType: string;
  features?: string[];
  faqs?: { question: string; answer: string }[];
}

export interface ComparisonSEOData {
  type: 'comparison';
  pageTitle: string;
  description: string;
  h1: string;
  intro: string;
  service1Name: string;
  service2Name: string;
  comparisonTable?: any[];
  service1Details?: any;
  service2Details?: any;
  faqs: { question: string; answer: string }[];
  showDVLAChecker?: boolean;
}

export interface InformationalSEOData {
  type: 'informational';
  pageTitle: string;
  description: string;
  keywords?: string;
  h1: string;
  intro: string;
  mainContent: {
    title: string;
    content: string;
    points?: string[];
  }[];
  quickFacts?: {
    title: string;
    value: string;
    icon?: any;
  }[];
  ctaTitle?: string;
  ctaDescription?: string;
  faqs: { question: string; answer: string }[];
  showCalculator?: boolean;
  showDVLAChecker?: boolean;
}

export type SEOPageData = ManufacturerSEOData | ServiceSEOData | ComparisonSEOData | InformationalSEOData;

export const seoPages: Record<string, SEOPageData> = {
  "lexus-servicing-chesterfield": {
    "type": "manufacturer",
    "manufacturer": "Lexus",
    "pageTitle": "Expert Lexus Servicing Chesterfield | DP Automotive",
    "description": "Specialist Lexus servicing and repairs in Chesterfield. Our expert technicians provide comprehensive maintenance and diagnostics for all Lexus models.",
    "specialServices": [
      "Lexus Hybrid Synergy Drive Service",
      "V6 & V8 Engine Specialist Service",
      "Lexus Safety System Diagnostics",
      "Enform Infotainment Service",
      "F Sport Performance Service",
      "Multi-Stage Hybrid System Service",
      "Japanese Luxury Expertise",
      "Mark Levinson Audio Service"
    ],
    "commonIssues": [
      "Hybrid battery health monitoring and replacement",
      "Engine carbon build-up in GDI models",
      "Brake system wear patterns from regenerative braking",
      "Air conditioning system efficiency maintenance",
      "Suspension component longevity optimization",
      "Transmission fluid change requirements",
      "Premium fuel system maintenance",
      "Electrical system complexity in luxury models"
    ],
    "servicePackages": [
      {
        "name": "Essential Lexus Service",
        "price": "From \u00a3119",
        "interval": "6 months / 6,000 miles",
        "services": [
          "Premium engine oil and filter change",
          "Hybrid system health check",
          "Brake system inspection",
          "Tyre rotation and inspection",
          "Fluid level checks",
          "Battery and charging test"
        ]
      },
      {
        "name": "Comprehensive Lexus Service",
        "price": "From \u00a3229",
        "interval": "12 months / 12,000 miles",
        "services": [
          "Everything in Essential Service",
          "Air filter replacement",
          "Cabin filter replacement",
          "Hybrid cooling system check",
          "CVT fluid inspection",
          "Lexus diagnostic scan"
        ]
      },
      {
        "name": "Major Lexus Service",
        "price": "From \u00a3369",
        "interval": "24 months / 20,000 miles",
        "services": [
          "Everything in Comprehensive Service",
          "Spark plug replacement",
          "Transmission service",
          "Hybrid system service",
          "Complete luxury vehicle inspection"
        ]
      }
    ]
  },
  "toyota-servicing-chesterfield": {
    "type": "manufacturer",
    "manufacturer": "Toyota",
    "pageTitle": "Expert Toyota Servicing Chesterfield | DP Automotive",
    "description": "Specialist Toyota servicing and repairs in Chesterfield. Our expert technicians provide comprehensive maintenance and diagnostics for all Toyota models.",
    "specialServices": [
      "Hybrid Synergy Drive Service",
      "D-4D Diesel Engine Service",
      "Toyota Safety Sense Service",
      "CVT Transmission Maintenance",
      "Prius Hybrid Specialist Service",
      "RAV4 AWD System Service",
      "Corolla GR Performance Service",
      "Japanese Quality Excellence"
    ],
    "commonIssues": [
      "Hybrid battery health monitoring and maintenance",
      "CVT transmission fluid service requirements",
      "DPF regeneration in D-4D diesel engines",
      "Engine oil consumption in high-mileage vehicles",
      "Brake system maintenance with regenerative braking",
      "Air conditioning system efficiency optimization",
      "Suspension component longevity",
      "Timing chain maintenance in older petrol engines"
    ],
    "servicePackages": [
      {
        "name": "Basic Toyota Service",
        "price": "From \u00a389",
        "interval": "6 months / 6,000 miles",
        "services": [
          "Toyota engine oil and filter",
          "Hybrid system inspection",
          "Visual brake inspection",
          "Tyre pressure and tread check",
          "Fluid level checks",
          "Battery health check"
        ]
      },
      {
        "name": "Full Toyota Service",
        "price": "From \u00a3159",
        "interval": "12 months / 10,000 miles",
        "services": [
          "Everything in Basic Service",
          "Air filter replacement",
          "Cabin filter replacement",
          "CVT transmission check",
          "Coolant system inspection",
          "Toyota diagnostic scan"
        ]
      },
      {
        "name": "Major Toyota Service",
        "price": "From \u00a3249",
        "interval": "24 months / 20,000 miles",
        "services": [
          "Everything in Full Service",
          "Spark plug replacement",
          "Hybrid battery service",
          "Transmission service",
          "Comprehensive diagnostic"
        ]
      }
    ]
  },
  "fault-code-diagnostics-chesterfield": {
    "type": "service",
    "pageTitle": "Fault Code Reading Chesterfield | OBD Diagnostics | DP Automotive",
    "description": "Professional OBD fault code reading and clearing in Chesterfield. Check engine light diagnosis, DTC code analysis & interpretation. Expert technicians. Book your scan today.",
    "h1": "Fault Code Diagnostics Chesterfield",
    "intro": "Need your fault codes read and explained? Our comprehensive OBD diagnostic service reads all stored fault codes, interprets their meaning, and provides clear recommendations for repairs. More than just a code reader \u2013 expert analysis included.",
    "serviceType": "Fault Code Diagnostics",
    "features": [
      "Full OBD system scan",
      "Historical code retrieval",
      "Live data monitoring",
      "Code clearing and reset",
      "Expert interpretation"
    ],
    "faqs": [
      {
        "question": "What is an OBD fault code?",
        "answer": "OBD (On-Board Diagnostics) fault codes are stored by your car's computer when it detects a problem. They're alphanumeric codes like P0300 that point to specific issues. We can read and interpret these codes to diagnose problems."
      },
      {
        "question": "Can I just clear the fault codes myself?",
        "answer": "While you can buy cheap code readers, simply clearing codes doesn't fix the problem \u2013 they'll return. Professional diagnosis identifies the root cause so repairs address the actual issue, not just the symptom."
      },
      {
        "question": "What's the difference between generic and manufacturer codes?",
        "answer": "Generic codes (P0xxx) are standardised across all vehicles. Manufacturer-specific codes require dealer-level equipment to read. We have both capabilities, ensuring no codes are missed during diagnosis."
      },
      {
        "question": "How many fault codes can a car store?",
        "answer": "Modern vehicles can store dozens of fault codes across multiple systems. Some may be historical (issues that cleared themselves) while others are current. We differentiate between these in our report."
      },
      {
        "question": "Will reading fault codes tell you exactly what's wrong?",
        "answer": "Fault codes point to the area of concern but don't always identify the specific failed component. Our technicians use the codes as a starting point, then perform further tests to pinpoint the exact issue."
      }
    ]
  },
  "renault-servicing-chesterfield": {
    "type": "manufacturer",
    "manufacturer": "Renault",
    "pageTitle": "Expert Renault Servicing Chesterfield | DP Automotive",
    "description": "Specialist Renault servicing and repairs in Chesterfield. Our expert technicians provide comprehensive maintenance and diagnostics for all Renault models.",
    "specialServices": [
      "Energy dCi Engine Service",
      "TCe Turbo Engine Service",
      "R-Link Infotainment Service",
      "RS Performance Vehicle Service",
      "Twizy Electric Vehicle Service",
      "CVT Transmission Maintenance",
      "French Innovation Excellence",
      "Clio/Megane Specialist Service"
    ],
    "commonIssues": [
      "DPF regeneration problems in dCi engines",
      "Timing belt replacement schedules",
      "EGR valve carbon build-up issues",
      "CVT transmission fluid requirements",
      "Stop/start system battery maintenance",
      "Air conditioning refrigerant leaks",
      "Electrical system sensor faults",
      "Suspension component wear patterns"
    ],
    "servicePackages": [
      {
        "name": "Basic Renault Service",
        "price": "From \u00a385",
        "interval": "6 months / 6,000 miles",
        "services": [
          "Engine oil and filter change",
          "Visual brake inspection",
          "Tyre pressure and tread check",
          "Fluid level checks",
          "Battery test",
          "Light and indicator check"
        ]
      },
      {
        "name": "Full Renault Service",
        "price": "From \u00a3155",
        "interval": "12 months / 12,000 miles",
        "services": [
          "Everything in Basic Service",
          "Air filter replacement",
          "Cabin filter replacement",
          "CVT fluid check",
          "Coolant system inspection",
          "Renault diagnostic scan"
        ]
      },
      {
        "name": "Major Renault Service",
        "price": "From \u00a3245",
        "interval": "24 months / 24,000 miles",
        "services": [
          "Everything in Full Service",
          "Spark plug replacement",
          "Timing belt inspection",
          "Suspension check",
          "Comprehensive diagnostic"
        ]
      }
    ]
  },
  "alfa-romeo-servicing-chesterfield": {
    "type": "manufacturer",
    "manufacturer": "Alfa Romeo",
    "pageTitle": "Expert Alfa Romeo Servicing Chesterfield | DP Automotive",
    "description": "Specialist Alfa Romeo servicing and repairs in Chesterfield. Our expert technicians provide comprehensive maintenance and diagnostics for all Alfa Romeo models.",
    "specialServices": [
      "Twin Spark Engine Servicing",
      "JTD Diesel Engine Maintenance",
      "Q4 AWD System Service",
      "Alfa Romeo DNA System Diagnostics",
      "MultiAir Engine Technology Service",
      "Dual Clutch Transmission Service",
      "Italian Performance Tuning",
      "Brembo Brake System Specialist"
    ],
    "commonIssues": [
      "Engine timing chain wear in Twin Spark engines",
      "Electrical system faults and warning lights",
      "Clutch wear in manual transmission models",
      "Air conditioning compressor failures",
      "Suspension component wear",
      "especially front wishbones",
      "Fuel pump issues in high-mileage vehicles",
      "Oil consumption problems in older engines",
      "Brake disc warping due to performance driving"
    ],
    "servicePackages": [
      {
        "name": "Basic Alfa Romeo Service",
        "price": "From \u00a395",
        "interval": "6 months / 6,000 miles",
        "services": [
          "Engine oil and filter change",
          "Visual brake inspection",
          "Tyre pressure and tread check",
          "Fluid level checks",
          "Battery test",
          "Light and indicator check"
        ]
      },
      {
        "name": "Full Alfa Romeo Service",
        "price": "From \u00a3169",
        "interval": "12 months / 12,000 miles",
        "services": [
          "Everything in Basic Service",
          "Air filter replacement",
          "Cabin filter replacement",
          "Brake fluid check",
          "Coolant system inspection",
          "Exhaust system check",
          "Alfa Romeo diagnostic scan"
        ]
      },
      {
        "name": "Major Alfa Romeo Service",
        "price": "From \u00a3259",
        "interval": "24 months / 24,000 miles",
        "services": [
          "Everything in Full Service",
          "Spark plug replacement",
          "Timing chain inspection",
          "Clutch operation check",
          "Suspension inspection",
          "Comprehensive diagnostic"
        ]
      }
    ]
  },
  "cupra-servicing-chesterfield": {
    "type": "manufacturer",
    "manufacturer": "Cupra",
    "pageTitle": "Expert Cupra Servicing Chesterfield | DP Automotive",
    "description": "Specialist Cupra servicing and repairs in Chesterfield. Our expert technicians provide comprehensive maintenance and diagnostics for all Cupra models.",
    "specialServices": [
      "TSI Turbo Engine Service",
      "Cupra Performance Mode Calibration",
      "DSG Transmission Service",
      "Brembo Brake System Service",
      "Sport Suspension Setup",
      "Cupra Connect Diagnostics",
      "Performance Exhaust Service",
      "Track Mode Optimization"
    ],
    "commonIssues": [
      "DSG transmission fluid change requirements",
      "Turbocharger carbon build-up prevention",
      "DPF regeneration in diesel variants",
      "Performance brake pad wear from spirited driving",
      "Suspension component wear from sport setup",
      "Engine oil consumption monitoring",
      "Cooling system efficiency for performance use",
      "Clutch wear in manual transmission models"
    ],
    "servicePackages": [
      {
        "name": "Basic Cupra Service",
        "price": "From \u00a395",
        "interval": "6 months / 6,000 miles",
        "services": [
          "Performance engine oil and filter",
          "Sport brake inspection",
          "Tyre pressure and wear check",
          "Fluid level checks",
          "Battery test",
          "Performance exhaust check"
        ]
      },
      {
        "name": "Full Cupra Service",
        "price": "From \u00a3169",
        "interval": "12 months / 10,000 miles",
        "services": [
          "Everything in Basic Service",
          "High-flow air filter replacement",
          "Cabin filter replacement",
          "DSG transmission service",
          "Cooling system inspection",
          "Cupra diagnostic scan"
        ]
      },
      {
        "name": "Performance Cupra Service",
        "price": "From \u00a3249",
        "interval": "18 months / 15,000 miles",
        "services": [
          "Everything in Full Service",
          "Performance spark plug replacement",
          "Turbo system inspection",
          "Sport suspension check",
          "Track-ready preparation"
        ]
      }
    ]
  },
  "chrysler-servicing-chesterfield": {
    "type": "manufacturer",
    "manufacturer": "Chrysler",
    "pageTitle": "Expert Chrysler Servicing Chesterfield | DP Automotive",
    "description": "Specialist Chrysler servicing and repairs in Chesterfield. Our expert technicians provide comprehensive maintenance and diagnostics for all Chrysler models.",
    "specialServices": [
      "HEMI V8 Engine Service",
      "Pentastar V6 Maintenance",
      "TorqueFlite Transmission Service",
      "Uconnect System Diagnostics",
      "AWD System Maintenance",
      "Multi-Displacement System Service",
      "Electronic Throttle Control Service",
      "American Muscle Car Specialization"
    ],
    "commonIssues": [
      "Transmission fluid change requirements",
      "Engine oil consumption in high-mileage vehicles",
      "Electrical system complexity issues",
      "Air conditioning system refrigerant leaks",
      "Suspension component wear patterns",
      "Fuel system maintenance requirements",
      "Brake system wear due to vehicle weight",
      "Engine timing chain stretch in older models"
    ],
    "servicePackages": [
      {
        "name": "Basic Chrysler Service",
        "price": "From \u00a395",
        "interval": "6 months / 6,000 miles",
        "services": [
          "Engine oil and filter change",
          "Visual brake inspection",
          "Tyre pressure and tread check",
          "Fluid level checks",
          "Battery test",
          "Light and indicator check"
        ]
      },
      {
        "name": "Full Chrysler Service",
        "price": "From \u00a3165",
        "interval": "12 months / 12,000 miles",
        "services": [
          "Everything in Basic Service",
          "Air filter replacement",
          "Cabin filter replacement",
          "Transmission fluid check",
          "Coolant system inspection",
          "Chrysler diagnostic scan"
        ]
      },
      {
        "name": "Major Chrysler Service",
        "price": "From \u00a3255",
        "interval": "24 months / 24,000 miles",
        "services": [
          "Everything in Full Service",
          "Spark plug replacement",
          "Transmission service",
          "Suspension inspection",
          "Comprehensive diagnostic"
        ]
      }
    ]
  },
  "mini-servicing-chesterfield": {
    "type": "manufacturer",
    "manufacturer": "MINI",
    "pageTitle": "Expert MINI Servicing Chesterfield | DP Automotive",
    "description": "Specialist MINI servicing and repairs in Chesterfield. Our expert technicians provide comprehensive maintenance and diagnostics for all MINI models.",
    "specialServices": [
      "TwinPower Turbo Engine Service",
      "MINI Connected Services",
      "John Cooper Works Performance",
      "Electric MINI Service",
      "ALL4 All-Wheel Drive Service",
      "British Icon Expertise",
      "Countryman/Clubman Service",
      "Classic MINI Heritage Service"
    ],
    "commonIssues": [
      "Turbocharger carbon build-up prevention",
      "Engine timing chain tensioner maintenance",
      "Clutch wear from spirited driving",
      "Brake system wear from performance use",
      "Suspension component wear from sporty setup",
      "Cooling system maintenance for turbo engines",
      "Electrical system complexity in modern models",
      "Oil consumption monitoring in high-performance variants"
    ],
    "servicePackages": [
      {
        "name": "Basic MINI Service",
        "price": "From \u00a395",
        "interval": "6 months / 6,000 miles",
        "services": [
          "TwinPower Turbo oil and filter",
          "Sport brake inspection",
          "Run-flat tyre inspection",
          "Fluid level checks",
          "Battery test",
          "MINI styling check"
        ]
      },
      {
        "name": "Full MINI Service",
        "price": "From \u00a3169",
        "interval": "12 months / 10,000 miles",
        "services": [
          "Everything in Basic Service",
          "High-performance air filter",
          "Cabin filter replacement",
          "Brake fluid check",
          "Coolant system inspection",
          "MINI diagnostic scan"
        ]
      },
      {
        "name": "Major MINI Service",
        "price": "From \u00a3259",
        "interval": "24 months / 20,000 miles",
        "services": [
          "Everything in Full Service",
          "Spark plug replacement",
          "Timing chain inspection",
          "JCW performance check",
          "Comprehensive diagnostic"
        ]
      }
    ]
  },
  "mechanic-chesterfield": {
    "type": "service",
    "pageTitle": "Mechanic in Chesterfield | Trusted Car Mechanics | DP Automotive",
    "description": "Looking for a good mechanic in Chesterfield? Honest advice, fair prices, and quality repairs from trusted local mechanics. Book online or call today.",
    "h1": "Trusted Mechanics in Chesterfield",
    "intro": "If you're searching for a good mechanic in Chesterfield, our friendly team offers clear advice, transparent pricing, and quality workmanship on every job \u2014 from quick fixes to complex repairs.",
    "serviceType": "Auto Repair"
  },
  "lotus-servicing-chesterfield": {
    "type": "manufacturer",
    "manufacturer": "Lotus",
    "pageTitle": "Expert Lotus Servicing Chesterfield | DP Automotive",
    "description": "Specialist Lotus servicing and repairs in Chesterfield. Our expert technicians provide comprehensive maintenance and diagnostics for all Lotus models.",
    "specialServices": [
      "Lightweight Sports Car Expertise",
      "Lotus V6 Engine Service",
      "Track Day Preparation",
      "Performance Suspension Setup",
      "British Sports Car Heritage",
      "Elise/Exige Specialist Service",
      "Evora Performance Service",
      "Racing Brake System Service"
    ],
    "commonIssues": [
      "Engine oil consumption monitoring",
      "Clutch wear from performance driving",
      "Brake system wear from track use",
      "Suspension component stress from lightweight design",
      "Cooling system efficiency for track conditions",
      "Electrical system maintenance in older models",
      "Tyre wear patterns from performance use",
      "Fuel system maintenance for premium fuel"
    ],
    "servicePackages": [
      {
        "name": "Essential Lotus Service",
        "price": "From \u00a3149",
        "interval": "6 months / 5,000 miles",
        "services": [
          "Performance engine oil and filter",
          "Track-focused brake inspection",
          "Performance tyre assessment",
          "Fluid level checks",
          "Battery test",
          "Weight-optimized inspection"
        ]
      },
      {
        "name": "Performance Lotus Service",
        "price": "From \u00a3269",
        "interval": "12 months / 8,000 miles",
        "services": [
          "Everything in Essential Service",
          "High-flow air filter service",
          "Climate control service",
          "Suspension geometry check",
          "Cooling system inspection",
          "Lotus diagnostic scan"
        ]
      },
      {
        "name": "Track Lotus Service",
        "price": "From \u00a3399",
        "interval": "18 months / 12,000 miles",
        "services": [
          "Everything in Performance Service",
          "Performance spark plug replacement",
          "Track-ready brake service",
          "Suspension component inspection",
          "Race preparation check"
        ]
      }
    ]
  },
  "fiat-servicing-chesterfield": {
    "type": "manufacturer",
    "manufacturer": "Fiat",
    "pageTitle": "Expert Fiat Servicing Chesterfield | DP Automotive",
    "description": "Specialist Fiat servicing and repairs in Chesterfield. Our expert technicians provide comprehensive maintenance and diagnostics for all Fiat models.",
    "specialServices": [
      "MultiAir Engine Technology Service",
      "TwinAir Turbo Engine Service",
      "Fiat 500 Specialist Service",
      "Uconnect System Diagnostics",
      "JTD Diesel Engine Maintenance",
      "Dualogic Transmission Service",
      "Italian City Car Expertise",
      "Stop/Start System Service"
    ],
    "commonIssues": [
      "Engine timing belt replacement requirements",
      "Electrical system faults and sensor issues",
      "Clutch wear in manual transmission models",
      "Air conditioning system refrigerant leaks",
      "Suspension component wear in city driving",
      "DPF issues in diesel models",
      "Stop/start system battery maintenance",
      "Oil consumption monitoring in older engines"
    ],
    "servicePackages": [
      {
        "name": "Basic Fiat Service",
        "price": "From \u00a379",
        "interval": "6 months / 6,000 miles",
        "services": [
          "Engine oil and filter change",
          "Visual brake inspection",
          "Tyre pressure and tread check",
          "Fluid level checks",
          "Battery test",
          "Light and indicator check"
        ]
      },
      {
        "name": "Full Fiat Service",
        "price": "From \u00a3149",
        "interval": "12 months / 12,000 miles",
        "services": [
          "Everything in Basic Service",
          "Air filter replacement",
          "Cabin filter replacement",
          "Brake fluid check",
          "Coolant system inspection",
          "Fiat diagnostic scan"
        ]
      },
      {
        "name": "Major Fiat Service",
        "price": "From \u00a3229",
        "interval": "24 months / 24,000 miles",
        "services": [
          "Everything in Full Service",
          "Spark plug replacement",
          "Timing belt inspection",
          "Suspension check",
          "Comprehensive diagnostic"
        ]
      }
    ]
  },
  "honda-servicing-chesterfield": {
    "type": "manufacturer",
    "manufacturer": "Honda",
    "pageTitle": "Expert Honda Servicing Chesterfield | DP Automotive",
    "description": "Specialist Honda servicing and repairs in Chesterfield. Our expert technicians provide comprehensive maintenance and diagnostics for all Honda models.",
    "specialServices": [
      "VTEC Engine Technology Service",
      "i-VTEC System Maintenance",
      "Honda Sensing Diagnostics",
      "CVT Transmission Service",
      "Honda Connect Infotainment Service",
      "Hybrid System Maintenance",
      "Type R Performance Service",
      "Japanese Reliability Expertise"
    ],
    "commonIssues": [
      "CVT transmission fluid change requirements",
      "Engine timing chain tensioner maintenance",
      "Air conditioning compressor longevity",
      "Brake pad wear patterns",
      "Suspension component durability",
      "Fuel injector cleaning requirements",
      "Battery replacement in hybrid models",
      "Exhaust system corrosion prevention"
    ],
    "servicePackages": [
      {
        "name": "Basic Honda Service",
        "price": "From \u00a389",
        "interval": "6 months / 6,000 miles",
        "services": [
          "Engine oil and filter change",
          "Visual brake inspection",
          "Tyre pressure and tread check",
          "Fluid level checks",
          "Battery test",
          "Light and indicator check"
        ]
      },
      {
        "name": "Full Honda Service",
        "price": "From \u00a3159",
        "interval": "12 months / 12,000 miles",
        "services": [
          "Everything in Basic Service",
          "Air filter replacement",
          "Cabin filter replacement",
          "CVT fluid check",
          "Coolant system inspection",
          "Honda diagnostic scan"
        ]
      },
      {
        "name": "Major Honda Service",
        "price": "From \u00a3249",
        "interval": "24 months / 24,000 miles",
        "services": [
          "Everything in Full Service",
          "Spark plug replacement",
          "Timing chain inspection",
          "Transmission service",
          "Comprehensive diagnostic"
        ]
      }
    ]
  },
  "suzuki-servicing-chesterfield": {
    "type": "manufacturer",
    "manufacturer": "Suzuki",
    "pageTitle": "Expert Suzuki Servicing Chesterfield | DP Automotive",
    "description": "Specialist Suzuki servicing and repairs in Chesterfield. Our expert technicians provide comprehensive maintenance and diagnostics for all Suzuki models.",
    "specialServices": [
      "K-Series Engine Service",
      "AllGrip 4WD System Service",
      "Suzuki Connect Service",
      "Swift Sport Performance Service",
      "Jimny Off-Road Specialist",
      "Vitara SUV Service",
      "SHVS Hybrid Technology",
      "Japanese Reliability Expertise"
    ],
    "commonIssues": [
      "Engine timing chain maintenance requirements",
      "CVT transmission fluid service intervals",
      "4WD system component maintenance",
      "Air conditioning system efficiency",
      "Brake system optimization for lightweight design",
      "Suspension component wear patterns",
      "Electrical system sensor maintenance",
      "Oil consumption monitoring in high-mileage vehicles"
    ],
    "servicePackages": [
      {
        "name": "Basic Suzuki Service",
        "price": "From \u00a379",
        "interval": "6 months / 6,000 miles",
        "services": [
          "K-Series engine oil and filter",
          "Visual brake inspection",
          "Tyre pressure and tread check",
          "Fluid level checks",
          "Battery test",
          "Light and indicator check"
        ]
      },
      {
        "name": "Full Suzuki Service",
        "price": "From \u00a3149",
        "interval": "12 months / 12,000 miles",
        "services": [
          "Everything in Basic Service",
          "Air filter replacement",
          "Cabin filter replacement",
          "CVT fluid inspection",
          "Coolant system check",
          "Suzuki diagnostic scan"
        ]
      },
      {
        "name": "Major Suzuki Service",
        "price": "From \u00a3229",
        "interval": "24 months / 24,000 miles",
        "services": [
          "Everything in Full Service",
          "Spark plug replacement",
          "Timing chain inspection",
          "AllGrip system service",
          "Comprehensive diagnostic"
        ]
      }
    ]
  },
  "ferrari-servicing-chesterfield": {
    "type": "manufacturer",
    "manufacturer": "Ferrari",
    "pageTitle": "Expert Ferrari Servicing Chesterfield | DP Automotive",
    "description": "Specialist Ferrari servicing and repairs in Chesterfield. Our expert technicians provide comprehensive maintenance and diagnostics for all Ferrari models.",
    "specialServices": [
      "V8 & V12 Engine Specialist Service",
      "Ferrari F1-Trac System Service",
      "Carbon Ceramic Brake Maintenance",
      "Maranello Infotainment Service",
      "Italian Supercar Expertise",
      "Track Day Preparation",
      "Performance Exhaust Tuning",
      "Ferrari Genuine Parts Service"
    ],
    "commonIssues": [
      "Engine belt replacement at scheduled intervals",
      "Clutch wear from performance driving",
      "Brake system wear from track use",
      "Electrical system complexity diagnostics",
      "Cooling system maintenance for track use",
      "Suspension component replacement",
      "Fuel system maintenance for premium fuel",
      "Tyre wear patterns from high-performance use"
    ],
    "servicePackages": [
      {
        "name": "Essential Ferrari Service",
        "price": "From \u00a3299",
        "interval": "6 months / 5,000 miles",
        "services": [
          "Premium engine oil and filter change",
          "Comprehensive safety inspection",
          "Carbon ceramic brake assessment",
          "Tyre inspection and rotation",
          "Fluid level checks",
          "Battery and electrical system test"
        ]
      },
      {
        "name": "Comprehensive Ferrari Service",
        "price": "From \u00a3599",
        "interval": "12 months / 10,000 miles",
        "services": [
          "Everything in Essential Service",
          "High-performance air filter replacement",
          "Cabin filter replacement",
          "Suspension system inspection",
          "Cooling system service",
          "Ferrari diagnostic scan"
        ]
      },
      {
        "name": "Major Ferrari Service",
        "price": "From \u00a3999",
        "interval": "24 months / 15,000 miles",
        "services": [
          "Everything in Comprehensive Service",
          "Spark plug replacement",
          "Belt replacement service",
          "Brake fluid replacement",
          "Complete system diagnostics"
        ]
      }
    ]
  },
  "rolls-royce-servicing-chesterfield": {
    "type": "manufacturer",
    "manufacturer": "Rolls-Royce",
    "pageTitle": "Expert Rolls-Royce Servicing Chesterfield | DP Automotive",
    "description": "Specialist Rolls-Royce servicing and repairs in Chesterfield. Our expert technicians provide comprehensive maintenance and diagnostics for all Rolls-Royce models.",
    "specialServices": [
      "V12 Twin-Turbo Engine Service",
      "Spirit of Ecstasy Maintenance",
      "Bespoke Interior Care",
      "Air Suspension System Service",
      "Rolls-Royce Whispers Service",
      "Coach Door Mechanism Service",
      "British Luxury Excellence",
      "Starlight Headliner Maintenance"
    ],
    "commonIssues": [
      "Air suspension system complexity and maintenance",
      "Engine management system sophistication",
      "Electrical system complexity in luxury features",
      "Brake system wear from vehicle weight",
      "Cooling system requirements for V12 engines",
      "Transmission control system calibration",
      "Premium interior component care",
      "Fuel system maintenance for premium fuel"
    ],
    "servicePackages": [
      {
        "name": "Essential Rolls-Royce Service",
        "price": "From \u00a3299",
        "interval": "6 months / 5,000 miles",
        "services": [
          "Premium engine oil and filter change",
          "Luxury vehicle inspection",
          "Air suspension system check",
          "Premium tyre inspection",
          "Fluid level checks",
          "Electrical system diagnostics"
        ]
      },
      {
        "name": "Comprehensive Rolls-Royce Service",
        "price": "From \u00a3599",
        "interval": "12 months / 10,000 miles",
        "services": [
          "Everything in Essential Service",
          "Air filter replacement",
          "Climate control service",
          "Suspension calibration",
          "Cooling system service",
          "Rolls-Royce diagnostic scan"
        ]
      },
      {
        "name": "Major Rolls-Royce Service",
        "price": "From \u00a3999",
        "interval": "24 months / 15,000 miles",
        "services": [
          "Everything in Comprehensive Service",
          "Spark plug replacement",
          "Transmission service",
          "Brake system service",
          "Complete luxury vehicle inspection"
        ]
      }
    ]
  },
  "ford-servicing-chesterfield": {
    "type": "manufacturer",
    "manufacturer": "Ford",
    "pageTitle": "Expert Ford Servicing Chesterfield | DP Automotive",
    "description": "Specialist Ford servicing and repairs in Chesterfield. Our expert technicians provide comprehensive maintenance and diagnostics for all Ford models.",
    "specialServices": [
      "Ford EcoBoost Engine Servicing",
      "PowerShift Transmission Service",
      "Ford SYNC System Diagnostics",
      "EGR Valve Cleaning",
      "DPF Regeneration",
      "Timing Belt Replacement",
      "Ford Performance Upgrades",
      "Clutch Replacement Specialists"
    ],
    "commonIssues": [
      "EcoBoost engine carbon build-up requiring regular cleaning",
      "PowerShift transmission juddering and gear selection issues",
      "DPF blockages in diesel models",
      "especially Mondeo and Focus",
      "EGR valve problems causing poor idle and emissions failures",
      "Timing belt failures in older Fiesta and Focus models",
      "Clutch wear in manual transmission vehicles",
      "Air conditioning system refrigerant leaks",
      "Suspension component wear in high-mileage vehicles"
    ],
    "servicePackages": [
      {
        "name": "Basic Ford Service",
        "price": "From \u00a389",
        "interval": "6 months / 6,000 miles",
        "services": [
          "Engine oil and filter change",
          "Visual brake inspection",
          "Tyre pressure and tread check",
          "Fluid level checks",
          "Battery test",
          "Light and indicator check"
        ]
      },
      {
        "name": "Full Ford Service",
        "price": "From \u00a3159",
        "interval": "12 months / 12,000 miles",
        "services": [
          "Everything in Basic Service",
          "Air filter replacement",
          "Cabin filter replacement",
          "Brake fluid check",
          "Coolant system inspection",
          "Exhaust system check",
          "Ford diagnostic scan"
        ]
      },
      {
        "name": "Major Ford Service",
        "price": "From \u00a3249",
        "interval": "24 months / 24,000 miles",
        "services": [
          "Everything in Full Service",
          "Spark plug replacement",
          "Fuel filter replacement",
          "Timing belt inspection",
          "Clutch operation check",
          "Suspension inspection",
          "Comprehensive diagnostic"
        ]
      }
    ]
  },
  "peugeot-servicing-chesterfield": {
    "type": "manufacturer",
    "manufacturer": "Peugeot",
    "pageTitle": "Expert Peugeot Servicing Chesterfield | DP Automotive",
    "description": "Specialist Peugeot servicing and repairs in Chesterfield. Our expert technicians provide comprehensive maintenance and diagnostics for all Peugeot models.",
    "specialServices": [
      "BlueHDi Diesel Technology Service",
      "PureTech Turbo Engine Service",
      "EAT8 Automatic Transmission",
      "Peugeot i-Cockpit Service",
      "Sport GTi Performance Service",
      "Stop/Start System Maintenance",
      "French Engineering Excellence",
      "Active Suspension Service"
    ],
    "commonIssues": [
      "DPF regeneration issues in BlueHDi engines",
      "PureTech engine wet belt replacement",
      "EAT8 transmission software updates",
      "EGR valve carbon build-up problems",
      "Stop/start system battery maintenance",
      "Air conditioning refrigerant system",
      "Suspension electronic component issues",
      "Timing belt replacement schedules"
    ],
    "servicePackages": [
      {
        "name": "Basic Peugeot Service",
        "price": "From \u00a385",
        "interval": "6 months / 6,000 miles",
        "services": [
          "Engine oil and filter change",
          "Visual brake inspection",
          "Tyre pressure and tread check",
          "Fluid level checks",
          "Battery test",
          "Light and indicator check"
        ]
      },
      {
        "name": "Full Peugeot Service",
        "price": "From \u00a3155",
        "interval": "12 months / 12,000 miles",
        "services": [
          "Everything in Basic Service",
          "Air filter replacement",
          "Cabin filter replacement",
          "EAT8 fluid check",
          "Coolant system inspection",
          "Peugeot diagnostic scan"
        ]
      },
      {
        "name": "Major Peugeot Service",
        "price": "From \u00a3245",
        "interval": "24 months / 24,000 miles",
        "services": [
          "Everything in Full Service",
          "Spark plug replacement",
          "Wet belt inspection",
          "Suspension system check",
          "Comprehensive diagnostic"
        ]
      }
    ]
  },
  "jaguar-servicing-chesterfield": {
    "type": "manufacturer",
    "manufacturer": "Jaguar",
    "pageTitle": "Expert Jaguar Servicing Chesterfield | DP Automotive",
    "description": "Specialist Jaguar servicing and repairs in Chesterfield. Our expert technicians provide comprehensive maintenance and diagnostics for all Jaguar models.",
    "specialServices": [
      "V6 & V8 Supercharged Engine Service",
      "Ingenium Engine Technology Service",
      "All-Wheel Drive System Service",
      "InControl Touch Pro Diagnostics",
      "Adaptive Dynamics Suspension",
      "British Luxury Car Expertise",
      "Performance Brake System Service",
      "Classic Jaguar Restoration"
    ],
    "commonIssues": [
      "Supercharger system maintenance requirements",
      "Complex electrical system diagnostics",
      "Air suspension system component wear",
      "Engine timing chain tensioner issues",
      "Brake system wear from performance use",
      "Cooling system maintenance for supercharged engines",
      "Transmission control module calibration",
      "Premium fuel system requirements"
    ],
    "servicePackages": [
      {
        "name": "Essential Jaguar Service",
        "price": "From \u00a3149",
        "interval": "6 months / 6,000 miles",
        "services": [
          "Premium engine oil and filter change",
          "Multi-point vehicle inspection",
          "Brake system assessment",
          "Tyre inspection and rotation",
          "Fluid level checks",
          "Battery and electrical test"
        ]
      },
      {
        "name": "Comprehensive Jaguar Service",
        "price": "From \u00a3279",
        "interval": "12 months / 12,000 miles",
        "services": [
          "Everything in Essential Service",
          "Air filter replacement",
          "Cabin filter replacement",
          "Suspension system inspection",
          "Coolant system service",
          "Jaguar diagnostic scan"
        ]
      },
      {
        "name": "Major Jaguar Service",
        "price": "From \u00a3449",
        "interval": "24 months / 20,000 miles",
        "services": [
          "Everything in Comprehensive Service",
          "Spark plug replacement",
          "Transmission service",
          "Brake fluid replacement",
          "Complete system diagnostics"
        ]
      }
    ]
  },
  "volkswagen-servicing-chesterfield": {
    "type": "manufacturer",
    "manufacturer": "Volkswagen",
    "pageTitle": "Expert Volkswagen Servicing Chesterfield | DP Automotive",
    "description": "Specialist Volkswagen servicing and repairs in Chesterfield. Our expert technicians provide comprehensive maintenance and diagnostics for all Volkswagen models.",
    "specialServices": [
      "VW Service Interval Indicator Reset",
      "TSI Engine Carbon Cleaning",
      "DSG Transmission Service",
      "VW Diagnostics and Coding",
      "DPF Regeneration Service",
      "Timing Chain Service",
      "VW Infotainment Updates",
      "BlueMotion Technology Service"
    ],
    "commonIssues": [
      "Carbon deposits in TSI direct injection engines",
      "DSG transmission oil and filter service requirements",
      "Timing chain tensioner problems in early TSI engines",
      "DPF blockages in TDI diesel models",
      "Water pump failures",
      "especially in EA888 engines",
      "Coil pack and ignition system failures",
      "Electronic parking brake malfunctions",
      "Infotainment system software issues and updates"
    ],
    "servicePackages": [
      {
        "name": "VW Oil Service",
        "price": "From \u00a399",
        "interval": "12 months / 10,000 miles",
        "services": [
          "VW approved engine oil",
          "Genuine oil filter",
          "Service indicator reset",
          "Visual inspection",
          "Fluid level checks",
          "AdBlue top-up (diesel)"
        ]
      },
      {
        "name": "VW Inspection Service",
        "price": "From \u00a3179",
        "interval": "12 months / 10,000 miles",
        "services": [
          "Complete oil service",
          "Air filter check",
          "Cabin filter replacement",
          "Brake system inspection",
          "VW diagnostic scan",
          "Battery and charging test",
          "Tyre condition check"
        ]
      },
      {
        "name": "Major VW Service",
        "price": "From \u00a3299",
        "interval": "24 months / 20,000 miles",
        "services": [
          "Everything in Inspection",
          "Spark plug replacement",
          "Air filter replacement",
          "Brake fluid service",
          "DSG service (if applicable)",
          "Fuel system service",
          "Comprehensive diagnostics"
        ]
      }
    ]
  },
  "abarth-servicing-chesterfield": {
    "type": "manufacturer",
    "manufacturer": "Abarth",
    "pageTitle": "Expert Abarth Servicing Chesterfield | DP Automotive",
    "description": "Specialist Abarth servicing and repairs in Chesterfield. Our expert technicians provide comprehensive maintenance and diagnostics for all Abarth models.",
    "specialServices": [
      "T-Jet Turbo Engine Service",
      "Abarth Performance Tuning",
      "Record Monza Exhaust Service",
      "Racing Brake System Service",
      "Competition Suspension Setup",
      "Turbocharger Maintenance",
      "Track Day Preparation",
      "Italian Performance Optimization"
    ],
    "commonIssues": [
      "Turbocharger oil feed line maintenance",
      "Performance exhaust system heat management",
      "Clutch wear from spirited driving",
      "Brake disc and pad wear from track use",
      "Suspension component stress from lowered setup",
      "Engine oil consumption monitoring",
      "Cooling system efficiency for track use",
      "Tyre wear patterns from performance driving"
    ],
    "servicePackages": [
      {
        "name": "Basic Abarth Service",
        "price": "From \u00a399",
        "interval": "6 months / 5,000 miles",
        "services": [
          "Performance engine oil and filter",
          "Turbo system inspection",
          "Performance brake check",
          "Tyre pressure and wear assessment",
          "Fluid level checks",
          "Exhaust system inspection"
        ]
      },
      {
        "name": "Full Abarth Service",
        "price": "From \u00a3169",
        "interval": "12 months / 10,000 miles",
        "services": [
          "Everything in Basic Service",
          "High-flow air filter service",
          "Cabin filter replacement",
          "Brake fluid replacement",
          "Cooling system check",
          "Abarth diagnostic scan"
        ]
      },
      {
        "name": "Performance Abarth Service",
        "price": "From \u00a3249",
        "interval": "18 months / 15,000 miles",
        "services": [
          "Everything in Full Service",
          "Performance spark plug replacement",
          "Turbo system service",
          "Suspension geometry check",
          "Track-ready inspection"
        ]
      }
    ]
  },
  "oil-change-chesterfield": {
    "type": "service",
    "pageTitle": "Oil Change in Chesterfield | Fast, Affordable Oil & Filter | DP Automotive",
    "description": "Quick oil and filter change in Chesterfield. Correct spec oil for your engine, OE\u2011quality filters, service light reset, and health check. Book today.",
    "h1": "Oil Change in Chesterfield",
    "intro": "Fresh oil keeps your engine protected and efficient. We use the correct specification oil for your vehicle, replace the filter, reset service indicators and carry out a complimentary health check.",
    "serviceType": "Oil change"
  },
  "dodge-servicing-chesterfield": {
    "type": "manufacturer",
    "manufacturer": "Dodge",
    "pageTitle": "Expert Dodge Servicing Chesterfield | DP Automotive",
    "description": "Specialist Dodge servicing and repairs in Chesterfield. Our expert technicians provide comprehensive maintenance and diagnostics for all Dodge models.",
    "specialServices": [
      "HEMI V8 Performance Service",
      "SRT High-Performance Maintenance",
      "Challenger/Charger Specialization",
      "RAM Truck Service",
      "Performance Exhaust System Service",
      "Supercharged Engine Maintenance",
      "Heavy-Duty Transmission Service",
      "American Muscle Optimization"
    ],
    "commonIssues": [
      "High-performance engine oil consumption",
      "Transmission cooling system maintenance",
      "Brake system wear from performance driving",
      "Suspension component stress from power output",
      "Exhaust system heat management issues",
      "Fuel system high-flow requirements",
      "Engine timing chain maintenance in V8s",
      "Cooling system upgrades for performance use"
    ],
    "servicePackages": [
      {
        "name": "Basic Dodge Service",
        "price": "From \u00a399",
        "interval": "6 months / 5,000 miles",
        "services": [
          "High-performance oil and filter change",
          "Performance brake inspection",
          "Tyre pressure and wear check",
          "Fluid level inspection",
          "Battery and charging test",
          "Performance exhaust check"
        ]
      },
      {
        "name": "Full Dodge Service",
        "price": "From \u00a3179",
        "interval": "12 months / 10,000 miles",
        "services": [
          "Everything in Basic Service",
          "High-flow air filter replacement",
          "Cabin filter replacement",
          "Transmission fluid service",
          "Cooling system inspection",
          "Dodge diagnostic scan"
        ]
      },
      {
        "name": "Major Dodge Service",
        "price": "From \u00a3279",
        "interval": "24 months / 20,000 miles",
        "services": [
          "Everything in Full Service",
          "Performance spark plug replacement",
          "Transmission service",
          "Suspension system inspection",
          "Comprehensive performance diagnostic"
        ]
      }
    ]
  },
  "volvo-servicing-chesterfield": {
    "type": "manufacturer",
    "manufacturer": "Volvo",
    "pageTitle": "Expert Volvo Servicing Chesterfield | DP Automotive",
    "description": "Specialist Volvo servicing and repairs in Chesterfield. Our expert technicians provide comprehensive maintenance and diagnostics for all Volvo models.",
    "specialServices": [
      "Drive-E Engine Technology Service",
      "City Safety System Service",
      "Pilot Assist Technology Service",
      "Geartronic Transmission Service",
      "XC90/XC60 SUV Service",
      "Polestar Performance Service",
      "Swedish Safety Excellence",
      "Sensus Connect Service"
    ],
    "commonIssues": [
      "Engine timing belt replacement schedules",
      "Geartronic transmission software updates",
      "City Safety sensor calibration and maintenance",
      "Air conditioning system efficiency",
      "Brake system wear monitoring",
      "DPF issues in diesel D-series engines",
      "Electrical system complexity management",
      "Suspension component longevity optimization"
    ],
    "servicePackages": [
      {
        "name": "Basic Volvo Service",
        "price": "From \u00a395",
        "interval": "6 months / 6,000 miles",
        "services": [
          "Drive-E engine oil and filter",
          "Safety system check",
          "Brake system inspection",
          "Tyre pressure and tread check",
          "Fluid level checks",
          "Battery health test"
        ]
      },
      {
        "name": "Full Volvo Service",
        "price": "From \u00a3169",
        "interval": "12 months / 12,000 miles",
        "services": [
          "Everything in Basic Service",
          "Air filter replacement",
          "Cabin filter replacement",
          "Geartronic transmission check",
          "Coolant system inspection",
          "Volvo diagnostic scan"
        ]
      },
      {
        "name": "Major Volvo Service",
        "price": "From \u00a3259",
        "interval": "24 months / 20,000 miles",
        "services": [
          "Everything in Full Service",
          "Spark plug replacement",
          "Timing belt inspection",
          "Safety system calibration",
          "Comprehensive diagnostic"
        ]
      }
    ]
  },
  "clutch-replacement-chesterfield": {
    "type": "service",
    "pageTitle": "Clutch Replacement in Chesterfield | Fixed Quotes | DP Automotive",
    "description": "Expert clutch replacement in Chesterfield. Full clutch kits, hydraulics and flywheels fitted by professionals. Honest, fixed quotations.",
    "h1": "Clutch Replacement in Chesterfield",
    "intro": "Slipping clutch, juddering, or trouble selecting gears? Our experienced team can diagnose clutch and hydraulic issues and replace components using quality parts \u2014 with clear timelines and fixed quotations.",
    "serviceType": "Clutch replacement"
  },
  "bmw-servicing-chesterfield": {
    "type": "manufacturer",
    "manufacturer": "BMW",
    "pageTitle": "Expert BMW Servicing Chesterfield | DP Automotive",
    "description": "Specialist BMW servicing and repairs in Chesterfield. Our expert technicians provide comprehensive maintenance and diagnostics for all BMW models.",
    "specialServices": [
      "BMW Service Indicator Reset",
      "iDrive System Diagnostics",
      "BMW Oil Service with Genuine Parts",
      "Brake Fluid Service",
      "Microfilter Replacement",
      "BMW Coding and Programming",
      "Differential Service",
      "BMW Performance Diagnostics"
    ],
    "commonIssues": [
      "Oil leaks from valve cover gaskets and oil pan seals",
      "Water pump failures",
      "particularly in N54 and N55 engines",
      "Carbon build-up in direct injection engines requiring cleaning",
      "Thermostat housing leaks causing overheating issues",
      "Fuel injector problems in high-pressure injection systems",
      "Suspension component wear",
      "especially control arm bushings",
      "Electronic parking brake malfunctions",
      "iDrive system software updates and connectivity issues"
    ],
    "servicePackages": [
      {
        "name": "BMW Oil Service",
        "price": "From \u00a3119",
        "interval": "12 months / 10,000 miles",
        "services": [
          "Genuine BMW engine oil",
          "BMW oil filter replacement",
          "Service indicator reset",
          "Visual inspection",
          "Brake fluid level check",
          "Coolant level check"
        ]
      },
      {
        "name": "BMW Inspection I",
        "price": "From \u00a3199",
        "interval": "12 months / 10,000 miles",
        "services": [
          "Complete oil service",
          "Microfilter replacement",
          "Brake inspection",
          "Tyre condition check",
          "BMW diagnostic scan",
          "Battery and charging test",
          "Light function check"
        ]
      },
      {
        "name": "BMW Inspection II",
        "price": "From \u00a3349",
        "interval": "24 months / 20,000 miles",
        "services": [
          "Everything in Inspection I",
          "Spark plug replacement",
          "Air filter replacement",
          "Brake fluid replacement",
          "Fuel system inspection",
          "Suspension check",
          "Comprehensive diagnostics"
        ]
      }
    ]
  },
  "timing-chain-replacement-chesterfield": {
    "type": "service",
    "pageTitle": "Timing Chain Replacement in Chesterfield | DP Automotive",
    "description": "Professional timing chain replacement in Chesterfield. Full kits with guides and tensioners installed to manufacturer procedures.",
    "h1": "Timing Chain Replacement in Chesterfield",
    "intro": "Rattling on cold start, timing codes, or loss of performance can indicate a worn or stretched chain. We replace complete chain kits using correct locking tools and procedures to restore quiet, reliable running.",
    "serviceType": "Engine service"
  },
  "tvr-servicing-chesterfield": {
    "type": "manufacturer",
    "manufacturer": "TVR",
    "pageTitle": "Expert TVR Servicing Chesterfield | DP Automotive",
    "description": "Specialist TVR servicing and repairs in Chesterfield. Our expert technicians provide comprehensive maintenance and diagnostics for all TVR models.",
    "specialServices": [
      "Speed Six Engine Service",
      "AJP V8 Engine Maintenance",
      "Rover V8 Specialist Service",
      "Griffith/Chimaera Service",
      "Cerbera Performance Service",
      "Tuscan Speed Six Service",
      "British Sports Car Expertise",
      "Classic TVR Restoration"
    ],
    "commonIssues": [
      "Engine cooling system maintenance critical for performance",
      "Electrical system complexity and Lucas component issues",
      "Fuel system maintenance for carbureted models",
      "Brake system optimization for high performance use",
      "Suspension component wear from spirited driving",
      "Clutch replacement from performance driving",
      "Body panel and fiberglass maintenance",
      "Oil leak prevention and gasket replacement"
    ],
    "servicePackages": [
      {
        "name": "Basic TVR Service",
        "price": "From \u00a3149",
        "interval": "3 months / 3,000 miles",
        "services": [
          "Performance engine oil and filter",
          "Cooling system inspection",
          "Brake system check",
          "Electrical system test",
          "Fluid level checks",
          "Classic car inspection"
        ]
      },
      {
        "name": "Performance TVR Service",
        "price": "From \u00a3299",
        "interval": "6 months / 6,000 miles",
        "services": [
          "Everything in Basic Service",
          "Carburettor tuning (if applicable)",
          "Ignition system service",
          "Suspension geometry check",
          "Exhaust system inspection",
          "TVR specialist diagnostic"
        ]
      },
      {
        "name": "Comprehensive TVR Service",
        "price": "From \u00a3599",
        "interval": "12 months / 6,000 miles",
        "services": [
          "Everything in Performance Service",
          "Engine timing and tuning",
          "Clutch system inspection",
          "Body and chassis check",
          "Classic restoration consultation"
        ]
      }
    ]
  },
  "jeep-servicing-chesterfield": {
    "type": "manufacturer",
    "manufacturer": "Jeep",
    "pageTitle": "Expert Jeep Servicing Chesterfield | DP Automotive",
    "description": "Specialist Jeep servicing and repairs in Chesterfield. Our expert technicians provide comprehensive maintenance and diagnostics for all Jeep models.",
    "specialServices": [
      "Trail Rated 4WD System Service",
      "Pentastar V6 Engine Service",
      "Jeep Wrangler Specialist Service",
      "Uconnect 4C NAV Diagnostics",
      "Rock-Trac Transfer Case Service",
      "Off-Road Suspension Service",
      "American 4x4 Expertise",
      "Rubicon Package Maintenance"
    ],
    "commonIssues": [
      "4WD system component maintenance from off-road use",
      "Differential service requirements",
      "Suspension component wear from trail use",
      "Engine air filter replacement from dusty conditions",
      "Brake system wear from heavy vehicle weight",
      "Transmission cooling system maintenance",
      "Electrical connector protection from elements",
      "Underbody component inspection after off-roading"
    ],
    "servicePackages": [
      {
        "name": "Basic Jeep Service",
        "price": "From \u00a399",
        "interval": "6 months / 6,000 miles",
        "services": [
          "Engine oil and filter change",
          "4WD system inspection",
          "Off-road brake inspection",
          "Heavy-duty tyre inspection",
          "Fluid level checks",
          "Underbody wash and inspection"
        ]
      },
      {
        "name": "Trail Jeep Service",
        "price": "From \u00a3179",
        "interval": "12 months / 10,000 miles",
        "services": [
          "Everything in Basic Service",
          "Heavy-duty air filter replacement",
          "Cabin filter replacement",
          "Transfer case fluid check",
          "Coolant system inspection",
          "Jeep diagnostic scan"
        ]
      },
      {
        "name": "Major Jeep Service",
        "price": "From \u00a3279",
        "interval": "18 months / 15,000 miles",
        "services": [
          "Everything in Trail Service",
          "Spark plug replacement",
          "Differential service",
          "Suspension inspection",
          "Off-road readiness check"
        ]
      }
    ]
  },
  "seat-servicing-chesterfield": {
    "type": "manufacturer",
    "manufacturer": "SEAT",
    "pageTitle": "Expert SEAT Servicing Chesterfield | DP Automotive",
    "description": "Specialist SEAT servicing and repairs in Chesterfield. Our expert technicians provide comprehensive maintenance and diagnostics for all SEAT models.",
    "specialServices": [
      "TSI Engine Technology Service",
      "TDI Diesel Engine Service",
      "DSG Transmission Service",
      "SEAT Connect Diagnostics",
      "FR Performance Service",
      "Ecomotive Efficiency Service",
      "Spanish Design Engineering",
      "Leon Cupra Specialist Service"
    ],
    "commonIssues": [
      "DSG transmission fluid change requirements",
      "DPF regeneration in TDI engines",
      "Timing belt replacement schedules",
      "EGR valve carbon build-up",
      "Clutch wear in manual models",
      "Air conditioning system efficiency",
      "Suspension component wear",
      "Engine oil consumption monitoring"
    ],
    "servicePackages": [
      {
        "name": "Basic SEAT Service",
        "price": "From \u00a385",
        "interval": "6 months / 6,000 miles",
        "services": [
          "Engine oil and filter change",
          "Visual brake inspection",
          "Tyre pressure and tread check",
          "Fluid level checks",
          "Battery test",
          "Light and indicator check"
        ]
      },
      {
        "name": "Full SEAT Service",
        "price": "From \u00a3155",
        "interval": "12 months / 12,000 miles",
        "services": [
          "Everything in Basic Service",
          "Air filter replacement",
          "Cabin filter replacement",
          "DSG transmission check",
          "Coolant system inspection",
          "SEAT diagnostic scan"
        ]
      },
      {
        "name": "Major SEAT Service",
        "price": "From \u00a3245",
        "interval": "24 months / 24,000 miles",
        "services": [
          "Everything in Full Service",
          "Spark plug replacement",
          "Timing belt inspection",
          "Suspension check",
          "Comprehensive diagnostic"
        ]
      }
    ]
  },
  "audi-servicing-chesterfield": {
    "type": "manufacturer",
    "manufacturer": "Audi",
    "pageTitle": "Expert Audi Servicing Chesterfield | DP Automotive",
    "description": "Specialist Audi servicing and repairs in Chesterfield. Our expert technicians provide comprehensive maintenance and diagnostics for all Audi models.",
    "specialServices": [
      "Audi Service Interval Display Reset",
      "quattro All-Wheel Drive Service",
      "TSI/TFSI Engine Specialists",
      "S tronic Transmission Service",
      "Audi MMI System Updates",
      "DPF Cleaning and Regeneration",
      "Carbon Cleaning Service",
      "Audi Performance Tuning"
    ],
    "commonIssues": [
      "Carbon build-up in TSI/TFSI direct injection engines",
      "Timing chain tensioner failures in older A4 and A6 models",
      "Oil consumption issues in early TFSI engines",
      "S tronic transmission mechatronic unit problems",
      "DPF blockages in TDI diesel engines",
      "Water pump and thermostat failures",
      "Coil pack failures causing misfires",
      "Electronic parking brake and MMI system faults"
    ],
    "servicePackages": [
      {
        "name": "Audi Oil Service",
        "price": "From \u00a3109",
        "interval": "12 months / 9,300 miles",
        "services": [
          "Audi LongLife engine oil",
          "Genuine oil filter replacement",
          "Service interval reset",
          "Visual safety check",
          "Fluid level inspection",
          "AdBlue level check (diesel)"
        ]
      },
      {
        "name": "Audi Inspection",
        "price": "From \u00a3189",
        "interval": "12 months / 9,300 miles",
        "services": [
          "Complete oil service",
          "Air filter inspection",
          "Cabin filter replacement",
          "Brake system check",
          "Audi diagnostic scan",
          "Tyre condition assessment",
          "quattro system check"
        ]
      },
      {
        "name": "Major Audi Service",
        "price": "From \u00a3329",
        "interval": "24 months / 18,600 miles",
        "services": [
          "Everything in Inspection",
          "Spark plug replacement",
          "Air filter replacement",
          "Brake fluid service",
          "Fuel filter replacement",
          "S tronic service (if applicable)",
          "Comprehensive diagnostics"
        ]
      }
    ]
  },
  "exhaust-replacement-chesterfield": {
    "type": "service",
    "pageTitle": "Exhaust Repair & Replacement in Chesterfield | DP Automotive",
    "description": "Exhaust repair and replacement in Chesterfield. Fix leaks, corrosion, flexi pipes, boxes, and catalytic converters. Emissions-safe solutions.",
    "h1": "Exhaust Repair & Replacement in Chesterfield",
    "intro": "Loud exhaust, fumes, or failed emissions? We repair or replace sections as needed \u2014 from back boxes and flexi pipes to catalytic converters \u2014 with clear advice and fair pricing.",
    "serviceType": "Exhaust service"
  },
  "lamborghini-servicing-chesterfield": {
    "type": "manufacturer",
    "manufacturer": "Lamborghini",
    "pageTitle": "Expert Lamborghini Servicing Chesterfield | DP Automotive",
    "description": "Specialist Lamborghini servicing and repairs in Chesterfield. Our expert technicians provide comprehensive maintenance and diagnostics for all Lamborghini models.",
    "specialServices": [
      "V10 & V12 Supercar Engine Service",
      "AWD Haldex System Service",
      "Carbon Ceramic Brake Maintenance",
      "Lamborghini Infotainment Service",
      "Italian Supercar Expertise",
      "Track Day Preparation",
      "Performance Exhaust Tuning",
      "Sant\\'Agata Genuine Parts"
    ],
    "commonIssues": [
      "Clutch replacement from performance driving",
      "Engine belt service at specific intervals",
      "Brake system wear from track use",
      "Electrical system complexity diagnostics",
      "Cooling system maintenance for track conditions",
      "Suspension component replacement requirements",
      "Fuel system maintenance for premium fuel",
      "Tyre wear from high-performance driving"
    ],
    "servicePackages": [
      {
        "name": "Essential Lamborghini Service",
        "price": "From \u00a3399",
        "interval": "6 months / 3,000 miles",
        "services": [
          "Premium engine oil and filter change",
          "Comprehensive safety inspection",
          "Carbon brake assessment",
          "Performance tyre inspection",
          "Fluid level checks",
          "Electrical system diagnostics"
        ]
      },
      {
        "name": "Comprehensive Lamborghini Service",
        "price": "From \u00a3799",
        "interval": "12 months / 6,000 miles",
        "services": [
          "Everything in Essential Service",
          "High-performance air filter service",
          "Climate control service",
          "Suspension system inspection",
          "Cooling system service",
          "Lamborghini diagnostic scan"
        ]
      },
      {
        "name": "Major Lamborghini Service",
        "price": "From \u00a31,299",
        "interval": "24 months / 12,000 miles",
        "services": [
          "Everything in Comprehensive Service",
          "Spark plug replacement",
          "Belt service replacement",
          "Brake fluid replacement",
          "Complete supercar inspection"
        ]
      }
    ]
  },
  "engine-diagnostics-chesterfield": {
    "type": "service",
    "pageTitle": "Engine Diagnostics Chesterfield | Warning Light Specialists | DP Automotive",
    "description": "Expert engine diagnostics in Chesterfield. Check engine light on? We use advanced diagnostic equipment to find faults fast. Petrol & diesel specialists. Book your diagnostic today.",
    "h1": "Engine Diagnostics Chesterfield",
    "intro": "Engine warning light causing concern? Our specialist engine diagnostics service uses manufacturer-level equipment to identify faults quickly and accurately. Don't let engine problems escalate \u2013 get expert diagnosis today.",
    "serviceType": "Engine Diagnostics",
    "faqs": [
      {
        "question": "What causes the engine management light to come on?",
        "answer": "Common causes include faulty oxygen sensors, catalytic converter issues, spark plug problems, mass airflow sensor faults, loose fuel cap, or more serious engine issues. Our diagnostics will identify the exact cause."
      },
      {
        "question": "Is it safe to drive with the engine warning light on?",
        "answer": "A steady amber light usually means you can drive carefully to get it checked. A flashing light indicates a serious issue \u2013 pull over safely and call us. Either way, don't ignore it as it could cause further damage."
      },
      {
        "question": "How accurate is engine diagnostic testing?",
        "answer": "Our dealer-level diagnostic equipment provides highly accurate results, reading fault codes directly from your car's ECU. Combined with our technicians' experience, we can pinpoint issues that generic scanners might miss."
      },
      {
        "question": "Can you reset my engine warning light?",
        "answer": "Yes, but simply clearing codes without fixing the underlying issue means the light will return. We always diagnose and recommend the proper repair before clearing any codes."
      },
      {
        "question": "Do you diagnose diesel and petrol engines?",
        "answer": "Yes, we diagnose all engine types including petrol, diesel, hybrid, and turbocharged engines. We have specialist equipment for diesel injector testing and DPF diagnostics."
      }
    ]
  },
  "westfield-servicing-chesterfield": {
    "type": "manufacturer",
    "manufacturer": "Westfield",
    "pageTitle": "Expert Westfield Servicing Chesterfield | DP Automotive",
    "description": "Specialist Westfield servicing and repairs in Chesterfield. Our expert technicians provide comprehensive maintenance and diagnostics for all Westfield models.",
    "specialServices": [
      "Seven Style Sports Car Service",
      "Kit Car Specialist Maintenance",
      "Ford/Vauxhall Engine Conversions",
      "Sequential Gearbox Service",
      "Track Day Preparation",
      "Caterham Alternative Service",
      "Lightweight Sports Car Expertise",
      "British Kit Car Heritage"
    ],
    "commonIssues": [
      "Engine tuning and carburetor adjustment",
      "Brake system optimization for track use",
      "Suspension setup for road and track",
      "Electrical system simplification and reliability",
      "Clutch adjustment and replacement",
      "Cooling system efficiency for track use",
      "Fuel system maintenance and upgrades",
      "Safety equipment inspection and updates"
    ],
    "servicePackages": [
      {
        "name": "Basic Westfield Service",
        "price": "From \u00a3129",
        "interval": "3 months / 3,000 miles",
        "services": [
          "Engine oil and filter change",
          "Brake system inspection",
          "Tyre pressure and condition check",
          "Fluid level checks",
          "Safety equipment check",
          "Track readiness inspection"
        ]
      },
      {
        "name": "Track Westfield Service",
        "price": "From \u00a3249",
        "interval": "6 months / 3,000 miles",
        "services": [
          "Everything in Basic Service",
          "Carburetor tuning",
          "Suspension setup and alignment",
          "Brake system optimization",
          "Engine timing check",
          "Performance diagnostic"
        ]
      },
      {
        "name": "Competition Westfield Service",
        "price": "From \u00a3449",
        "interval": "12 months / 6,000 miles",
        "services": [
          "Everything in Track Service",
          "Sequential gearbox service",
          "Engine rebuild consultation",
          "Roll cage inspection",
          "Competition preparation"
        ]
      }
    ]
  },
  "mitsubishi-servicing-chesterfield": {
    "type": "manufacturer",
    "manufacturer": "Mitsubishi",
    "pageTitle": "Expert Mitsubishi Servicing Chesterfield | DP Automotive",
    "description": "Specialist Mitsubishi servicing and repairs in Chesterfield. Our expert technicians provide comprehensive maintenance and diagnostics for all Mitsubishi models.",
    "specialServices": [
      "MIVEC Engine Technology Service",
      "S-AWC All-Wheel Control Service",
      "Outlander PHEV Hybrid Service",
      "CVT Transmission Maintenance",
      "Eclipse Cross Service",
      "ASX Compact SUV Service",
      "Japanese Reliability Expertise",
      "Diamond Advantage Service"
    ],
    "commonIssues": [
      "CVT transmission fluid maintenance requirements",
      "MIVEC system timing optimization",
      "All-wheel drive system component maintenance",
      "Air conditioning system efficiency",
      "Brake system longevity optimization",
      "Battery health in PHEV models",
      "Engine timing belt replacement schedules",
      "Suspension component wear patterns"
    ],
    "servicePackages": [
      {
        "name": "Basic Mitsubishi Service",
        "price": "From \u00a389",
        "interval": "6 months / 6,000 miles",
        "services": [
          "Engine oil and filter change",
          "Visual brake inspection",
          "Tyre pressure and tread check",
          "Fluid level checks",
          "Battery test",
          "Light and indicator check"
        ]
      },
      {
        "name": "Full Mitsubishi Service",
        "price": "From \u00a3159",
        "interval": "12 months / 12,000 miles",
        "services": [
          "Everything in Basic Service",
          "Air filter replacement",
          "Cabin filter replacement",
          "CVT fluid inspection",
          "Coolant system check",
          "Mitsubishi diagnostic scan"
        ]
      },
      {
        "name": "Major Mitsubishi Service",
        "price": "From \u00a3249",
        "interval": "24 months / 24,000 miles",
        "services": [
          "Everything in Full Service",
          "Spark plug replacement",
          "Timing belt inspection",
          "AWD system service",
          "Comprehensive diagnostic"
        ]
      }
    ]
  },
  "isuzu-servicing-chesterfield": {
    "type": "manufacturer",
    "manufacturer": "Isuzu",
    "pageTitle": "Expert Isuzu Servicing Chesterfield | DP Automotive",
    "description": "Specialist Isuzu servicing and repairs in Chesterfield. Our expert technicians provide comprehensive maintenance and diagnostics for all Isuzu models.",
    "specialServices": [
      "D-Max Pickup Truck Service",
      "Commercial Vehicle Maintenance",
      "Diesel Engine Specialist Service",
      "VGS Variable Geometry System",
      "Heavy-Duty Transmission Service",
      "4WD System Maintenance",
      "Commercial Fleet Support",
      "Japanese Diesel Expertise"
    ],
    "commonIssues": [
      "DPF regeneration and cleaning requirements",
      "EGR valve carbon build-up issues",
      "Diesel fuel system maintenance",
      "Heavy-duty clutch wear patterns",
      "4WD system component maintenance",
      "Commercial use brake wear",
      "Suspension component stress from loading",
      "Cooling system maintenance for commercial use"
    ],
    "servicePackages": [
      {
        "name": "Basic Isuzu Service",
        "price": "From \u00a395",
        "interval": "6 months / 6,000 miles",
        "services": [
          "Diesel engine oil and filter change",
          "Commercial brake inspection",
          "Heavy-duty tyre inspection",
          "Fluid level checks",
          "Battery and charging test",
          "Light and indicator check"
        ]
      },
      {
        "name": "Full Isuzu Service",
        "price": "From \u00a3169",
        "interval": "12 months / 12,000 miles",
        "services": [
          "Everything in Basic Service",
          "Air filter replacement",
          "Fuel filter replacement",
          "DPF system check",
          "Coolant system inspection",
          "Isuzu diagnostic scan"
        ]
      },
      {
        "name": "Commercial Isuzu Service",
        "price": "From \u00a3259",
        "interval": "18 months / 18,000 miles",
        "services": [
          "Everything in Full Service",
          "Heavy-duty transmission service",
          "4WD system inspection",
          "Commercial vehicle safety check",
          "Comprehensive diagnostic"
        ]
      }
    ]
  },
  "brake-repair-chesterfield": {
    "type": "service",
    "pageTitle": "Brake Repair in Chesterfield | Pads, Discs, ABS | DP Automotive",
    "description": "Fast, safe brake repair in Chesterfield. Pads and discs, fluid changes, calipers and ABS diagnostics with clear pricing. Book today.",
    "h1": "Brake Repair in Chesterfield",
    "intro": "Brakes are your car's most important safety system. If you hear squealing, feel vibration under braking, or see a warning light, our technicians can diagnose the issue and get you safely back on the road \u2014 often the same day for common parts.",
    "serviceType": "Brake service"
  },
  "electrical-diagnostics-chesterfield": {
    "type": "service",
    "pageTitle": "Car Electrical Diagnostics Chesterfield | Auto Electrician | DP Automotive",
    "description": "Expert automotive electrical diagnostics in Chesterfield. Battery drain, alternator faults, wiring issues & electronic system problems diagnosed. Skilled auto electricians. Book now.",
    "h1": "Electrical Diagnostics Chesterfield",
    "intro": "Experiencing electrical gremlins with your vehicle? Our skilled auto electricians use advanced diagnostic equipment to trace and identify electrical faults quickly. From simple battery issues to complex electronic system failures.",
    "serviceType": "Electrical Diagnostics",
    "faqs": [
      {
        "question": "What electrical problems can you diagnose?",
        "answer": "We diagnose all vehicle electrical issues including battery drain, alternator faults, starter motor problems, lighting issues, central locking faults, window and mirror malfunctions, and complex CAN-bus network issues."
      },
      {
        "question": "My car battery keeps going flat \u2013 can you find out why?",
        "answer": "Yes, parasitic drain testing is one of our specialities. We use amp clamps and systematic testing to identify which circuit is draining your battery, whether it's a faulty module, aftermarket accessory, or wiring issue."
      },
      {
        "question": "Can you diagnose problems with my car's infotainment system?",
        "answer": "Yes, we can diagnose issues with head units, speakers, Bluetooth connectivity, reversing cameras, and parking sensors. Some repairs may require specialist coding equipment which we have available."
      },
      {
        "question": "How do you trace electrical faults?",
        "answer": "We use a combination of diagnostic scanners, multimeters, oscilloscopes, and wiring diagrams to systematically trace faults through your vehicle's electrical system. This methodical approach saves time and money."
      },
      {
        "question": "Do you repair wiring harness damage?",
        "answer": "Yes, we can repair damaged wiring, corroded connectors, and chafed cables. For extensive damage, we can source and fit replacement wiring looms where available."
      }
    ]
  },
  "check-engine-light-chesterfield": {
    "type": "service",
    "pageTitle": "Check Engine Light Diagnosis Chesterfield | Warning Light Repair | DP Automotive",
    "description": "Check engine light on? Get fast, accurate diagnosis in Chesterfield. Expert technicians identify the cause and fix the problem. MOT failures resolved. Book your diagnostic today.",
    "h1": "Check Engine Light Diagnosis Chesterfield",
    "intro": "Dashboard warning light causing worry? Don't ignore it \u2013 our expert diagnostic service quickly identifies why your check engine light is on and provides the repairs needed to get it switched off for good.",
    "serviceType": "Check Engine Light Diagnosis",
    "faqs": [
      {
        "question": "Why is my check engine light on?",
        "answer": "The check engine light (or engine management light) illuminates when your car's computer detects an issue affecting emissions or engine performance. Common causes include oxygen sensor faults, catalytic converter issues, spark plugs, or mass airflow sensor problems."
      },
      {
        "question": "Can I pass my MOT with the engine light on?",
        "answer": "No, a vehicle will fail its MOT if the engine management light is illuminated. The light must be off and all emissions-related systems functioning correctly to pass. We can diagnose and repair issues before your MOT."
      },
      {
        "question": "What's the difference between amber and red engine lights?",
        "answer": "An amber/orange engine light means you should get it checked soon but can usually continue driving carefully. A red light or flashing light indicates a serious problem \u2013 reduce speed, avoid heavy acceleration, and get it checked immediately."
      },
      {
        "question": "How quickly can you diagnose my engine light?",
        "answer": "We can usually diagnose the cause of your engine warning light within 30-60 minutes. For complex issues requiring more detailed testing, we'll advise you of the additional time needed."
      },
      {
        "question": "Will the engine light go off after repairs?",
        "answer": "After completing repairs, we clear the fault codes and the light should stay off. If the underlying issue is fully resolved, the light won't return. We always verify repairs before returning your vehicle."
      }
    ]
  },
  "porsche-servicing-chesterfield": {
    "type": "manufacturer",
    "manufacturer": "Porsche",
    "pageTitle": "Expert Porsche Servicing Chesterfield | DP Automotive",
    "description": "Specialist Porsche servicing and repairs in Chesterfield. Our expert technicians provide comprehensive maintenance and diagnostics for all Porsche models.",
    "specialServices": [
      "Flat-Six Engine Specialist Service",
      "PDK Transmission Service",
      "PASM Suspension Service",
      "PCM Infotainment Diagnostics",
      "911 Specialist Maintenance",
      "Cayenne/Macan SUV Service",
      "German Engineering Excellence",
      "Track Day Preparation"
    ],
    "commonIssues": [
      "IMS bearing replacement in certain 911 models",
      "PDK transmission fluid change requirements",
      "Air conditioning system efficiency",
      "Brake system wear from performance driving",
      "Engine oil consumption monitoring",
      "Suspension component wear from sport settings",
      "Cooling system maintenance for track use",
      "Complex electrical system diagnostics"
    ],
    "servicePackages": [
      {
        "name": "Essential Porsche Service",
        "price": "From \u00a3179",
        "interval": "6 months / 6,000 miles",
        "services": [
          "Premium engine oil and filter change",
          "Multi-point inspection",
          "Performance brake assessment",
          "Tyre inspection and rotation",
          "Fluid level checks",
          "Battery and electrical test"
        ]
      },
      {
        "name": "Comprehensive Porsche Service",
        "price": "From \u00a3329",
        "interval": "12 months / 12,000 miles",
        "services": [
          "Everything in Essential Service",
          "Air filter replacement",
          "Cabin filter replacement",
          "PDK transmission service",
          "Coolant system inspection",
          "Porsche diagnostic scan"
        ]
      },
      {
        "name": "Major Porsche Service",
        "price": "From \u00a3549",
        "interval": "24 months / 20,000 miles",
        "services": [
          "Everything in Comprehensive Service",
          "Spark plug replacement",
          "Timing chain inspection",
          "Brake fluid replacement",
          "Performance optimization"
        ]
      }
    ]
  },
  "subaru-servicing-chesterfield": {
    "type": "manufacturer",
    "manufacturer": "Subaru",
    "pageTitle": "Expert Subaru Servicing Chesterfield | DP Automotive",
    "description": "Specialist Subaru servicing and repairs in Chesterfield. Our expert technicians provide comprehensive maintenance and diagnostics for all Subaru models.",
    "specialServices": [
      "Boxer Engine Specialist Service",
      "Symmetrical AWD System Service",
      "EyeSight Safety System Service",
      "CVT Lineartronic Transmission",
      "Subaru Impreza WRX/STI Service",
      "Forester SUV Service",
      "XV Crossover Service",
      "Japanese AWD Expertise"
    ],
    "commonIssues": [
      "Head gasket replacement in older Boxer engines",
      "CVT transmission fluid maintenance requirements",
      "AWD system component wear and maintenance",
      "Oil consumption monitoring in high-performance models",
      "Brake system wear from AWD weight distribution",
      "Cooling system maintenance for Boxer engine layout",
      "Suspension component longevity in AWD models",
      "Turbocharger maintenance in WRX/STI models"
    ],
    "servicePackages": [
      {
        "name": "Basic Subaru Service",
        "price": "From \u00a395",
        "interval": "6 months / 6,000 miles",
        "services": [
          "Boxer engine oil and filter",
          "AWD system inspection",
          "All-terrain tyre check",
          "Fluid level checks",
          "Battery test",
          "EyeSight system check"
        ]
      },
      {
        "name": "Full Subaru Service",
        "price": "From \u00a3165",
        "interval": "12 months / 12,000 miles",
        "services": [
          "Everything in Basic Service",
          "Air filter replacement",
          "Cabin filter replacement",
          "CVT transmission service",
          "Coolant system inspection",
          "Subaru diagnostic scan"
        ]
      },
      {
        "name": "Major Subaru Service",
        "price": "From \u00a3259",
        "interval": "24 months / 24,000 miles",
        "services": [
          "Everything in Full Service",
          "Spark plug replacement",
          "AWD differential service",
          "Performance inspection",
          "Comprehensive diagnostic"
        ]
      }
    ]
  },
  "car-diagnostics-chesterfield": {
    "type": "service",
    "pageTitle": "Car Diagnostics Chesterfield | Expert Vehicle Fault Finding | DP Automotive",
    "description": "Professional car diagnostics in Chesterfield. Fast, accurate fault finding using dealer-level equipment. Engine warning lights, fault codes & performance issues diagnosed. Book today.",
    "h1": "Car Diagnostics Chesterfield",
    "intro": "Warning light on your dashboard? Our expert diagnostic service uses advanced equipment to pinpoint exactly what's wrong with your vehicle. Fast, accurate fault finding at competitive prices.",
    "serviceType": "Car Diagnostics",
    "faqs": [
      {
        "question": "What does car diagnostic testing include?",
        "answer": "Our diagnostic testing uses advanced OBD-II scanners and manufacturer-specific equipment to read fault codes, check sensor data, analyse engine performance, test electronic systems, and identify the root cause of any warning lights or performance issues."
      },
      {
        "question": "How long does a car diagnostic take?",
        "answer": "A basic diagnostic scan takes around 30-45 minutes. More complex issues requiring detailed analysis may take 1-2 hours. We'll always give you a time estimate when you book."
      },
      {
        "question": "How much does car diagnostics cost in Chesterfield?",
        "answer": "Our diagnostic service starts from \u00a345 including a full report. If you proceed with repairs, the diagnostic fee is often deducted from the repair cost. Contact us for a specific quote."
      },
      {
        "question": "Can you diagnose all car makes and models?",
        "answer": "Yes, we have diagnostic equipment for all major manufacturers including BMW, Mercedes, Audi, VW, Ford, Vauxhall, and more. Our technicians are trained on both European and Asian vehicles."
      },
      {
        "question": "What if the diagnostic finds multiple issues?",
        "answer": "We'll provide you with a detailed report prioritising repairs by urgency and safety. You'll receive a full breakdown of costs so you can make an informed decision about which repairs to proceed with."
      }
    ]
  },
  "mazda-servicing-chesterfield": {
    "type": "manufacturer",
    "manufacturer": "Mazda",
    "pageTitle": "Expert Mazda Servicing Chesterfield | DP Automotive",
    "description": "Specialist Mazda servicing and repairs in Chesterfield. Our expert technicians provide comprehensive maintenance and diagnostics for all Mazda models.",
    "specialServices": [
      "SKYACTIV Technology Service",
      "Rotary Engine Specialist Service",
      "MZD Connect Infotainment Service",
      "i-ACTIVSENSE Safety System",
      "MX-5 Roadster Specialist Service",
      "SkyActiv-X Engine Technology",
      "Japanese Engineering Excellence",
      "Zoom-Zoom Performance Service"
    ],
    "commonIssues": [
      "SKYACTIV engine carbon build-up prevention",
      "Manual transmission gear oil requirements",
      "Brake system optimization for driving dynamics",
      "Air conditioning system efficiency",
      "Suspension component longevity",
      "DPF issues in diesel SKYACTIV-D engines",
      "Battery maintenance in newer models",
      "Timing chain maintenance in older models"
    ],
    "servicePackages": [
      {
        "name": "Basic Mazda Service",
        "price": "From \u00a389",
        "interval": "6 months / 6,000 miles",
        "services": [
          "SKYACTIV engine oil and filter",
          "Visual brake inspection",
          "Tyre pressure and tread check",
          "Fluid level checks",
          "Battery test",
          "Light and indicator check"
        ]
      },
      {
        "name": "Full Mazda Service",
        "price": "From \u00a3159",
        "interval": "12 months / 12,000 miles",
        "services": [
          "Everything in Basic Service",
          "Air filter replacement",
          "Cabin filter replacement",
          "Manual transmission fluid check",
          "Coolant system inspection",
          "Mazda diagnostic scan"
        ]
      },
      {
        "name": "Major Mazda Service",
        "price": "From \u00a3249",
        "interval": "24 months / 24,000 miles",
        "services": [
          "Everything in Full Service",
          "Spark plug replacement",
          "Timing chain inspection",
          "Transmission service",
          "Comprehensive diagnostic"
        ]
      }
    ]
  },
  "chevrolet-servicing-chesterfield": {
    "type": "manufacturer",
    "manufacturer": "Chevrolet",
    "pageTitle": "Expert Chevrolet Servicing Chesterfield | DP Automotive",
    "description": "Specialist Chevrolet servicing and repairs in Chesterfield. Our expert technicians provide comprehensive maintenance and diagnostics for all Chevrolet models.",
    "specialServices": [
      "LS V8 Engine Service",
      "Small Block V8 Maintenance",
      "Corvette Specialist Service",
      "Camaro Performance Service",
      "OnStar System Diagnostics",
      "American Automatic Transmission Service",
      "Performance Exhaust System Service",
      "Classic Chevrolet Restoration"
    ],
    "commonIssues": [
      "Transmission fluid maintenance requirements",
      "Engine oil consumption monitoring",
      "Electrical system complexity in modern models",
      "Air conditioning system efficiency",
      "Suspension wear patterns from performance use",
      "Fuel system maintenance for ethanol fuels",
      "Brake system wear from vehicle weight",
      "Cooling system maintenance for V8 engines"
    ],
    "servicePackages": [
      {
        "name": "Basic Chevrolet Service",
        "price": "From \u00a395",
        "interval": "6 months / 6,000 miles",
        "services": [
          "Engine oil and filter change",
          "Visual brake inspection",
          "Tyre pressure and tread check",
          "Fluid level checks",
          "Battery test",
          "Light and indicator check"
        ]
      },
      {
        "name": "Full Chevrolet Service",
        "price": "From \u00a3165",
        "interval": "12 months / 12,000 miles",
        "services": [
          "Everything in Basic Service",
          "Air filter replacement",
          "Cabin filter replacement",
          "Transmission fluid check",
          "Coolant system inspection",
          "Chevrolet diagnostic scan"
        ]
      },
      {
        "name": "Major Chevrolet Service",
        "price": "From \u00a3259",
        "interval": "24 months / 24,000 miles",
        "services": [
          "Everything in Full Service",
          "Spark plug replacement",
          "Transmission service",
          "Suspension inspection",
          "Comprehensive diagnostic"
        ]
      }
    ]
  },
  "aston-martin-servicing-chesterfield": {
    "type": "manufacturer",
    "manufacturer": "Aston Martin",
    "pageTitle": "Expert Aston Martin Servicing Chesterfield | DP Automotive",
    "description": "Specialist Aston Martin servicing and repairs in Chesterfield. Our expert technicians provide comprehensive maintenance and diagnostics for all Aston Martin models.",
    "specialServices": [
      "V12 Engine Specialist Service",
      "V8 Twin-Turbo Maintenance",
      "Carbon Fibre Component Care",
      "Aston Martin Infotainment Service",
      "Bespoke Interior Maintenance",
      "Carbon Ceramic Brake Service",
      "Adaptive Suspension Calibration",
      "British Luxury Car Expertise"
    ],
    "commonIssues": [
      "Complex electrical system diagnostics",
      "Engine carbon build-up in direct injection V12s",
      "Transmission control module calibration",
      "Air conditioning system refrigerant specifications",
      "Brake system wear from high-performance use",
      "Suspension component replacement requirements",
      "Fuel system maintenance for premium fuel",
      "Cooling system optimization for track use"
    ],
    "servicePackages": [
      {
        "name": "Essential Aston Martin Service",
        "price": "From \u00a3229",
        "interval": "6 months / 6,000 miles",
        "services": [
          "Premium engine oil and filter change",
          "Comprehensive vehicle inspection",
          "Brake system assessment",
          "Tyre inspection and rotation",
          "Fluid level checks",
          "Battery and electrical system test"
        ]
      },
      {
        "name": "Comprehensive Aston Martin Service",
        "price": "From \u00a3399",
        "interval": "12 months / 12,000 miles",
        "services": [
          "Everything in Essential Service",
          "High-performance air filter replacement",
          "Cabin filter replacement",
          "Suspension system inspection",
          "Cooling system service",
          "Aston Martin diagnostic scan"
        ]
      },
      {
        "name": "Major Aston Martin Service",
        "price": "From \u00a3649",
        "interval": "24 months / 20,000 miles",
        "services": [
          "Everything in Comprehensive Service",
          "Spark plug replacement",
          "Transmission service",
          "Brake fluid replacement",
          "Complete system diagnostics"
        ]
      }
    ]
  },
  "vauxhall-servicing-chesterfield": {
    "type": "manufacturer",
    "manufacturer": "Vauxhall",
    "pageTitle": "Expert Vauxhall Servicing Chesterfield | DP Automotive",
    "description": "Specialist Vauxhall servicing and repairs in Chesterfield. Our expert technicians provide comprehensive maintenance and diagnostics for all Vauxhall models.",
    "specialServices": [
      "Ecotec Engine Technology Service",
      "CDTi Diesel Engine Service",
      "IntelliLink Infotainment Service",
      "VXR Performance Service",
      "Corsa/Astra Specialist Service",
      "Insignia Executive Service",
      "British Heritage Excellence",
      "FlexRide Suspension Service"
    ],
    "commonIssues": [
      "Timing chain stretch in Ecotec engines",
      "DPF regeneration issues in CDTi diesel engines",
      "EGR valve carbon build-up problems",
      "Clutch wear in manual transmission models",
      "Air conditioning system refrigerant leaks",
      "Electrical system faults and sensor issues",
      "Suspension component wear patterns",
      "Oil consumption monitoring in high-mileage vehicles"
    ],
    "servicePackages": [
      {
        "name": "Basic Vauxhall Service",
        "price": "From \u00a385",
        "interval": "6 months / 6,000 miles",
        "services": [
          "Ecotec engine oil and filter",
          "Visual brake inspection",
          "Tyre pressure and tread check",
          "Fluid level checks",
          "Battery test",
          "Light and indicator check"
        ]
      },
      {
        "name": "Full Vauxhall Service",
        "price": "From \u00a3155",
        "interval": "12 months / 12,000 miles",
        "services": [
          "Everything in Basic Service",
          "Air filter replacement",
          "Cabin filter replacement",
          "Automatic transmission check",
          "Coolant system inspection",
          "Vauxhall diagnostic scan"
        ]
      },
      {
        "name": "Major Vauxhall Service",
        "price": "From \u00a3245",
        "interval": "24 months / 24,000 miles",
        "services": [
          "Everything in Full Service",
          "Spark plug replacement",
          "Timing chain inspection",
          "Transmission service",
          "Comprehensive diagnostic"
        ]
      }
    ]
  },
  "service-vs-mot-difference": {
    "type": "comparison",
    "pageTitle": "What is the Difference Between Service and MOT? | DP Auto Repair",
    "description": "Understand the key differences between car servicing and MOT tests. Expert comparison of purpose, cost, duration and legal requirements. Book both services in Chesterfield.",
    "h1": "What is the Difference Between Service and MOT?",
    "intro": "Understanding the difference between a car service and MOT test is crucial for every vehicle owner. Both are important but serve completely different purposes in keeping your vehicle safe, legal, and running efficiently.",
    "service1Name": "Car Service",
    "service2Name": "MOT Test",
    "showDVLAChecker": true,
    "faqs": [
      {
        "question": "Do I need both a service and MOT?",
        "answer": "Yes, both serve different purposes. An MOT is a legal requirement for roadworthiness, while a service maintains your vehicle's performance and reliability. Many customers book them together for convenience."
      },
      {
        "question": "Can I get my service and MOT done at the same time?",
        "answer": "Absolutely! Many customers prefer to book their service and MOT together. This saves time and often costs less than separate visits. We can identify any MOT issues during the service."
      },
      {
        "question": "What happens if my car fails its MOT?",
        "answer": "If your vehicle fails its MOT, we'll provide a detailed report of the issues. We can usually fix most problems on the same day and perform a free retest within 10 working days."
      },
      {
        "question": "How much does a service cost compared to an MOT?",
        "answer": "An MOT test costs \u00a335-\u00a355, while a full service typically costs \u00a3150-\u00a3400 depending on your vehicle and service level. The service includes parts and labour, while MOT is just the test."
      },
      {
        "question": "Which is more important - service or MOT?",
        "answer": "Both are important but serve different purposes. MOT is legally required for road use, while servicing prevents breakdowns and maintains performance. Skipping either can lead to problems."
      },
      {
        "question": "Can I drive without an MOT certificate?",
        "answer": "No, driving without a valid MOT certificate is illegal and can result in fines up to \u00a31,000. Your insurance may also be invalid. You can only drive to a pre-booked MOT appointment."
      }
    ]
  },
  "skoda-servicing-chesterfield": {
    "type": "manufacturer",
    "manufacturer": "\u0160koda",
    "pageTitle": "Expert \u0160koda Servicing Chesterfield | DP Automotive",
    "description": "Specialist \u0160koda servicing and repairs in Chesterfield. Our expert technicians provide comprehensive maintenance and diagnostics for all \u0160koda models.",
    "specialServices": [
      "TSI Engine Technology Service",
      "DSG Transmission Maintenance",
      "\u0160koda Connect Diagnostics",
      "TDI Diesel Engine Service",
      "Simply Clever Features Service",
      "Octavia RS Performance Service",
      "Superb Executive Service",
      "Czech Engineering Excellence"
    ],
    "commonIssues": [
      "DSG transmission software updates and servicing",
      "Carbon deposits in TSI direct injection engines",
      "DPF blockages in TDI diesel engines",
      "Timing chain tensioner issues in early TSI engines",
      "Air conditioning system refrigerant maintenance",
      "Electrical system sensor faults",
      "Brake disc wear patterns",
      "Oil consumption monitoring in high-mileage vehicles"
    ],
    "servicePackages": [
      {
        "name": "Basic \u0160koda Service",
        "price": "From \u00a389",
        "interval": "6 months / 6,000 miles",
        "services": [
          "Engine oil and filter change",
          "Visual brake inspection",
          "Tyre pressure and tread check",
          "Fluid level checks",
          "Battery test",
          "Light and indicator check"
        ]
      },
      {
        "name": "Full \u0160koda Service",
        "price": "From \u00a3159",
        "interval": "12 months / 10,000 miles",
        "services": [
          "Everything in Basic Service",
          "Air filter replacement",
          "Cabin filter replacement",
          "DSG transmission check",
          "Coolant system inspection",
          "\u0160koda diagnostic scan"
        ]
      },
      {
        "name": "Major \u0160koda Service",
        "price": "From \u00a3249",
        "interval": "24 months / 20,000 miles",
        "services": [
          "Everything in Full Service",
          "Spark plug replacement",
          "Timing chain inspection",
          "Transmission service",
          "Comprehensive diagnostic"
        ]
      }
    ]
  },
  "land-rover-servicing-chesterfield": {
    "type": "manufacturer",
    "manufacturer": "Land Rover",
    "pageTitle": "Expert Land Rover Servicing Chesterfield | DP Automotive",
    "description": "Specialist Land Rover servicing and repairs in Chesterfield. Our expert technicians provide comprehensive maintenance and diagnostics for all Land Rover models.",
    "specialServices": [
      "Terrain Response System Service",
      "Air Suspension Specialist Service",
      "InControl Touch Pro Diagnostics",
      "All-Terrain Progress Control Service",
      "Range Rover Luxury Service",
      "Discovery Off-Road Service",
      "British 4x4 Expertise",
      "Defender Classic & New Service"
    ],
    "commonIssues": [
      "Air suspension system leaks and compressor wear",
      "Terrain Response system calibration",
      "Engine timing chain issues in certain models",
      "Electrical system complexity diagnostics",
      "Brake system wear from vehicle weight",
      "Differential service from off-road use",
      "Cooling system maintenance for towing",
      "Transfer case fluid maintenance"
    ],
    "servicePackages": [
      {
        "name": "Essential Land Rover Service",
        "price": "From \u00a3139",
        "interval": "6 months / 6,000 miles",
        "services": [
          "Premium engine oil and filter change",
          "Air suspension system check",
          "Brake system inspection",
          "All-terrain tyre inspection",
          "Fluid level checks",
          "Electronic system diagnostics"
        ]
      },
      {
        "name": "Comprehensive Land Rover Service",
        "price": "From \u00a3269",
        "interval": "12 months / 12,000 miles",
        "services": [
          "Everything in Essential Service",
          "Air filter replacement",
          "Cabin filter replacement",
          "Transfer case inspection",
          "Coolant system service",
          "Land Rover diagnostic scan"
        ]
      },
      {
        "name": "Major Land Rover Service",
        "price": "From \u00a3429",
        "interval": "24 months / 20,000 miles",
        "services": [
          "Everything in Comprehensive Service",
          "Spark plug replacement",
          "Transmission service",
          "Differential service",
          "Off-road capability check"
        ]
      }
    ]
  },
  "mercedes-servicing-chesterfield": {
    "type": "manufacturer",
    "manufacturer": "Mercedes-Benz",
    "pageTitle": "Expert Mercedes-Benz Servicing Chesterfield | DP Automotive",
    "description": "Specialist Mercedes-Benz servicing and repairs in Chesterfield. Our expert technicians provide comprehensive maintenance and diagnostics for all Mercedes-Benz models.",
    "specialServices": [
      "Mercedes-Benz ASSYST Service Reset",
      "COMAND System Diagnostics",
      "AMG Performance Service",
      "BlueTEC Emissions Service",
      "7G-DCT Transmission Service",
      "AIRMATIC Suspension Service",
      "Mercedes Coding and Programming",
      "AdBlue System Service"
    ],
    "commonIssues": [
      "Air suspension compressor failures in S-Class and E-Class",
      "Oil leaks from engine seals and gaskets",
      "Glow plug failures in diesel models",
      "Electronic issues with COMAND and instrument clusters",
      "Thermostat and coolant system problems",
      "Brake wear sensors and electronic parking brake issues",
      "AdBlue system faults in BlueTEC models",
      "Transmission valve body problems in 7G-DCT gearboxes"
    ],
    "servicePackages": [
      {
        "name": "Mercedes A-Service",
        "price": "From \u00a3149",
        "interval": "12 months / 10,500 miles",
        "services": [
          "Mercedes-Benz engine oil",
          "Oil filter replacement",
          "ASSYST service reset",
          "Visual inspection",
          "Brake fluid level check",
          "AdBlue level check",
          "Tyre pressure check"
        ]
      },
      {
        "name": "Mercedes B-Service",
        "price": "From \u00a3249",
        "interval": "24 months / 21,000 miles",
        "services": [
          "Everything in A-Service",
          "Cabin filter replacement",
          "Brake system inspection",
          "Mercedes diagnostic scan",
          "Battery test",
          "Air filter check",
          "Suspension inspection"
        ]
      },
      {
        "name": "Major Mercedes Service",
        "price": "From \u00a3399",
        "interval": "48 months / 42,000 miles",
        "services": [
          "Everything in B-Service",
          "Spark plug replacement",
          "Air filter replacement",
          "Brake fluid service",
          "Fuel filter service",
          "Transmission service",
          "Comprehensive diagnostics"
        ]
      }
    ]
  },
  "kia-servicing-chesterfield": {
    "type": "manufacturer",
    "manufacturer": "Kia",
    "pageTitle": "Expert Kia Servicing Chesterfield | DP Automotive",
    "description": "Specialist Kia servicing and repairs in Chesterfield. Our expert technicians provide comprehensive maintenance and diagnostics for all Kia models.",
    "specialServices": [
      "Smartstream Engine Technology Service",
      "UVO Connect System Diagnostics",
      "Drive Wise Safety Features Service",
      "DCT Transmission Maintenance",
      "Kia Stinger GT Performance Service",
      "EV6 Electric Vehicle Service",
      "Theta Engine Specialist Service",
      "Korean Engineering Excellence"
    ],
    "commonIssues": [
      "GDI engine carbon deposit prevention",
      "DCT transmission software updates",
      "Engine timing chain maintenance",
      "Air conditioning system efficiency",
      "Brake system longevity optimization",
      "DPF regeneration in diesel variants",
      "Battery health monitoring in hybrids",
      "Suspension component wear patterns"
    ],
    "servicePackages": [
      {
        "name": "Basic Kia Service",
        "price": "From \u00a385",
        "interval": "6 months / 6,000 miles",
        "services": [
          "Engine oil and filter change",
          "Visual brake inspection",
          "Tyre pressure and tread check",
          "Fluid level checks",
          "Battery test",
          "Light and indicator check"
        ]
      },
      {
        "name": "Full Kia Service",
        "price": "From \u00a3155",
        "interval": "12 months / 12,000 miles",
        "services": [
          "Everything in Basic Service",
          "Air filter replacement",
          "Cabin filter replacement",
          "DCT fluid inspection",
          "Coolant system check",
          "Kia diagnostic scan"
        ]
      },
      {
        "name": "Major Kia Service",
        "price": "From \u00a3245",
        "interval": "24 months / 24,000 miles",
        "services": [
          "Everything in Full Service",
          "Spark plug replacement",
          "Timing chain inspection",
          "Transmission service",
          "Comprehensive diagnostic"
        ]
      }
    ]
  },
  "bentley-servicing-chesterfield": {
    "type": "manufacturer",
    "manufacturer": "Bentley",
    "pageTitle": "Expert Bentley Servicing Chesterfield | DP Automotive",
    "description": "Specialist Bentley servicing and repairs in Chesterfield. Our expert technicians provide comprehensive maintenance and diagnostics for all Bentley models.",
    "specialServices": [
      "W12 Engine Specialist Service",
      "V8 Twin-Turbo Maintenance",
      "Air Suspension System Service",
      "Bentley Infotainment Diagnostics",
      "Luxury Interior Care",
      "Carbon Ceramic Brake Service",
      "AWD System Maintenance",
      "Bentley Performance Calibration"
    ],
    "commonIssues": [
      "Air suspension pump failures and leaks",
      "Complex electrical system faults",
      "Engine carbon build-up in direct injection engines",
      "Brake system wear due to vehicle weight",
      "Turbocharger oil feed issues",
      "Cooling system problems in high-performance engines",
      "Transmission control module failures",
      "Premium fuel system maintenance requirements"
    ],
    "servicePackages": [
      {
        "name": "Essential Bentley Service",
        "price": "From \u00a3189",
        "interval": "6 months / 6,000 miles",
        "services": [
          "Premium engine oil and filter change",
          "Multi-point vehicle inspection",
          "Brake system assessment",
          "Tyre inspection and rotation",
          "Fluid level checks",
          "Battery and charging system test"
        ]
      },
      {
        "name": "Comprehensive Bentley Service",
        "price": "From \u00a3349",
        "interval": "12 months / 12,000 miles",
        "services": [
          "Everything in Essential Service",
          "Air filter replacement",
          "Cabin filter replacement",
          "Air suspension inspection",
          "Cooling system service",
          "Bentley diagnostic scan"
        ]
      },
      {
        "name": "Major Bentley Service",
        "price": "From \u00a3549",
        "interval": "24 months / 20,000 miles",
        "services": [
          "Everything in Comprehensive Service",
          "Spark plug replacement",
          "Transmission service",
          "Brake fluid replacement",
          "Comprehensive system diagnostics"
        ]
      }
    ]
  },
  "citroen-servicing-chesterfield": {
    "type": "manufacturer",
    "manufacturer": "Citro\u00ebn",
    "pageTitle": "Expert Citro\u00ebn Servicing Chesterfield | DP Automotive",
    "description": "Specialist Citro\u00ebn servicing and repairs in Chesterfield. Our expert technicians provide comprehensive maintenance and diagnostics for all Citro\u00ebn models.",
    "specialServices": [
      "HDi Diesel Engine Service",
      "Hydropneumatic Suspension Service",
      "EMP2 Platform Diagnostics",
      "Stop/Start System Maintenance",
      "Citro\u00ebn Connect Nav Service",
      "BlueHDi Engine Technology",
      "EAT8 Automatic Transmission Service",
      "Advanced Comfort Suspension"
    ],
    "commonIssues": [
      "DPF blockages in HDi diesel engines",
      "Hydropneumatic suspension sphere failures",
      "Electrical system faults and sensor issues",
      "EGR valve carbon build-up problems",
      "Stop/start system battery failures",
      "Timing belt replacement requirements",
      "Air conditioning refrigerant leaks",
      "Clutch wear in manual transmission models"
    ],
    "servicePackages": [
      {
        "name": "Basic Citro\u00ebn Service",
        "price": "From \u00a385",
        "interval": "6 months / 6,000 miles",
        "services": [
          "Engine oil and filter change",
          "Visual brake inspection",
          "Tyre pressure and tread check",
          "Fluid level checks",
          "Battery test",
          "Light and indicator check"
        ]
      },
      {
        "name": "Full Citro\u00ebn Service",
        "price": "From \u00a3155",
        "interval": "12 months / 12,000 miles",
        "services": [
          "Everything in Basic Service",
          "Air filter replacement",
          "Cabin filter replacement",
          "Brake fluid check",
          "Coolant system inspection",
          "Citro\u00ebn diagnostic scan"
        ]
      },
      {
        "name": "Major Citro\u00ebn Service",
        "price": "From \u00a3245",
        "interval": "24 months / 24,000 miles",
        "services": [
          "Everything in Full Service",
          "Spark plug replacement",
          "Timing belt inspection",
          "Suspension system check",
          "Comprehensive diagnostic"
        ]
      }
    ]
  },
  "hyundai-servicing-chesterfield": {
    "type": "manufacturer",
    "manufacturer": "Hyundai",
    "pageTitle": "Expert Hyundai Servicing Chesterfield | DP Automotive",
    "description": "Specialist Hyundai servicing and repairs in Chesterfield. Our expert technicians provide comprehensive maintenance and diagnostics for all Hyundai models.",
    "specialServices": [
      "GDI Engine Technology Service",
      "Blue Link Connectivity Service",
      "SmartSense Safety System Diagnostics",
      "DCT Transmission Service",
      "Hyundai N Performance Service",
      "Hybrid/Electric Vehicle Service",
      "Theta Engine Maintenance",
      "Korean Engineering Expertise"
    ],
    "commonIssues": [
      "GDI engine carbon build-up prevention",
      "DCT transmission fluid maintenance",
      "Engine timing chain maintenance",
      "Air conditioning system efficiency",
      "Suspension component longevity",
      "DPF regeneration in diesel models",
      "Battery maintenance in hybrid models",
      "Brake system wear patterns"
    ],
    "servicePackages": [
      {
        "name": "Basic Hyundai Service",
        "price": "From \u00a385",
        "interval": "6 months / 6,000 miles",
        "services": [
          "Engine oil and filter change",
          "Visual brake inspection",
          "Tyre pressure and tread check",
          "Fluid level checks",
          "Battery test",
          "Light and indicator check"
        ]
      },
      {
        "name": "Full Hyundai Service",
        "price": "From \u00a3155",
        "interval": "12 months / 12,000 miles",
        "services": [
          "Everything in Basic Service",
          "Air filter replacement",
          "Cabin filter replacement",
          "DCT fluid check",
          "Coolant system inspection",
          "Hyundai diagnostic scan"
        ]
      },
      {
        "name": "Major Hyundai Service",
        "price": "From \u00a3245",
        "interval": "24 months / 24,000 miles",
        "services": [
          "Everything in Full Service",
          "Spark plug replacement",
          "Timing chain inspection",
          "Transmission service",
          "Comprehensive diagnostic"
        ]
      }
    ]
  },
  "remapping-guide": {
    "type": "informational",
    "pageTitle": "Car Remapping Guide - Everything You Need to Know About ECU Tuning",
    "description": "Complete guide to car remapping and ECU tuning. Learn about the benefits, process, and considerations for vehicle performance enhancement in Chesterfield. Sp...",
    "h1": "Car Remapping Guide",
    "intro": "Car remapping, also known as ECU tuning, is the process of modifying your vehicle's engine control unit to optimize performance, fuel efficiency, and driving characteristics.",
    "mainContent": [
      {
        "title": "What is Car Remapping?",
        "content": "Car remapping involves modifying the software in your vehicle's ECU (Engine Control Unit) to alter various parameters such as fuel injection, ignition timing, and turbo boost pressure to improve performance."
      },
      {
        "title": "Types of Remaps Available",
        "content": "There are several types of remaps: Stage 1 (basic software optimization), Stage 2 (software + hardware modifications), Economy remaps (focused on fuel savings), and Performance remaps (maximum power gains)."
      },
      {
        "title": "Is Remapping Safe for Your Car?",
        "content": "When performed by qualified professionals using quality equipment and conservative parameters, remapping is safe and reliable. We ensure all modifications stay within safe operating limits."
      },
      {
        "title": "Legal Considerations",
        "content": "Remapping is legal in the UK, but you must inform your insurance company of any modifications. We provide certificates for insurance purposes and can offer warranty-friendly solutions."
      }
    ],
    "faqs": [
      {
        "question": "How much power gain can I expect?",
        "answer": "Power gains typically range from 15-35% depending on your vehicle. Turbocharged engines generally see larger gains than naturally aspirated engines."
      },
      {
        "question": "Will remapping affect my warranty?",
        "answer": "We offer warranty-friendly remaps that can be undetected by dealers. We also provide switching devices that allow you to return to stock settings."
      },
      {
        "question": "How long does the remapping process take?",
        "answer": "Most remaps take 2-4 hours to complete, including diagnostics, file modification, installation, and road testing."
      },
      {
        "question": "Can any car be remapped?",
        "answer": "Most modern vehicles with ECUs can be remapped. We'll assess your specific vehicle to determine the best approach and potential gains."
      }
    ]
  },
  "how-long-mot-takes": {
    "type": "informational",
    "pageTitle": "How Long Does an MOT Take? | Complete Duration Guide | DP Auto Repair",
    "description": "Find out exactly how long an MOT test takes. Typical duration is 45-60 minutes, but factors affecting timing explained. Book your MOT in Chesterfield today.",
    "h1": "How Long Does an MOT Take?",
    "intro": "Planning your MOT appointment? Most MOT tests take 45-60 minutes, but the exact duration depends on your vehicle type and condition. Here's everything you need to know about MOT test timing.",
    "mainContent": [
      {
        "title": "How Long Does a Standard MOT Take?",
        "content": "A standard MOT test typically takes between 30 to 60 minutes for most vehicles. This timeframe assumes your vehicle is in good condition with no significant issues that require immediate attention during the test.",
        "points": [
          "Cars: 45-60 minutes average",
          "Motorcycles: 30-45 minutes",
          "Light commercial vehicles: 60-90 minutes",
          "Booking slot includes preparation time",
          "No major repairs needed during test",
          "All required documentation ready"
        ]
      },
      {
        "title": "Factors That Affect MOT Duration",
        "content": "Several factors can influence how long your MOT test takes. Understanding these can help you plan your day and avoid unexpected delays.",
        "points": [
          "Vehicle condition and age",
          "Previous maintenance history",
          "Garage workload and scheduling",
          "Number of advisories identified",
          "Minor repairs completed during test",
          "Retesting requirements"
        ]
      }
    ],
    "showDVLAChecker": true,
    "faqs": [
      {
        "question": "How long should I expect to wait for my MOT?",
        "answer": "Most MOT tests take 45-60 minutes. However, we recommend allowing 1-2 hours in case any minor issues need addressing. You're welcome to wait in our customer area or we can call you when ready."
      },
      {
        "question": "Can I get my MOT done while I wait?",
        "answer": "Yes, absolutely! Most MOTs are completed while you wait. We have a comfortable waiting area with refreshments."
      }
    ]
  },
  "how-long-service-takes": {
    "type": "informational",
    "pageTitle": "How Long Does a Car Service Take? | Service Duration Guide | DP Auto Repair",
    "description": "Learn exactly how long car services take. Basic services: 1-2 hours, Full services: 3-4 hours. Expert service timing guide with booking tips in Chesterfield.",
    "h1": "How Long Does a Car Service Take?",
    "intro": "Wondering how long your car service will take? Service duration varies from 1-2 hours for basic maintenance to 4-6 hours for comprehensive major services. Here's your complete guide to car service timing.",
    "mainContent": [
      {
        "title": "How Long Does a Car Service Take?",
        "content": "The duration of a car service varies significantly depending on the type of service, your vehicle's condition, and any additional work required. Service times range from 1 hour for a basic oil change to a full day for comprehensive major services.",
        "points": [
          "Basic/Oil Service: 1-2 hours",
          "Interim Service: 2-3 hours",
          "Full Service: 3-4 hours",
          "Major Service: 4-6 hours",
          "Additional repairs: As required",
          "Complex diagnostics: Extra time needed"
        ]
      },
      {
        "title": "Factors That Affect Service Duration",
        "content": "Several factors can influence how long your service takes. Understanding these helps you plan your day and set realistic expectations for collection time.",
        "points": [
          "Vehicle age and condition",
          "Service history and maintenance",
          "Additional repairs identified",
          "Parts availability",
          "Garage workload on the day",
          "Complexity of diagnostic issues"
        ]
      }
    ],
    "faqs": [
      {
        "question": "How long should I expect my car service to take?",
        "answer": "A basic service takes 1-2 hours, while a full service typically requires 3-4 hours. Major services can take up to 6 hours. We'll give you an accurate timeframe when you book based on your vehicle and service type."
      },
      {
        "question": "Can I wait while my car is being serviced?",
        "answer": "For basic and interim services (1-3 hours), many customers choose to wait. For longer services, we recommend dropping your vehicle off and collecting later."
      }
    ]
  },
  "when-mot-due": {
    "type": "informational",
    "pageTitle": "When is My Car Due its MOT? | Check MOT Due Date | DP Auto Repair",
    "description": "Find out when your car MOT is due. Use our DVLA checker tool or learn how to check your MOT expiry date. Book MOT test in Chesterfield.",
    "h1": "When is My Car Due its MOT?",
    "intro": "Never miss your MOT deadline again. Use our tools and guidance to check when your MOT is due and book your test in advance.",
    "mainContent": [
      {
        "title": "How to Check When Your MOT is Due",
        "content": "There are several ways to check your MOT due date. The most reliable method is using the official DVLA online service or checking your current MOT certificate.",
        "points": [
          "Check current MOT certificate",
          "Use DVLA online checker",
          "Look at your V5C registration document",
          "Contact your garage",
          "Check MOT history online",
          "Set calendar reminders"
        ]
      }
    ],
    "showDVLAChecker": true,
    "faqs": [
      {
        "question": "How do I check my MOT due date?",
        "answer": "You can check your MOT due date using the government's online MOT history service, your current MOT certificate, or your V5C registration document."
      }
    ]
  },
  "when-change-timing-belt": {
    "type": "informational",
    "pageTitle": "When to Change Timing Belt | Replacement Intervals Guide | DP Auto Repair",
    "description": "Learn when to change your timing belt to prevent engine damage. Replacement intervals 60k-100k miles. Expert timing belt service in Chesterfield with competitive pricing.",
    "h1": "When to Change Timing Belt",
    "intro": "Timing belt replacement is critical preventive maintenance that protects your engine from catastrophic damage. Most timing belts need replacement every 60,000-100,000 miles or 5-7 years, whichever comes first.",
    "mainContent": [
      {
        "title": "When Should You Change Your Timing Belt?",
        "content": "Timing belt replacement is one of the most critical maintenance procedures for your vehicle. Most timing belts need replacement between 60,000 and 100,000 miles, but the exact interval depends on your vehicle make, model, and driving conditions.",
        "points": [
          "Follow manufacturer's service schedule",
          "Check every 60,000 miles minimum",
          "Replace every 5-7 years regardless of mileage",
          "Consider driving conditions and usage",
          "Don't wait for symptoms to appear",
          "Replace water pump simultaneously"
        ]
      },
      {
        "title": "Manufacturer Timing Belt Intervals",
        "content": "Different manufacturers specify varying timing belt replacement intervals. These recommendations are based on extensive testing and should be followed to prevent catastrophic engine damage.",
        "points": [
          "Ford: 60,000-100,000 miles",
          "Audi/VW: 60,000-80,000 miles",
          "BMW: 60,000-100,000 miles",
          "Toyota: 60,000-90,000 miles",
          "Honda: 60,000-105,000 miles",
          "Vauxhall: 40,000-100,000 miles"
        ]
      }
    ],
    "faqs": [
      {
        "question": "How do I know when my timing belt needs changing?",
        "answer": "Check your vehicle's service book for the manufacturer's recommended interval, typically 60,000-100,000 miles."
      },
      {
        "question": "What happens if I don't change my timing belt on time?",
        "answer": "If your timing belt breaks, it can cause severe engine damage costing £2,000-£5,000+ to repair."
      }
    ]
  },
  "what-is-car-remapping": {
    "type": "informational",
    "pageTitle": "What is Car Remapping? Complete Guide to ECU Tuning Explained",
    "description": "Understand what car remapping is, how it works, and the benefits. Complete guide to ECU tuning and performance optimization in Chesterfield. Specialist autom...",
    "h1": "What is Car Remapping?",
    "intro": "Car remapping is the process of updating or modifying the software within your vehicle's Engine Control Unit (ECU) to alter various engine parameters and unlock improved performance, efficiency, or both.",
    "mainContent": [
      {
        "title": "How Does Car Remapping Work?",
        "content": "The ECU controls various engine functions using pre-programmed maps. Remapping involves reading the original software, modifying these maps to optimize performance parameters, and writing the new software back to the ECU."
      },
      {
        "title": "What Parameters Are Modified?",
        "content": "During remapping, we adjust fuel injection timing, ignition timing, turbo boost pressure, air-fuel ratios, and other critical parameters to optimize your engine's performance within safe operating limits."
      }
    ],
    "faqs": [
      {
        "question": "Is car remapping the same as chip tuning?",
        "answer": "Modern remapping is done via the OBD port, while older 'chip tuning' involved physically replacing chips. Today's process is much more sophisticated and reversible."
      },
      {
        "question": "Will remapping damage my engine?",
        "answer": "When done professionally with conservative parameters, remapping is safe."
      }
    ]
  },
  "mot-retest": {
    "type": "informational",
    "pageTitle": "MOT Retest Guide | Free Retest Within 10 Days | DP Auto Repair Chesterfield",
    "description": "Complete guide to MOT retests. Free retest within 10 working days of failure. Quick 15-30 minute process. Expert MOT repairs and retests in Chesterfield.",
    "h1": "MOT Retest",
    "intro": "Failed your MOT? Don't worry - you're entitled to a free retest within 10 working days. Most retests take just 15-30 minutes and have a very high success rate when repairs are completed properly.",
    "mainContent": [
      {
        "title": "What is an MOT Retest?",
        "content": "An MOT retest is required when your vehicle fails its initial MOT test. The good news is that if repairs are completed within 10 working days, the retest is completely free of charge for the items that originally failed.",
        "points": [
          "Free retest within 10 working days",
          "Only failed items are re-examined",
          "Same testing station must perform retest",
          "Original failure certificate required",
          "Quick 15-30 minute procedure",
          "High success rate after proper repairs"
        ]
      }
    ],
    "showDVLAChecker": true,
    "faqs": [
      {
        "question": "How long do I have for a free MOT retest?",
        "answer": "You have 10 working days from the date of your MOT test failure to complete repairs and book a free retest."
      }
    ]
  },
  "mot-and-service": {
    "type": "informational",
    "pageTitle": "MOT and Service Together | Save Time & Money | DP Auto Repair Chesterfield",
    "description": "Book MOT and service together to save up to £50. Convenient single appointment, expert service, same-day completion. Combined MOT and service packages in Chesterfield.",
    "h1": "MOT and Service",
    "intro": "Save time, money, and hassle by booking your MOT and service together. Our combined packages offer excellent value with savings up to £50, plus the convenience of completing both in a single appointment.",
    "mainContent": [
      {
        "title": "MOT and Service Together - The Smart Choice",
        "content": "Combining your MOT test with a car service is the most convenient and cost-effective way to maintain your vehicle.",
        "points": [
          "Save up to £50 on combined bookings",
          "Single appointment convenience",
          "Identify potential MOT issues early",
          "Comprehensive vehicle health check"
        ]
      }
    ],
    "showDVLAChecker": true,
    "faqs": [
      {
        "question": "Is it cheaper to book MOT and service together?",
        "answer": "Yes, you can save up to £50 by booking MOT and service together."
      }
    ]
  },
  "brake-disc-lifespan": {
    "type": "informational",
    "pageTitle": "How Long Should Brake Discs Last? | Brake Disc Lifespan Guide | DP Auto Repair",
    "description": "Learn how long brake discs should last (50k-70k miles average), warning signs of wear, and factors affecting lifespan. Expert brake disc service in Chesterfield.",
    "h1": "How Long Should Brake Discs Last?",
    "intro": "Brake discs typically last 50,000-70,000 miles under normal conditions, but several factors affect their lifespan.",
    "mainContent": [
      {
        "title": "How Long Should Brake Discs Last?",
        "content": "Brake discs typically last between 50,000 and 70,000 miles under normal driving conditions.",
        "points": [
          "Standard discs: 50,000-70,000 miles",
          "Performance discs: 30,000-50,000 miles",
          "City driving: Shorter lifespan due to frequent braking"
        ]
      }
    ],
    "faqs": [
      {
        "question": "How do I know if my brake discs need replacing?",
        "answer": "Look for visible scoring or grooves on the disc surface, listen for grinding noises when braking, and feel for vibration through the steering wheel."
      }
    ]
  },
  "mot-due-date-checker": {
    "type": "informational",
    "pageTitle": "MOT Due Date Checker - Check When Your Car's MOT Expires",
    "description": "Find out when your vehicle's MOT is due with our free MOT due date checker. Get reminders and book your MOT test in Chesterfield.",
    "h1": "MOT Due Date Checker",
    "intro": "Keep track of your vehicle's MOT expiry date and ensure you never miss your annual test. Our MOT due date checker helps you stay road legal and avoid penalties.",
    "mainContent": [
      {
        "title": "How to Check Your MOT Due Date",
        "content": "Your MOT due date is exactly one year from your last MOT test date. You can check this by looking at your MOT certificate or searching the DVLA database online."
      }
    ],
    "faqs": [
      {
        "question": "How far in advance can I take my MOT?",
        "answer": "You can take your MOT test up to one month before the due date without losing any time from your certificate."
      }
    ]
  },
  "local-mot-garage": {
    "type": "informational",
    "pageTitle": "Local MOT Garage Chesterfield - Professional MOT Testing Centre",
    "description": "Your trusted local MOT garage in Chesterfield. Professional MOT testing with experienced technicians. Book your MOT test today.",
    "h1": "Local MOT Garage Chesterfield",
    "intro": "When you need a reliable local MOT garage in Chesterfield, DP Auto Repair & Diagnostics provides professional MOT testing services with qualified technicians and modern equipment.",
    "mainContent": [
      {
        "title": "Why Choose Our Local MOT Garage?",
        "content": "As your local MOT garage in Chesterfield, we offer convenient booking, competitive pricing, and honest assessments. Our qualified technicians ensure your vehicle meets all legal requirements."
      }
    ],
    "faqs": [
      {
        "question": "How long does an MOT test take?",
        "answer": "A standard MOT test typically takes around 45-60 minutes."
      }
    ]
  },
  "car-remap": {
    "type": "service",
    "pageTitle": "Car Remap Chesterfield - Professional ECU Remapping Services",
    "description": "Expert car remap services in Chesterfield. Increase power, improve fuel economy, and enhance performance with our professional ECU remapping.",
    "h1": "Car Remap Chesterfield",
    "intro": "Expert car remap services in Chesterfield. Increase power, improve fuel economy, and enhance performance with our professional ECU remapping.",
    "serviceType": "Car Remapping",
    "features": [
      "Custom ECU remapping",
      "Stage 1 & 2 performance",
      "Economy tuning",
      "Full vehicle diagnostics",
      "Safe power increases"
    ],
    "faqs": [
      {
        "question": "What is car remapping?",
        "answer": "Car remapping involves modifying the software in your vehicle's ECU to optimize engine performance, fuel efficiency, and driving characteristics."
      }
    ]
  },
  "car-garages-chesterfield": {
    "type": "informational",
    "pageTitle": "Car Garages Chesterfield - Professional Auto Repair Services",
    "description": "Trusted car garages in Chesterfield offering comprehensive auto repair, servicing, MOT testing, and diagnostics. Professional mechanics you can rely on.",
    "h1": "Car Garages Chesterfield",
    "intro": "Trusted car garages in Chesterfield offering comprehensive auto repair, servicing, MOT testing, and diagnostics. Professional mechanics you can rely on.",
    "mainContent": [
      {
        "title": "Why Choose Our Car Garage?",
        "content": "As a leading car garage in Chesterfield, we offer a full range of automotive services including MOT testing, vehicle servicing, diagnostics, and repairs."
      }
    ],
    "faqs": [
      {
        "question": "What services do you offer?",
        "answer": "We offer comprehensive automotive services including MOT testing, vehicle servicing, diagnostics, brake repairs, and more."
      }
    ]
  }
};
