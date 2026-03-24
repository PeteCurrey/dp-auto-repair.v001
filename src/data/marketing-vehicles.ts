export interface VehicleContent {
  slug: string;
  make: string;
  h1: string;
  title: string;
  description: string;
  keywords: string;
  popularModels: string[];
  commonIssues: string[];
  intro?: string;
}

export const marketingVehicles: Record<string, VehicleContent> = {
  "ford": {
    slug: "ford",
    make: "Ford",
    h1: "Ford Specialist Garage in Chesterfield",
    title: "Ford Specialist Chesterfield | Service, Repairs & Diagnostics",
    description: "Expert Ford specialist in Chesterfield. Fiesta, Focus, Transit and more. Manufacturer-standard servicing, genuine parts, and dealer-level diagnostics.",
    keywords: "Ford specialist Chesterfield, Ford service Chesterfield, Ford Focus service Chesterfield, Ford Fiesta repairs Chesterfield",
    popularModels: ["Fiesta", "Focus", "Ka", "Mondeo", "Kuga", "EcoSport", "Puma", "Transit", "Transit Connect"],
    commonIssues: [
      "PowerShift dual-clutch transmission issues (Focus/Fiesta)",
      "EcoBoost turbo and intercooler problems",
      "Cam belt replacement intervals (Fiesta 1.25/1.4)",
      "DPF issues on Focus/Mondeo TDCi",
      "Timing chain stretch on 1.0 EcoBoost"
    ]
  },
  "vauxhall": {
    slug: "vauxhall",
    make: "Vauxhall",
    h1: "Vauxhall Specialist Garage in Chesterfield",
    title: "Vauxhall Specialist Chesterfield | Service & Repairs",
    description: "Professional Vauxhall specialist in Chesterfield. Expert Corsa, Astra and Insignia repairs. Engine diagnostics and warranty-safe servicing.",
    keywords: "Vauxhall service Chesterfield, Vauxhall Corsa repairs Chesterfield, Vauxhall Astra service Chesterfield",
    popularModels: ["Corsa", "Astra", "Insignia", "Mokka", "Zafira", "Vivaro"],
    commonIssues: [
      "Timing chain wear on 1.6 CDTI and 2.0 CDTI",
      "EGR valve failure on diesel models",
      "Astra J throttle body issues",
      "Corsa heater fan resistor",
      "Mokka B wheel bearing failures"
    ]
  },
  "volkswagen": {
    slug: "volkswagen",
    make: "Volkswagen",
    h1: "VW Specialist Garage in Chesterfield | Independent VW Repairs",
    title: "VW Specialist Chesterfield | Independent Volkswagen Garage",
    description: "Independent VW specialist in Chesterfield. Golf, Polo and Tiguan servicing, DSG gearbox repairs, and expert engine diagnostics for all VW models.",
    keywords: "VW specialist Chesterfield, Volkswagen Golf service Chesterfield, independent VW garage Chesterfield",
    popularModels: ["Golf", "Polo", "Passat", "Tiguan", "T-Roc", "Transporter", "Caddy"],
    commonIssues: [
      "DSG gearbox servicing and mechatronic unit",
      "DQ200 dry clutch shudder on 7-speed DSG",
      "Timing chain on EA888 engines",
      "DPF issues on TDI",
      "Water pump failures on 2.0 TDI",
      "ABS pump failure"
    ]
  },
  "bmw": {
    slug: "bmw",
    make: "BMW",
    h1: "BMW Specialist Garage in Chesterfield | Independent BMW Repairs",
    title: "BMW Specialist Chesterfield | Independent BMW Service",
    description: "Independent BMW specialist in Chesterfield. Expert N47 timing chain repairs, engine diagnostics, and manufacturer-standard servicing for all BMW models.",
    keywords: "BMW specialist Chesterfield, BMW service Chesterfield, independent BMW garage Chesterfield, BMW diagnostics Chesterfield",
    popularModels: ["1 Series", "3 Series", "5 Series", "X1", "X3", "X5", "Mini"],
    commonIssues: [
      "Timing chain rattle on N47 diesel engine",
      "HPFP failure on 3.0 diesel",
      "Swirl flap failure",
      "Oil leaks (rocker cover, sump gasket)",
      "EGR and DPF issues",
      "Battery registration requirement after replacement"
    ]
  },
  "audi": {
    slug: "audi",
    make: "Audi",
    h1: "Audi Specialist Garage in Chesterfield | Independent Audi Repairs",
    title: "Audi Specialist Chesterfield | Independent Audi Service",
    description: "Independent Audi specialist in Chesterfield. TFSI and TDI engine diagnostics, S-Tronic gearbox servicing, and expert timing chain replacement.",
    keywords: "Audi specialist Chesterfield, Audi A3 service Chesterfield, independent Audi garage Chesterfield",
    popularModels: ["A1", "A3", "A4", "A5", "A6", "Q3", "Q5", "TT"],
    commonIssues: [
      "Timing chain (2.0 TFSI and 1.8 TFSI)",
      "DSG/S-Tronic servicing",
      "DPF issues on TDI engines",
      "Oil consumption on TFSI engines",
      "Front diff issues on Quattro",
      "Carbon build-up on direct injection engines"
    ]
  },
  "mercedes": {
    slug: "mercedes",
    make: "Mercedes-Benz",
    h1: "Mercedes Specialist Garage in Chesterfield | Independent Mercedes Repairs",
    title: "Mercedes Specialist Chesterfield | Independent Service",
    description: "Independent Mercedes specialist in Chesterfield. Expert CDI engine diagnostics, 7G-Tronic gearbox servicing, and manufacturer-standard maintenance.",
    keywords: "Mercedes specialist Chesterfield, Mercedes service Chesterfield, independent Mercedes garage Chesterfield",
    popularModels: ["A Class", "C Class", "E Class", "GLA", "GLC", "Sprinter", "Vito"],
    commonIssues: [
      "DPF issues on CDI diesels",
      "Gearbox conductor plate issues (722.9 7G-Tronic)",
      "Timing chain on M271 and M272 petrol engines",
      "Air suspension on E/S Class",
      "Balance shaft wear on 2.1 CDI",
      "Battery registration requirement"
    ]
  },
  "renault": {
    slug: "renault",
    make: "Renault",
    h1: "Renault Specialist Garage in Chesterfield",
    title: "Renault Specialist Chesterfield | Service & Diagnostics",
    description: "Expert Renault specialist in Chesterfield. dCi engine diagnostics, EGR valve replacement, and timing belt services for Clio, Megane and Captur.",
    keywords: "Renault service Chesterfield, Renault Clio repairs Chesterfield, Renault diagnostics Chesterfield",
    popularModels: ["Clio", "Megane", "Captur", "Kadjar", "Trafic", "Master"],
    commonIssues: [
      "EGR valve on dCi diesels",
      "DPF blockage on city-driven dCi engines",
      "Timing belt service intervals",
      "Dual-clutch EDC gearbox issues on Clio/Captur",
      "Injector issues on 1.5 dCi"
    ]
  },
  "peugeot": {
    slug: "peugeot",
    make: "Peugeot",
    h1: "Peugeot Specialist Garage in Chesterfield",
    title: "Peugeot Specialist Chesterfield | Service & Repairs",
    description: "Professional Peugeot specialist in Chesterfield. HDi engine diagnostics and DPF cleaning. Expert 208, 308 and Partner maintenance.",
    keywords: "Peugeot service Chesterfield, Peugeot repairs Chesterfield",
    popularModels: ["208", "308", "3008", "5008", "Partner", "Boxer"],
    commonIssues: [
      "EGR and DPF issues on HDi diesels",
      "Clutch actuator on automated manual gearboxes",
      "Power steering pump on 2.0 HDi",
      "Suspension top mounts",
      "Glow plug issues"
    ]
  },
  "nissan": {
    slug: "nissan",
    make: "Nissan",
    h1: "Nissan Specialist Garage in Chesterfield",
    title: "Nissan Specialist Chesterfield | Service & Diagnostics",
    description: "Expert Nissan specialist in Chesterfield. Qashqai and Juke dCi diagnostics, CVT gearbox servicing, and turbocharger repairs.",
    keywords: "Nissan service Chesterfield, Nissan Qashqai repairs Chesterfield, Nissan diagnostics Chesterfield",
    popularModels: ["Micra", "Juke", "Qashqai", "Leaf", "Note", "Navara"],
    commonIssues: [
      "DPF on 1.5 and 2.0 dCi",
      "Nissan Qashqai cam chain noise",
      "CVT transmission service",
      "Juke turbocharger oil feed pipe",
      "Navara diesel injector issues"
    ]
  },
  "toyota": {
    slug: "toyota",
    make: "Toyota",
    h1: "Toyota & Lexus Specialist Garage in Chesterfield",
    title: "Toyota Specialist Chesterfield | Hybrid Service & Repair",
    description: "Specialist Toyota and Lexus garage in Chesterfield. Hybrid Synergy Drive specialists, Prius battery health checks, and D-4D diesel servicing.",
    keywords: "Toyota service Chesterfield, Toyota Prius repairs Chesterfield, Toyota hybrid service Chesterfield",
    popularModels: ["Yaris", "Auris", "Corolla", "RAV4", "Prius", "Hilux", "Land Cruiser"],
    commonIssues: [
      "Hybrid battery health check (Prius/Auris Hybrid)",
      "Water pump on 1.4 D-4D",
      "Injector seal leak on D-4D engines",
      "EGR carbon build-up on diesel models",
      "Prius inverter coolant pump"
    ]
  },
  "honda": {
    slug: "honda",
    make: "Honda",
    h1: "Honda Specialist Garage in Chesterfield",
    title: "Honda Specialist Chesterfield | Service & Repairs",
    description: "Independent Honda specialist in Chesterfield. i-DTEC timing chain inspection, CVT fluid changes, and expert Civic and CR-V maintenance.",
    keywords: "Honda service Chesterfield, Honda Civic repairs Chesterfield",
    popularModels: ["Civic", "Jazz", "CR-V", "HR-V", "Accord"],
    commonIssues: [
      "Timing chain on 2.2 iDTEC diesel",
      "Honda CR-V diesel particulate filter",
      "Jazz 1.4 cam chain tensioner noise",
      "Power steering rack on older Civics",
      "Clutch wear on manual models"
    ]
  },
  "hyundai": {
    slug: "hyundai",
    make: "Hyundai",
    h1: "Hyundai Specialist Garage in Chesterfield",
    title: "Hyundai Specialist Chesterfield | Service & Diagnostics",
    description: "Professional Hyundai specialist in Chesterfield. GDI engine diagnostics and dual-clutch transmission servicing for i30 and Tucson.",
    keywords: "Hyundai service Chesterfield, Hyundai repairs Chesterfield",
    popularModels: ["i10", "i20", "i30", "Tucson", "Santa Fe", "Ioniq"],
    commonIssues: [
      "i20/i30 timing belt replacement intervals",
      "Clutch wear on dual-clutch models",
      "Tucson petrol engine GDI carbon build-up",
      "Ioniq hybrid battery check"
    ]
  },
  "kia": {
    slug: "kia",
    make: "Kia",
    h1: "Kia Specialist Garage in Chesterfield",
    title: "Kia Specialist Chesterfield | Service & Repairs",
    description: "Expert Kia specialist in Chesterfield. Sportage and Niro maintenance and diagnostics. Comprehensive warranty-safe servicing for all Kia models.",
    keywords: "Kia service Chesterfield, Kia Sportage repairs Chesterfield",
    popularModels: ["Picanto", "Rio", "Ceed", "Sportage", "Sorento", "Niro"],
    commonIssues: [
      "Timing belt intervals on older petrol engines",
      "Sportage clutch and DMF",
      "Theta II engine bearing issues",
      "Niro hybrid inverter coolant pump"
    ]
  },
  "skoda": {
    slug: "skoda",
    make: "Skoda",
    h1: "Skoda Specialist Garage in Chesterfield | Independent Skoda Repairs",
    title: "Skoda Specialist Chesterfield | Independent Skoda Service",
    description: "Independent Skoda specialist in Chesterfield. Expert DSG gearbox servicing, timing chain repairs, and TDI diagnostics for Fabia and Octavia.",
    keywords: "Skoda specialist Chesterfield, Skoda service Chesterfield, independent Skoda garage Chesterfield",
    popularModels: ["Fabia", "Octavia", "Superb", "Karoq", "Kodiaq"],
    commonIssues: [
      "DSG gearbox servicing",
      "Timing chain on 1.4 TSI and 2.0 TDI",
      "DPF issues on TDI engines",
      "Water pump failures",
      "Cam chain on older 1.9 TDI"
    ]
  },
  "seat": {
    slug: "seat",
    make: "SEAT",
    h1: "SEAT Specialist Garage in Chesterfield",
    title: "SEAT Specialist Chesterfield | Service & Repairs",
    description: "Professional SEAT specialist in Chesterfield. Independent Leon and Ibiza servicing, TSI timing chain repairs, and DSG gearbox maintenance.",
    keywords: "SEAT service Chesterfield, SEAT Leon repairs Chesterfield",
    popularModels: ["Ibiza", "Leon", "Ateca", "Arona", "Tarraco"],
    commonIssues: [
      "DSG gearbox servicing",
      "DPF issues on TDI engines",
      "Timing chain on TSI/TDI",
      "EGR issues on TDI",
      "Clutch wear on manual models"
    ]
  },
  "citroen": {
    slug: "citroen",
    make: "Citroen",
    h1: "Citroen Specialist Garage in Chesterfield",
    title: "Citroen Specialist Chesterfield | Service & Repairs",
    description: "Expert Citroen specialist in Chesterfield. HDi engine diagnostics and suspension repairs. Specialist Berlingo and C3 maintenance.",
    keywords: "Citroen service Chesterfield, Citroen repairs Chesterfield",
    popularModels: ["C1", "C3", "C4", "Berlingo", "Dispatch", "Relay"],
    commonIssues: [
      "EGR and DPF on HDi diesels",
      "Clutch actuator on automated manual gearboxes",
      "Suspension top strut mounts",
      "Power steering pump",
      "Glow plug issues"
    ]
  },
  "fiat": {
    slug: "fiat",
    make: "Fiat",
    h1: "Fiat Specialist Garage in Chesterfield",
    title: "Fiat Specialist Chesterfield | Service & Repairs",
    description: "Professional Fiat specialist in Chesterfield. Multijet engine timing belt replacement and EGR repairs for Fiat 500 and Ducato.",
    keywords: "Fiat service Chesterfield, Fiat 500 repairs Chesterfield",
    popularModels: ["500", "Punto", "Tipo", "Doblo", "Ducato"],
    commonIssues: [
      "Timing belt on 1.3 Multijet",
      "Turbo oil feed on 1.3 Multijet",
      "Cam belt failure risk",
      "EGR on Multijet engines",
      "Ducato gearbox issues"
    ]
  },
  "volvo": {
    slug: "volvo",
    make: "Volvo",
    h1: "Volvo Specialist Garage in Chesterfield",
    title: "Volvo Specialist Chesterfield | Independent Volvo Service",
    description: "Independent Volvo specialist in Chesterfield. Expert D4/D5 diesel diagnostics, DPF cleaning, and manufacturer-standard V40 and XC60 maintenance.",
    keywords: "Volvo service Chesterfield, Volvo repairs Chesterfield, independent Volvo garage Chesterfield",
    popularModels: ["V40", "V60", "V70", "V90", "XC40", "XC60", "XC90", "S60"],
    commonIssues: [
      "DPF on D4/D5 diesels",
      "Throttle body failure on petrol engines",
      "PCV system (oil mist separator) on T5/T6",
      "Brake fluid service intervals",
      "Engine mount wear on XC models"
    ]
  },
  "land-rover": {
    slug: "land-rover",
    make: "Land Rover",
    h1: "Land Rover & Range Rover Specialist Garage in Chesterfield",
    title: "Land Rover Specialist Chesterfield | Independent Service",
    description: "Independent Land Rover and Range Rover specialist in Chesterfield. Haldex servicing, TDCI timing chain repairs, and air suspension diagnostics.",
    keywords: "Land Rover specialist Chesterfield, Range Rover service Chesterfield, Freelander repairs Chesterfield",
    popularModels: ["Discovery Sport", "Range Rover Evoque", "Range Rover Sport", "Defender", "Freelander 2"],
    commonIssues: [
      "Haldex service on Evoque/Freelander",
      "Timing chain on 2.2 TDCi",
      "Air suspension on Range Rover Sport",
      "EGR and DPF on TDI engines",
      "Gearbox fluid service",
      "Rear diff service"
    ]
  },
  "jeep": {
    slug: "jeep",
    make: "Jeep",
    h1: "Jeep Specialist Garage in Chesterfield",
    title: "Jeep Specialist Chesterfield | Service & Diagnostics",
    description: "Expert Jeep specialist in Chesterfield. MultiJet engine diagnostics and 4x4 system maintenance for Renegade and Cherokee.",
    keywords: "Jeep service Chesterfield, Jeep Renegade repairs Chesterfield",
    popularModels: ["Renegade", "Compass", "Cherokee", "Wrangler"],
    commonIssues: [
      "2.0 MultiJet DPF and EGR",
      "Nine-speed automatic gearbox shudder",
      "Front transfer case service",
      "Cam belt on 2.0 CRD"
    ]
  }
};
