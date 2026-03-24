export interface ServiceContent {
  slug: string;
  h1: string;
  title: string;
  description: string;
  keywords: string;
  intro: string;
  focus: string;
  features: string[];
  faqs: { question: string; answer: string }[];
  pricing?: string;
}

export const marketingServices: Record<string, ServiceContent> = {
  "car-servicing": {
    slug: "car-servicing",
    h1: "Car Servicing in Chesterfield | DP Automotive Repair & Diagnostics",
    title: "Car Servicing Chesterfield | Interim, Full & Major Service",
    description: "Professional car servicing in Chesterfield. Interim, Full and Major service tiers available. Specialist technicians, OEM parts, and warranty-safe servicing for all makes.",
    keywords: "car servicing Chesterfield, interim service Chesterfield, full service Chesterfield, major service Chesterfield, car service near me Chesterfield",
    intro: "Keep your vehicle in peak condition with professional car servicing at DP Automotive. From interim checks to major overhauls, our qualified technicians provide comprehensive maintenance that protects your warranty and ensures road safety.",
    focus: "Three service tiers (Interim, Full, Major). What each includes. Explain that independent servicing does NOT void manufacturer warranty (Block Exemption Regulation). Emphasise use of OEM-quality parts.",
    features: [
      "Interim, Full and Major service tiers",
      "Manufacturer warranty protected (Block Exemption)",
      "Genuine or OEM-quality parts used",
      "Digital service record updates",
      "Comprehensive safety inspections",
      "Transparent, fixed-price quotes"
    ],
    faqs: [
      { question: "How often should I service my car?", answer: "Most vehicles require a service every 12 months or 12,000 miles, whichever comes first. However, high-mileage drivers may benefit from an interim service every 6 months." },
      { question: "Will servicing at DP Automotive void my manufacturer warranty?", answer: "No. Thanks to EU Block Exemption legislation, you can have your car serviced at an independent garage without affecting your warranty, provided OEM-quality parts are used and the service schedule is followed." },
      { question: "How long does a car service take?", answer: "An interim service typically takes 1.5 to 2 hours, while a full or major service can take 3 to 4 hours depending on the vehicle and any additional work required." },
      { question: "What's the difference between an interim and full service?", answer: "An interim service focuses on essential checks and oil/filter changes. A full service is more comprehensive, including air filter replacement and a more detailed inspection of the engine, brakes, and suspension." },
      { question: "Can I book my car service online?", answer: "Yes, you can use our online booking form or call us directly on 01246 233483 to schedule your appointment." }
    ]
  },
  "mot-preparation": {
    slug: "mot-preparation",
    h1: "MOT Preparation in Chesterfield | Pre-MOT Check Service",
    title: "MOT Preparation Chesterfield | Pre-MOT Checks & Repairs",
    description: "Prepare your car for its MOT with our professional pre-MOT check in Chesterfield. We identify and fix common failure points to ensure a first-time pass.",
    keywords: "MOT preparation Chesterfield, pre-MOT check Chesterfield, MOT service Chesterfield, car MOT near me",
    intro: "Don't leave your MOT success to chance. Our MOT preparation service identifies potential failures before you go for the test, saving you time and avoiding the hassle of a re-test.",
    focus: "Explain the pre-MOT check process. Common MOT failure points in UK (lights, tyres, brakes, wiper blades, emissions). How DP Auto identifies and fixes issues before the test.",
    features: [
      "Comprehensive pre-MOT inspection",
      "Brake and suspension checks",
      "Emissions system analysis",
      "Lighting and visibility check",
      "Tyre tread and condition audit",
      "Same-day repairs for failure points"
    ],
    faqs: [
      { question: "What are the most common MOT failures?", answer: "The most common causes for MOT failure include faulty lights, worn tyres, brake issues, and obscured visibility (like chips in the windscreen or worn wipers)." },
      { question: "How much does MOT preparation cost?", answer: "Our MOT preparation check is competitively priced. Please contact us for a specific quote for your vehicle." },
      { question: "Can you fix MOT failures on the day?", answer: "In most cases, yes. We carry a wide range of common parts and can often rectify issues found during preparation the same day." },
      { question: "What's checked in an MOT?", answer: "An MOT test covers vehicle safety, roadworthiness, and exhaust emissions. It includes checks on lights, steering, suspension, brakes, tyres, and more." },
      { question: "How do I book?", answer: "Call us on 01246 233483 or use our online booking form to schedule your pre-MOT check." }
    ]
  },
  "engine-diagnostics": {
    slug: "engine-diagnostics",
    h1: "Engine Diagnostics in Chesterfield | Warning Light Specialists",
    title: "Engine Diagnostics Chesterfield | Fault Code Specialists",
    description: "Expert engine diagnostics in Chesterfield. Dealer-level equipment to find and fix warning lights, performance issues, and electrical faults for all makes.",
    keywords: "engine diagnostics Chesterfield, engine warning light Chesterfield, car diagnostics near me, check engine light Chesterfield, OBD diagnostic Chesterfield",
    intro: "Is your dashboard lighting up? Our advanced engine diagnostics use dealer-level equipment to accurately identify the root cause of electrical faults and performance issues.",
    focus: "Explain engine management lights. Dealer-level equipment vs generic readers. Cover common fault codes (P0300, EML, DPF, ABS).",
    features: [
      "Dealer-level diagnostic equipment",
      "Comprehensive fault code reading",
      "Live data analysis and interpretation",
      "Engine management light resets",
      "ABS, Airbag, and Transmission diagnostics",
      "Detailed report and repair estimate"
    ],
    faqs: [
      { question: "Is it safe to drive with the engine warning light on?", answer: "If the light is steady, you should have it checked as soon as possible. If it's flashing, you should stop safely and call for assistance to avoid serious engine damage." },
      { question: "How much does a diagnostic check cost?", answer: "Our diagnostic sessions start at a fixed fee for the initial scan and interpretation. Contact us for our current diagnostic rates." },
      { question: "What can cause an engine management light?", answer: "Common causes include faulty sensors (like Oxygen or MAF), ignition issues, fuel system problems, or emissions faults like a blocked DPF." },
      { question: "Do I need to book in advance?", answer: "Yes, diagnostic work requires specialized equipment and technician time, so we recommend booking ahead." },
      { question: "What happens after the diagnostic?", answer: "We provide you with a clear explanation of the faults found and a transparent quote for the necessary repairs." }
    ]
  },
  "brake-repairs": {
    slug: "brake-repairs",
    h1: "Brake Repairs in Chesterfield | Pads, Discs & Callipers",
    title: "Brake Repairs Chesterfield | Replacement Pads & Discs",
    description: "Professional brake repairs in Chesterfield. Pads, discs, callipers, and brake fluid service with safety checks and a 12-month warranty on all work.",
    keywords: "brake repairs Chesterfield, brake pads Chesterfield, brake discs Chesterfield, brake replacement near me, squeaking brakes Chesterfield",
    intro: "Your safety depends on your brakes. We provide expert brake system repairs and maintenance using premium components to ensure maximum stopping power and reliability.",
    focus: "Full brake system: pads, discs, callipers, fluid. Warning signs. Front vs rear brake jobs. Safety emphasis.",
    features: [
      "Brake pad and disc replacement",
      "Calliper repair and replacement",
      "Brake fluid bleed and change",
      "Handbrake adjustment and repair",
      "ABS system diagnostics",
      "12-month parts and labour warranty"
    ],
    faqs: [
      { question: "How do I know when my brakes need replacing?", answer: "Look out for warning signs like squealing or grinding noises, a 'spongy' brake pedal, the car pulling to one side when braking, or increased stopping distances." },
      { question: "How long do brake pads last?", answer: "Brake pads typically last between 25,000 and 60,000 miles, but this varies significantly based on your driving style and the type of driving (city vs motorway)." },
      { question: "Can you just replace pads without discs?", answer: "Yes, if your brake discs are still within the manufacturer's safe thickness limits and are not warped or heavily pitted, we can replace just the pads." },
      { question: "How much does a brake service cost?", answer: "Costs vary by vehicle make and model. We provide transparent, no-obligation quotes for all brake work." },
      { question: "Is it safe to drive with grinding brakes?", answer: "No. Grinding noises usually mean the brake pads are completely worn down to the metal, which can damage the discs and significantly reduce your stopping ability." }
    ]
  },
  "clutch-replacement": {
    slug: "clutch-replacement",
    h1: "Clutch Replacement in Chesterfield | Expert Clutch Repairs",
    title: "Clutch Replacement Chesterfield | Performance Clutch Repairs",
    description: "Expert clutch replacement in Chesterfield. We repair and replace clutches and flywheels for all makes and models with fast turnaround and transparent pricing.",
    keywords: "clutch replacement Chesterfield, clutch repair Chesterfield, slipping clutch Chesterfield, flywheel replacement Chesterfield",
    intro: "Experiencing a slipping clutch or difficulty changing gears? Our specialists provide complete clutch and flywheel replacement services to get you back on the road smoothly.",
    focus: "Explain clutch system (pressure plate, disc, bearing, flywheel). Symptoms. When to replace flywheel (DMF). Process and duration.",
    features: [
      "Complete clutch kit replacement",
      "Dual-mass flywheel (DMF) specialists",
      "Concentric slave cylinder replacement",
      "Clutch cable and hydraulics",
      "Fast, professional turnaround",
      "All makes and models covered"
    ],
    faqs: [
      { question: "How long does a clutch last?", answer: "On average, a clutch lasts between 60,000 and 100,000 miles, although this can be much shorter if you do a lot of city driving or 'ride' the clutch." },
      { question: "What are signs of a worn clutch?", answer: "Common symptoms include 'slipping' (engine revs rise but speed doesn't), a high biting point, difficulty engaging gears, or a burning smell." },
      { question: "Should I replace the flywheel with the clutch?", answer: "For vehicles with a Dual Mass Flywheel (DMF), it is often recommended to replace both at the same time as the labour is identical and flywheels have a similar service life to the clutch." },
      { question: "How long does a clutch replacement take?", answer: "A clutch replacement usually takes between 4 and 8 hours depending on the vehicle's layout and whether it is front, rear, or four-wheel drive." },
      { question: "What does a clutch replacement cost?", answer: "Clutch replacement is a significant job; costs vary by vehicle. We provide detailed quotes based on your specific registration number." }
    ]
  },
  "cam-belt-replacement": {
    slug: "cam-belt-replacement",
    h1: "Cam Belt Replacement in Chesterfield | Timing Belt Service",
    title: "Cam Belt Replacement Chesterfield | Timing Belt Kit Fitting",
    description: "Prevent engine failure with professional cam belt replacement in Chesterfield. Timing belt kits and water pump replacement for all makes and models.",
    keywords: "cam belt replacement Chesterfield, timing belt Chesterfield, cambelt change Chesterfield, timing belt kit Chesterfield",
    intro: "A snapped cam belt can destroy your engine. Our precision timing belt replacement service ensures your engine remains synchronized and safe from catastrophic failure.",
    focus: "Catastrophic consequences of failure. Service intervals. Why to replace water pump. High-urgency messaging.",
    features: [
      "Full timing belt kit installation",
      "Water pump replacement (recommended)",
      "Timing tensioners and idlers",
      "Precision engine timing setup",
      "Manufacturer interval compliance",
      "Insurance against engine failure"
    ],
    faqs: [
      { question: "How often should a cam belt be replaced?", answer: "Intervals vary by manufacturer, typically every 60,000 to 100,000 miles or every 5 to 10 years. Check your handbook or ask us to look up your specific schedule." },
      { question: "What happens if a cam belt breaks?", answer: "In 'interference' engines, the valves will hit the pistons, causing massive internal damage that often requires a complete engine rebuild or replacement." },
      { question: "Should I replace the water pump at the same time?", answer: "Yes. In most cars, the cam belt drives the water pump. Replacing it at the same time adds very little to the labour cost but prevents a future failure that would require doing the whole job again." },
      { question: "How much does cam belt replacement cost?", answer: "It is a high-skill job but much cheaper than an engine rebuild. Contact us with your registration for a precise quote." },
      { question: "How do I know if my car has a cam belt or chain?", answer: "We can check this instantly for you using your registration number. Chains generally last longer but belts require periodic replacement." }
    ]
  },
  "dpf-cleaning": {
    slug: "dpf-cleaning",
    h1: "DPF Cleaning in Chesterfield | Diesel Particulate Filter Service",
    title: "DPF Cleaning Chesterfield | Blocked Filter Restoration",
    description: "Professional DPF cleaning in Chesterfield. Restore your diesel particulate filter, improve performance, and avoid expensive replacement costs. Blocked DPF specialists.",
    keywords: "DPF cleaning Chesterfield, diesel particulate filter Chesterfield, DPF regeneration Chesterfield, DPF warning light Chesterfield, blocked DPF Chesterfield",
    intro: "Blocked diesel particulate filter? Our professional DPF cleaning service restores your filter's performance at a fraction of the cost of a replacement.",
    focus: "What DPF is and why it blocks. Passive vs active regen. Cleaning vs replacement cost saving. Legal warning.",
    features: [
      "In-situ DPF cleaning process",
      "Forced regeneration service",
      "Differential pressure testing",
      "Root cause fault diagnosis",
      "Significant cost savings over replacement",
      "Performance and MPG restoration"
    ],
    faqs: [
      { question: "Can a blocked DPF be cleaned or does it need replacing?", answer: "In the vast majority of cases, a blocked DPF can be successfully cleaned and restored to near-new performance, saving you over £1,000 compared to a new unit." },
      { question: "How much does DPF cleaning cost?", answer: "DPF cleaning typically costs between £150 and £300, whereas a new filter can cost anywhere from £800 to over £2,000." },
      { question: "How long does DPF cleaning take?", answer: "The process usually takes 2 to 4 hours, including diagnostic time to ensure no underlying faults will cause the DPF to block again immediately." },
      { question: "What causes a DPF to block?", answer: "Short city journeys where the engine doesn't reach full operating temperature are the main cause. Other causes include faulty sensors, EGR issues, or using the wrong engine oil." },
      { question: "Can I do a DPF regeneration myself?", answer: "You can sometimes trigger a 'passive' regen by driving at consistent motorway speeds for 20-30 minutes. If the warning light stays on, you need a professional 'forced' regeneration or clean." }
    ]
  },
  "air-conditioning": {
    slug: "air-conditioning",
    h1: "Air Conditioning Regas in Chesterfield | AC Service & Repair",
    title: "Car Air Conditioning Regas Chesterfield | A/C Service",
    description: "Professional car air conditioning regas and repair in Chesterfield. R134a and R1234yf gas available. Leak testing and full system maintenance.",
    keywords: "air conditioning regas Chesterfield, AC regas Chesterfield, car air con service Chesterfield, air con not cold Chesterfield",
    intro: "Stay cool in the summer and clear in the winter. Our A/C specialists provide professional regassing and leak testing for all vehicle types, including the latest R1234yf systems.",
    focus: "Natural refrigerant loss. R134a vs R1234yf. Leak testing. Winter benefits (demisting).",
    features: [
      "R134a gas for older vehicles",
      "R1234yf gas for newer vehicles (2017+)",
      "Vacuum leak testing included",
      "PAG oil replacement",
      "Antibacterial system cleaning",
      "Full performance diagnostics"
    ],
    faqs: [
      { question: "How often should car air conditioning be regassed?", answer: "Manufacturers recommend an A/C service and regas every 2 years to maintain efficiency and prevent seal degradation." },
      { question: "How much does an AC regas cost?", answer: "Prices depend on the type of gas required. Older R134a gas is generally cheaper than the newer, more eco-friendly R1234yf gas used in cars built after 2017." },
      { question: "Why is my car air con not cold?", answer: "The most common reason is low refrigerant levels due to natural leakage or a specific leak in the condenser or pipes. Occasionally, it can be a compressor or electrical fault." },
      { question: "What's the difference between R134a and R1234yf?", answer: "R1234yf is a newer refrigerant with much lower global warming potential. It became mandatory for all new vehicles in the UK from 2017." },
      { question: "Does air con use more fuel?", answer: "Yes, running the A/C compressor adds load to the engine, slightly increasing fuel consumption. However, using it periodically is essential to keep the system seals lubricated and leak-free." }
    ]
  },
  "wheel-alignment": {
    slug: "wheel-alignment",
    h1: "Wheel Alignment & Tracking in Chesterfield | Four-Wheel Alignment",
    title: "Wheel Alignment Chesterfield | Precision Tracking & Steering",
    description: "Expert wheel alignment and tracking in Chesterfield. Correct tyre wear, improve fuel economy, and restore handling with our precision 4-wheel alignment service.",
    keywords: "wheel alignment Chesterfield, tracking Chesterfield, four wheel alignment Chesterfield, car pulling to one side Chesterfield, tyre wear Chesterfield",
    intro: "Protect your tyres and improve your handling. Our precision wheel alignment ensures your vehicle travels straight and true, saving you money on fuel and premature tyre wear.",
    focus: "2-wheel vs 4-wheel alignment. Pothole damage. Wear/MPG effects. Printout proof. When to check.",
    features: [
      "Precision four-wheel alignment",
      "Front-to-rear tracking alignment",
      "Pothole and kerb damage checks",
      "Steering wheel centering",
      "Detailed before/after reports",
      "Camber, Caster and Toe adjustments"
    ],
    faqs: [
      { question: "How do I know if my wheels need aligning?", answer: "Common signs include the car pulling to one side, an off-center steering wheel when driving straight, or uneven tyre wear (e.g., wearing faster on one edge)." },
      { question: "How often should I get a wheel alignment?", answer: "We recommend checking your alignment once a year or whenever you hit a significant pothole/kerb, or when fitting new tyres." },
      { question: "What's the difference between tracking and alignment?", answer: "'Tracking' usually refers to simple front-wheel toe adjustment, whereas 'Four-Wheel Alignment' is a more comprehensive check of all wheels relative to the vehicle's centerline." },
      { question: "How much does wheel alignment cost?", answer: "Standard front-wheel tracking is very affordable. Full four-wheel alignment costing slightly more but providing better long-term tyre protection." },
      { question: "Can misalignment damage my tyres?", answer: "Yes. Poor alignment causes 'scrubbing' which can wear through a new tyre in just a few thousand miles, significantly increasing your running costs." }
    ]
  },
  "battery-replacement": {
    slug: "battery-replacement",
    h1: "Car Battery Replacement in Chesterfield | Battery Testing & Fitting",
    title: "Car Battery Replacement Chesterfield | Stop-Start Battery Specialists",
    description: "Professional car battery testing and replacement in Chesterfield. We stock premium batteries for all makes, including AGM/EFB for start-stop vehicles.",
    keywords: "car battery replacement Chesterfield, battery fitting Chesterfield, battery test Chesterfield, new car battery Chesterfield",
    intro: "Don't get stranded with a flat battery. We provide comprehensive battery testing and supply premium replacements with professional fitting for all vehicle types.",
    focus: "Load testing vs voltage. AGM/EFB for start-stop. ECU registration for BMW/Audi/Merc. Disposal.",
    features: [
      "Advanced battery health load testing",
      "AGM and EFB start-stop specialists",
      "ECU battery registration service",
      "Memory saved during replacement",
      "Environmentally friendly disposal",
      "Wide range of premium brands in stock"
    ],
    faqs: [
      { question: "How long does a car battery last?", answer: "Modern car batteries typically last between 3 and 5 years. Extreme temperatures and short journeys can shorten this lifespan." },
      { question: "How do I know if my battery needs replacing?", answer: "Signs include a slow-turning engine when starting, a warning light on the dash, or electrical components (like windows) moving slowly." },
      { question: "What type of battery does my car need?", answer: "Modern cars with 'Stop-Start' technology require specific AGM or EFB batteries. We use your registration to ensure the exact manufacturer specification is fitted." },
      { question: "Do I need to register a new car battery?", answer: "Yes, many modern vehicles (BMW, Audi, VW, Mercedes) require the new battery to be 'coded' to the engine management system to ensure correct charging levels." },
      { question: "How much does a car battery cost?", answer: "Prices vary by size and technology (Standard vs AGM). We provide competitive quotes including professional fitting and disposal of your old unit." }
    ]
  },
  "exhaust-repairs": {
    slug: "exhaust-repairs",
    h1: "Exhaust Repairs in Chesterfield | Exhaust Replacement & Fitting",
    title: "Exhaust Repairs Chesterfield | Catalytic Converter Specialists",
    description: "Professional exhaust repairs and replacement in Chesterfield. From minor leaks to full systems and catalytic converters. Book your exhaust check today.",
    keywords: "exhaust repair Chesterfield, exhaust replacement Chesterfield, exhaust blowing Chesterfield, catalytic converter Chesterfield",
    intro: "Is your exhaust blowing or rattling? We provide expert repairs and high-quality replacements for all exhaust components, ensuring your car is quiet, efficient, and MOT-ready.",
    focus: "Full system breakdown. MOT failure points. Cat function and MPG loss. Repair vs replace.",
    features: [
      "Full and partial system replacement",
      "Catalytic converter specialists",
      "Exhaust manifold and flexi repairs",
      "Blowing and rattling noise diagnosis",
      "Emissions failure rectification",
      "Performance exhaust fitting"
    ],
    faqs: [
      { question: "How do I know if my exhaust needs replacing?", answer: "Listen for loud roaring or blowing noises, rattling under the car, or a visible hanging tailpipe. You may also notice a drop in fuel economy or a smell of fumes." },
      { question: "Will a blowing exhaust fail an MOT?", answer: "Yes. Any major leak or significantly high emissions caused by an exhaust fault will result in an MOT failure." },
      { question: "How much does an exhaust repair cost?", answer: "Small leaks can often be repaired cheaply. Full systems or catalytic converters are more expensive. We always provide a clear quote before starting work." },
      { question: "Can you repair an exhaust instead of replacing it?", answer: "Sometimes minor leaks or broken brackets can be welded or repaired. We always check if a repair is safe and cost-effective before recommending a replacement." },
      { question: "What is a catalytic converter?", answer: "The 'cat' is an emissions control device that converts toxic gases into less harmful ones. A faulty cat will cause an MOT failure and often trigger a dashboard warning light." }
    ]
  },
  "suspension-repairs": {
    slug: "suspension-repairs",
    h1: "Suspension Repairs in Chesterfield | Shocks, Springs & Bushes",
    title: "Suspension Repairs Chesterfield | Shock Absorbers & Coil Springs",
    description: "Expert suspension repairs in Chesterfield. We replace shock absorbers, coil springs, and bushes to restore your car's handling and comfort on bumpy roads.",
    keywords: "suspension repair Chesterfield, shock absorbers Chesterfield, suspension noise Chesterfield, coil spring replacement Chesterfield",
    intro: "Restore your car's comfort and safety. We specialize in diagnosing and repairing suspension faults, from snapped coil springs to worn shock absorbers and bushes.",
    focus: "Shocks, springs, bushes. Pothole context (Derbyshire). Handling/Safety impact. MOT points.",
    features: [
      "Coil spring replacement specialists",
      "Shock absorber (strut) replacement",
      "Wishbone and suspension bush repairs",
      "Anti-roll bar and drop link service",
      "Noise and handling diagnosis",
      "Alignment check after repairs"
    ],
    faqs: [
      { question: "What are signs of worn suspension?", answer: "Symptoms include knocking or banging over bumps, the car 'bouncing' too much, uneven tyre wear, or the car sitting lower on one side (often a snapped spring)." },
      { question: "Will suspension fail an MOT?", answer: "Yes. Snapped springs, leaking shock absorbers, or excessively worn bushes are all major MOT failure points." },
      { question: "How long do shock absorbers last?", answer: "They generally last 50,000 to 80,000 miles, but their lifespan is significantly reduced by the poor road surfaces and potholes common in Derbyshire." },
      { question: "Is it safe to drive with worn suspension?", answer: "No. It affects your steering, braking distance, and stability, making the vehicle much harder to control in an emergency." },
      { question: "How much does suspension repair cost?", answer: "Common jobs like drop links are very affordable. Major work like full struts varies by vehicle. We provide transparent pricing for all suspension work." }
    ]
  },
  "egr-valve-replacement": {
    slug: "egr-valve-replacement",
    h1: "EGR Valve Replacement in Chesterfield | EGR Cleaning & Repair",
    title: "EGR Valve Replacement Chesterfield | EGR Fault Specialists",
    description: "Expert EGR valve replacement and cleaning in Chesterfield. Solve rough idling, black smoke, and performance issues caused by carbon-blocked EGR valves.",
    keywords: "EGR valve Chesterfield, EGR valve replacement Chesterfield, EGR cleaning Chesterfield, EGR fault Chesterfield",
    intro: "Restore your engine's performance and efficiency. Our technicians specialize in diagnosing and solving EGR valve issues that cause rough running and black smoke.",
    focus: "What EGR does. Why they fail (carbon). Symptoms. Clean vs replace. Common affected marques.",
    features: [
      "Professional EGR valve diagnostics",
      "Full EGR replacement service",
      "Carbon cleaning and restoration",
      "Inlet manifold cleaning",
      "Software adaptation and coding",
      "Performance and MPG restoration"
    ],
    faqs: [
      { question: "What does the EGR valve do?", answer: "The Exhaust Gas Recirculation (EGR) valve lowers nitrogen oxide (NOx) emissions by recirculating a portion of exhaust gas back into the engine's combustion chambers." },
      { question: "Can an EGR valve be cleaned instead of replaced?", answer: "Yes, if the internal electronic motor is still functioning, we can often professionally clean the carbon build-up to restore operation at a lower cost than replacement." },
      { question: "What are the symptoms of a faulty EGR valve?", answer: "Common signs include a rough idle, poor engine performance, increased fuel consumption, black smoke from the exhaust, and an engine management light." },
      { question: "How much does EGR valve replacement cost?", answer: "The cost varies significantly depending on the engine type and the accessibility of the valve. We provide quotes based on your specific vehicle." },
      { question: "Can a faulty EGR cause MOT failure?", answer: "Yes, a faulty EGR can cause the vehicle to fail the emissions part of the MOT test or cause an engine management light to stay on, which is also a failure." }
    ]
  },
  "pre-purchase-inspection": {
    slug: "pre-purchase-inspection",
    h1: "Pre-Purchase Car Inspection in Chesterfield | Independent Vehicle Check",
    title: "Pre-Purchase Car Inspection Chesterfield | Used Car Checks",
    description: "Independent pre-purchase car inspection in Chesterfield. Get peace of mind before you buy a used car with our comprehensive professional vehicle audit.",
    keywords: "pre-purchase inspection Chesterfield, used car check Chesterfield, independent car inspection Chesterfield, vehicle inspection before buying Chesterfield",
    intro: "Buying a used car? Our independent pre-purchase inspection gives you the facts you need to make a safe investment and avoid hidden mechanical problems.",
    focus: "Why independent inspection is essential. Internal checklist (body, engine, electronics). Written report. Peace of mind.",
    features: [
      "Comprehensive mechanical audit",
      "Electrical system diagnostic scan",
      "Bodywork and accident damage check",
      "Underside and suspension inspection",
      "Professional road test assessment",
      "Detailed written summary report"
    ],
    faqs: [
      { question: "What does a pre-purchase inspection include?", answer: "It includes a full mechanical check, diagnostic scan for hidden fault codes, inspection for previous accident damage, a road test, and a review of the vehicle's general condition." },
      { question: "How much does a pre-purchase inspection cost?", answer: "Our inspections are a fixed fee that provides excellent value compared to the potential cost of buying a vehicle with serious undisclosed faults." },
      { question: "Can I bring any car to you for inspection?", answer: "Yes, we inspect all passenger cars and light commercial vehicles, regardless of age, make, or model." },
      { question: "How long does an inspection take?", answer: "A thorough inspection usually takes around 2 hours, including the road test and preparing the summary report for you." },
      { question: "Do you provide a written report?", answer: "Yes, we provide a clear, written summary of our findings, highlighting any urgent repairs or areas of concern we identified." }
    ]
  }
};
