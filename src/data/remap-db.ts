// Local sample database for Make → Model → Variant selection
// Keep this small and easily extensible. Values are indicative.

export type EngineType = 'petrol_turbo' | 'diesel_turbo' | 'petrol_na';

export interface VehicleVariant {
  name: string;           // e.g., "2.0 TDI 150"
  engineType: EngineType; // mapping to internal calculator presets
  hp: number;             // stock horsepower
  nm: number;             // stock torque
  years?: string;         // optional display (e.g., 2013-2018)
}

export interface VehicleModel {
  name: string;           // e.g., "A3 (8V)"
  variants: VehicleVariant[];
}

export interface VehicleMake {
  name: string;           // e.g., "Audi"
  models: VehicleModel[];
}

export type VehicleDB = Record<string, VehicleMake>;

export const REMAP_DB: VehicleDB = {
  Audi: {
    name: 'Audi',
    models: [
      {
        name: 'A3 (8V) 2012-2020',
        variants: [
          { name: '2.0 TDI 150', engineType: 'diesel_turbo', hp: 150, nm: 320 },
          { name: '2.0 TFSI 220', engineType: 'petrol_turbo', hp: 220, nm: 350 },
          { name: '1.6 TDI 110', engineType: 'diesel_turbo', hp: 110, nm: 250 },
          { name: 'S3 2.0 TFSI 300', engineType: 'petrol_turbo', hp: 300, nm: 380 },
          { name: '1.4 TFSI 125', engineType: 'petrol_turbo', hp: 125, nm: 200 },
          { name: '1.8 TFSI 180', engineType: 'petrol_turbo', hp: 180, nm: 280 },
        ],
      },
      {
        name: 'A4 (B9) 2016-2023',
        variants: [
          { name: '2.0 TDI 190', engineType: 'diesel_turbo', hp: 190, nm: 400 },
          { name: '2.0 TFSI 252', engineType: 'petrol_turbo', hp: 252, nm: 370 },
          { name: '2.0 TDI 150', engineType: 'diesel_turbo', hp: 150, nm: 320 },
          { name: '35 TFSI 150', engineType: 'petrol_turbo', hp: 150, nm: 270 },
          { name: 'S4 3.0 TFSI 354', engineType: 'petrol_turbo', hp: 354, nm: 500 },
        ],
      },
      {
        name: 'A5 (F5) 2016-2023',
        variants: [
          { name: '2.0 TDI 190', engineType: 'diesel_turbo', hp: 190, nm: 400 },
          { name: '2.0 TFSI 252', engineType: 'petrol_turbo', hp: 252, nm: 370 },
          { name: 'S5 3.0 TFSI 354', engineType: 'petrol_turbo', hp: 354, nm: 500 },
        ],
      },
      {
        name: 'Q5 (FY) 2017-2023',
        variants: [
          { name: '2.0 TDI 190', engineType: 'diesel_turbo', hp: 190, nm: 400 },
          { name: '2.0 TFSI 252', engineType: 'petrol_turbo', hp: 252, nm: 370 },
          { name: 'SQ5 3.0 TFSI 354', engineType: 'petrol_turbo', hp: 354, nm: 500 },
        ],
      },
      {
        name: 'TT (8S) 2014-2023',
        variants: [
          { name: '2.0 TFSI 230', engineType: 'petrol_turbo', hp: 230, nm: 370 },
          { name: 'TTS 2.0 TFSI 310', engineType: 'petrol_turbo', hp: 310, nm: 400 },
          { name: '2.0 TDI 184', engineType: 'diesel_turbo', hp: 184, nm: 380 },
        ],
      },
      {
        name: 'Q7 (4M) 2015-2023',
        variants: [
          { name: '3.0 TDI 272', engineType: 'diesel_turbo', hp: 272, nm: 600 },
          { name: '3.0 TFSI 340', engineType: 'petrol_turbo', hp: 340, nm: 500 },
        ],
      },
    ],
  },
  BMW: {
    name: 'BMW',
    models: [
      {
        name: '3 Series F30 2012-2019',
        variants: [
          { name: '320d 184', engineType: 'diesel_turbo', hp: 184, nm: 380 },
          { name: '330i 252', engineType: 'petrol_turbo', hp: 252, nm: 350 },
          { name: '335d 313', engineType: 'diesel_turbo', hp: 313, nm: 630 },
          { name: '340i 326', engineType: 'petrol_turbo', hp: 326, nm: 450 },
          { name: '318d 150', engineType: 'diesel_turbo', hp: 150, nm: 320 },
          { name: 'M3 (F80) 431', engineType: 'petrol_turbo', hp: 431, nm: 550 },
        ],
      },
      {
        name: '3 Series G20 2019-2024',
        variants: [
          { name: '320d 190', engineType: 'diesel_turbo', hp: 190, nm: 400 },
          { name: '330i 258', engineType: 'petrol_turbo', hp: 258, nm: 400 },
          { name: 'M340i 374', engineType: 'petrol_turbo', hp: 374, nm: 500 },
          { name: '330d 286', engineType: 'diesel_turbo', hp: 286, nm: 580 },
        ],
      },
      {
        name: '1 Series F20 2011-2019',
        variants: [
          { name: '118i 136', engineType: 'petrol_turbo', hp: 136, nm: 220 },
          { name: '120d 184', engineType: 'diesel_turbo', hp: 184, nm: 380 },
          { name: 'M135i 326', engineType: 'petrol_turbo', hp: 326, nm: 450 },
          { name: '125d 224', engineType: 'diesel_turbo', hp: 224, nm: 450 },
        ],
      },
      {
        name: '5 Series G30 2017-2023',
        variants: [
          { name: '520d 190', engineType: 'diesel_turbo', hp: 190, nm: 400 },
          { name: '530i 252', engineType: 'petrol_turbo', hp: 252, nm: 350 },
          { name: '540i 340', engineType: 'petrol_turbo', hp: 340, nm: 450 },
          { name: 'M550i 462', engineType: 'petrol_turbo', hp: 462, nm: 650 },
          { name: '530d 265', engineType: 'diesel_turbo', hp: 265, nm: 620 },
        ],
      },
      {
        name: 'X3 G01 2017-2023',
        variants: [
          { name: '20d 190', engineType: 'diesel_turbo', hp: 190, nm: 400 },
          { name: '30i 252', engineType: 'petrol_turbo', hp: 252, nm: 350 },
          { name: 'M40i 360', engineType: 'petrol_turbo', hp: 360, nm: 500 },
        ],
      },
      {
        name: '4 Series F32 2013-2020',
        variants: [
          { name: '420d 190', engineType: 'diesel_turbo', hp: 190, nm: 400 },
          { name: '440i 326', engineType: 'petrol_turbo', hp: 326, nm: 450 },
          { name: 'M4 (F82) 431', engineType: 'petrol_turbo', hp: 431, nm: 550 },
        ],
      },
    ],
  },
  Volkswagen: {
    name: 'Volkswagen',
    models: [
      {
        name: 'Golf Mk7 2012-2020',
        variants: [
          { name: 'GTI 2.0 TSI 220', engineType: 'petrol_turbo', hp: 220, nm: 350 },
          { name: '2.0 TDI 150', engineType: 'diesel_turbo', hp: 150, nm: 320 },
          { name: '1.0 TSI 95', engineType: 'petrol_turbo', hp: 95, nm: 160 },
          { name: 'R 2.0 TSI 300', engineType: 'petrol_turbo', hp: 300, nm: 380 },
          { name: 'GTD 2.0 TDI 184', engineType: 'diesel_turbo', hp: 184, nm: 380 },
          { name: '1.4 TSI 125', engineType: 'petrol_turbo', hp: 125, nm: 200 },
        ],
      },
      {
        name: 'Golf Mk8 2020-2024',
        variants: [
          { name: 'GTI 2.0 TSI 245', engineType: 'petrol_turbo', hp: 245, nm: 370 },
          { name: 'R 2.0 TSI 320', engineType: 'petrol_turbo', hp: 320, nm: 420 },
          { name: '2.0 TDI 150', engineType: 'diesel_turbo', hp: 150, nm: 340 },
          { name: '1.5 eTSI 150', engineType: 'petrol_turbo', hp: 150, nm: 250 },
        ],
      },
      {
        name: 'Passat B8 2014-2023',
        variants: [
          { name: '2.0 TDI 190', engineType: 'diesel_turbo', hp: 190, nm: 400 },
          { name: '2.0 TDI 150', engineType: 'diesel_turbo', hp: 150, nm: 340 },
          { name: '1.5 TSI 150', engineType: 'petrol_turbo', hp: 150, nm: 250 },
        ],
      },
      {
        name: 'Transporter T6 2015-2020',
        variants: [
          { name: '2.0 TDI 150', engineType: 'diesel_turbo', hp: 150, nm: 340 },
          { name: '2.0 TDI 204', engineType: 'diesel_turbo', hp: 204, nm: 400 },
          { name: '2.0 TDI 110', engineType: 'diesel_turbo', hp: 110, nm: 250 },
        ],
      },
      {
        name: 'Tiguan MK2 2016-2023',
        variants: [
          { name: '2.0 TDI 150', engineType: 'diesel_turbo', hp: 150, nm: 340 },
          { name: '2.0 TSI 190', engineType: 'petrol_turbo', hp: 190, nm: 320 },
          { name: '2.0 TDI 190', engineType: 'diesel_turbo', hp: 190, nm: 400 },
        ],
      },
      {
        name: 'Polo AW 2018-2024',
        variants: [
          { name: 'GTI 2.0 TSI 200', engineType: 'petrol_turbo', hp: 200, nm: 320 },
          { name: '1.0 TSI 95', engineType: 'petrol_turbo', hp: 95, nm: 175 },
          { name: '1.0 TSI 115', engineType: 'petrol_turbo', hp: 115, nm: 200 },
        ],
      },
    ],
  },
  Ford: {
    name: 'Ford',
    models: [
      {
        name: 'Focus Mk3 2011-2018',
        variants: [
          { name: 'ST 2.0 EcoBoost 250', engineType: 'petrol_turbo', hp: 250, nm: 360 },
          { name: '1.0 EcoBoost 125', engineType: 'petrol_turbo', hp: 125, nm: 170 },
          { name: 'RS 2.3 EcoBoost 350', engineType: 'petrol_turbo', hp: 350, nm: 440 },
          { name: '1.5 TDCi 120', engineType: 'diesel_turbo', hp: 120, nm: 270 },
        ],
      },
      {
        name: 'Focus Mk4 2018-2024',
        variants: [
          { name: 'ST 2.3 EcoBoost 280', engineType: 'petrol_turbo', hp: 280, nm: 420 },
          { name: '1.0 EcoBoost 125', engineType: 'petrol_turbo', hp: 125, nm: 170 },
          { name: '1.5 EcoBlue 120', engineType: 'diesel_turbo', hp: 120, nm: 300 },
          { name: 'ST 2.0 EcoBlue 190', engineType: 'diesel_turbo', hp: 190, nm: 400 },
        ],
      },
      {
        name: 'Fiesta Mk8 2017-2023',
        variants: [
          { name: 'ST 1.5 EcoBoost 200', engineType: 'petrol_turbo', hp: 200, nm: 290 },
          { name: '1.0 EcoBoost 100', engineType: 'petrol_turbo', hp: 100, nm: 170 },
          { name: '1.0 EcoBoost 140', engineType: 'petrol_turbo', hp: 140, nm: 200 },
          { name: '1.5 TDCi 85', engineType: 'diesel_turbo', hp: 85, nm: 215 },
        ],
      },
      {
        name: 'Mondeo Mk5 2014-2022',
        variants: [
          { name: '2.0 TDCi 180', engineType: 'diesel_turbo', hp: 180, nm: 400 },
          { name: '2.0 TDCi 150', engineType: 'diesel_turbo', hp: 150, nm: 350 },
          { name: '1.5 EcoBoost 160', engineType: 'petrol_turbo', hp: 160, nm: 240 },
        ],
      },
      {
        name: 'Ranger 2019-2024',
        variants: [
          { name: '2.0 EcoBlue 170', engineType: 'diesel_turbo', hp: 170, nm: 420 },
          { name: '2.0 EcoBlue Bi-Turbo 213', engineType: 'diesel_turbo', hp: 213, nm: 500 },
          { name: 'Raptor 2.0 EcoBlue 213', engineType: 'diesel_turbo', hp: 213, nm: 500 },
        ],
      },
      {
        name: 'Mustang 2015-2023',
        variants: [
          { name: '5.0 V8 GT 450', engineType: 'petrol_na', hp: 450, nm: 529 },
          { name: '2.3 EcoBoost 290', engineType: 'petrol_turbo', hp: 290, nm: 440 },
        ],
      },
    ],
  },
  Vauxhall: {
    name: 'Vauxhall',
    models: [
      {
        name: 'Astra J 2009-2015',
        variants: [
          { name: '1.6 CDTi 136', engineType: 'diesel_turbo', hp: 136, nm: 320 },
          { name: '1.4T 140', engineType: 'petrol_turbo', hp: 140, nm: 200 },
          { name: 'VXR 2.0T 280', engineType: 'petrol_turbo', hp: 280, nm: 400 },
        ],
      },
      {
        name: 'Astra K 2015-2022',
        variants: [
          { name: '1.6 CDTi 136', engineType: 'diesel_turbo', hp: 136, nm: 320 },
          { name: '1.4T 150', engineType: 'petrol_turbo', hp: 150, nm: 245 },
          { name: '1.6T 200', engineType: 'petrol_turbo', hp: 200, nm: 300 },
        ],
      },
      {
        name: 'Corsa F 2019-2024',
        variants: [
          { name: '1.2 PureTech 100', engineType: 'petrol_turbo', hp: 100, nm: 205 },
          { name: '1.2 PureTech 130', engineType: 'petrol_turbo', hp: 130, nm: 230 },
          { name: '1.5 Diesel 100', engineType: 'diesel_turbo', hp: 100, nm: 250 },
        ],
      },
      {
        name: 'Insignia B 2017-2022',
        variants: [
          { name: '2.0 CDTi 170', engineType: 'diesel_turbo', hp: 170, nm: 400 },
          { name: '1.5T 165', engineType: 'petrol_turbo', hp: 165, nm: 250 },
          { name: '2.0T 260', engineType: 'petrol_turbo', hp: 260, nm: 400 },
        ],
      },
    ],
  },
  'Mercedes-Benz': {
    name: 'Mercedes-Benz',
    models: [
      {
        name: 'C-Class W205 2014-2021',
        variants: [
          { name: 'C220d 170', engineType: 'diesel_turbo', hp: 170, nm: 400 },
          { name: 'C200 184', engineType: 'petrol_turbo', hp: 184, nm: 300 },
          { name: 'C300 258', engineType: 'petrol_turbo', hp: 258, nm: 370 },
          { name: 'C43 AMG 390', engineType: 'petrol_turbo', hp: 390, nm: 520 },
          { name: 'C63 AMG 476', engineType: 'petrol_turbo', hp: 476, nm: 650 },
          { name: 'C250d 204', engineType: 'diesel_turbo', hp: 204, nm: 500 },
        ],
      },
      {
        name: 'A-Class W177 2018-2023',
        variants: [
          { name: 'A200 163', engineType: 'petrol_turbo', hp: 163, nm: 250 },
          { name: 'A180d 116', engineType: 'diesel_turbo', hp: 116, nm: 260 },
          { name: 'A250 224', engineType: 'petrol_turbo', hp: 224, nm: 350 },
          { name: 'A35 AMG 306', engineType: 'petrol_turbo', hp: 306, nm: 400 },
          { name: 'A45 S AMG 421', engineType: 'petrol_turbo', hp: 421, nm: 500 },
        ],
      },
      {
        name: 'E-Class W213 2016-2023',
        variants: [
          { name: 'E220d 194', engineType: 'diesel_turbo', hp: 194, nm: 400 },
          { name: 'E300 258', engineType: 'petrol_turbo', hp: 258, nm: 370 },
          { name: 'E53 AMG 435', engineType: 'petrol_turbo', hp: 435, nm: 520 },
          { name: 'E400d 340', engineType: 'diesel_turbo', hp: 340, nm: 700 },
        ],
      },
      {
        name: 'GLC X253 2015-2023',
        variants: [
          { name: 'GLC 220d 194', engineType: 'diesel_turbo', hp: 194, nm: 400 },
          { name: 'GLC 300 258', engineType: 'petrol_turbo', hp: 258, nm: 370 },
          { name: 'GLC 43 AMG 390', engineType: 'petrol_turbo', hp: 390, nm: 520 },
        ],
      },
      {
        name: 'CLA C118 2019-2024',
        variants: [
          { name: 'CLA 200 163', engineType: 'petrol_turbo', hp: 163, nm: 250 },
          { name: 'CLA 250 224', engineType: 'petrol_turbo', hp: 224, nm: 350 },
          { name: 'CLA 35 AMG 306', engineType: 'petrol_turbo', hp: 306, nm: 400 },
        ],
      },
    ],
  },
  Toyota: {
    name: 'Toyota',
    models: [
      {
        name: 'Corolla E210 2019-2023',
        variants: [
          { name: '1.2T 116', engineType: 'petrol_turbo', hp: 116, nm: 185 },
        ],
      },
      {
        name: 'GT86/GR86 2012-2024',
        variants: [
          { name: '2.0 NA 200', engineType: 'petrol_na', hp: 200, nm: 205 },
          { name: 'GR86 2.4 NA 235', engineType: 'petrol_na', hp: 235, nm: 250 },
        ],
      },
      {
        name: 'Supra A90 2019-2024',
        variants: [
          { name: '3.0 Turbo 340', engineType: 'petrol_turbo', hp: 340, nm: 500 },
          { name: '2.0 Turbo 258', engineType: 'petrol_turbo', hp: 258, nm: 400 },
        ],
      },
      {
        name: 'Hilux 2015-2024',
        variants: [
          { name: '2.4 D-4D 150', engineType: 'diesel_turbo', hp: 150, nm: 400 },
          { name: '2.8 D-4D 204', engineType: 'diesel_turbo', hp: 204, nm: 500 },
        ],
      },
      {
        name: 'Avensis 2015-2018',
        variants: [
          { name: '2.0 D-4D 143', engineType: 'diesel_turbo', hp: 143, nm: 320 },
        ],
      },
      {
        name: 'GR Yaris 2020-2024',
        variants: [
          { name: '1.6 Turbo 261', engineType: 'petrol_turbo', hp: 261, nm: 360 },
        ],
      },
    ],
  },
  Honda: {
    name: 'Honda',
    models: [
      {
        name: 'Civic 2017-2021 (FK7/FK8)',
        variants: [
          { name: '1.5 VTEC Turbo 182', engineType: 'petrol_turbo', hp: 182, nm: 240 },
          { name: 'Type R 2.0T 320', engineType: 'petrol_turbo', hp: 320, nm: 400 },
        ],
      },
      {
        name: 'Civic FL5 2022-2024',
        variants: [
          { name: 'Type R 2.0T 329', engineType: 'petrol_turbo', hp: 329, nm: 420 },
          { name: '1.5T Sport 182', engineType: 'petrol_turbo', hp: 182, nm: 240 },
        ],
      },
      {
        name: 'S2000 1999-2009',
        variants: [
          { name: '2.0 VTEC 240', engineType: 'petrol_na', hp: 240, nm: 208 },
          { name: '2.2 VTEC 242', engineType: 'petrol_na', hp: 242, nm: 220 },
        ],
      },
    ],
  },
  Nissan: {
    name: 'Nissan',
    models: [
      {
        name: 'Qashqai J11 2014-2021',
        variants: [
          { name: '1.5 dCi 110', engineType: 'diesel_turbo', hp: 110, nm: 260 },
          { name: '1.3 DIG-T 160', engineType: 'petrol_turbo', hp: 160, nm: 260 },
        ],
      },
      {
        name: '370Z 2009-2020',
        variants: [
          { name: '3.7 V6 328', engineType: 'petrol_na', hp: 328, nm: 363 },
          { name: 'Nismo 3.7 V6 344', engineType: 'petrol_na', hp: 344, nm: 371 },
        ],
      },
      {
        name: 'Navara NP300 2015-2024',
        variants: [
          { name: '2.3 dCi 163', engineType: 'diesel_turbo', hp: 163, nm: 403 },
          { name: '2.3 dCi 190', engineType: 'diesel_turbo', hp: 190, nm: 450 },
        ],
      },
      {
        name: 'Juke F16 2019-2024',
        variants: [
          { name: '1.0 DIG-T 114', engineType: 'petrol_turbo', hp: 114, nm: 200 },
        ],
      },
    ],
  },
  Skoda: {
    name: 'Skoda',
    models: [
      {
        name: 'Octavia Mk3 2013-2020',
        variants: [
          { name: '2.0 TDI 150', engineType: 'diesel_turbo', hp: 150, nm: 320 },
          { name: '1.4 TSI 150', engineType: 'petrol_turbo', hp: 150, nm: 250 },
          { name: 'vRS 2.0 TSI 230', engineType: 'petrol_turbo', hp: 230, nm: 350 },
          { name: 'vRS 2.0 TDI 184', engineType: 'diesel_turbo', hp: 184, nm: 380 },
        ],
      },
      {
        name: 'Octavia Mk4 2020-2024',
        variants: [
          { name: '2.0 TDI 150', engineType: 'diesel_turbo', hp: 150, nm: 340 },
          { name: 'vRS 2.0 TSI 245', engineType: 'petrol_turbo', hp: 245, nm: 370 },
          { name: '1.5 TSI 150', engineType: 'petrol_turbo', hp: 150, nm: 250 },
        ],
      },
      {
        name: 'Superb Mk3 2015-2023',
        variants: [
          { name: '2.0 TDI 190', engineType: 'diesel_turbo', hp: 190, nm: 400 },
          { name: '2.0 TSI 280', engineType: 'petrol_turbo', hp: 280, nm: 350 },
        ],
      },
    ],
  },
  SEAT: {
    name: 'SEAT',
    models: [
      {
        name: 'Leon Mk3 2012-2020',
        variants: [
          { name: '2.0 TDI 150', engineType: 'diesel_turbo', hp: 150, nm: 320 },
          { name: '1.8 TSI 180', engineType: 'petrol_turbo', hp: 180, nm: 250 },
          { name: 'Cupra 2.0 TSI 300', engineType: 'petrol_turbo', hp: 300, nm: 380 },
          { name: 'Cupra R 2.0 TSI 310', engineType: 'petrol_turbo', hp: 310, nm: 380 },
        ],
      },
      {
        name: 'Leon Mk4 2020-2024',
        variants: [
          { name: '1.5 TSI 150', engineType: 'petrol_turbo', hp: 150, nm: 250 },
          { name: '2.0 TDI 150', engineType: 'diesel_turbo', hp: 150, nm: 340 },
        ],
      },
    ],
  },
  Cupra: {
    name: 'Cupra',
    models: [
      {
        name: 'Formentor 2020-2024',
        variants: [
          { name: '2.0 TSI 310', engineType: 'petrol_turbo', hp: 310, nm: 400 },
          { name: '1.5 TSI 150', engineType: 'petrol_turbo', hp: 150, nm: 250 },
          { name: '2.0 TDI 150', engineType: 'diesel_turbo', hp: 150, nm: 340 },
        ],
      },
      {
        name: 'Leon 2020-2024',
        variants: [
          { name: '2.0 TSI 245', engineType: 'petrol_turbo', hp: 245, nm: 370 },
          { name: '2.0 TSI 310', engineType: 'petrol_turbo', hp: 310, nm: 400 },
        ],
      },
    ],
  },
  Volvo: {
    name: 'Volvo',
    models: [
      {
        name: 'V40 2012-2019',
        variants: [
          { name: 'D4 190', engineType: 'diesel_turbo', hp: 190, nm: 400 },
          { name: 'T5 245', engineType: 'petrol_turbo', hp: 245, nm: 350 },
        ],
      },
      {
        name: 'XC60 2017-2024',
        variants: [
          { name: 'D4 190', engineType: 'diesel_turbo', hp: 190, nm: 400 },
          { name: 'T5 254', engineType: 'petrol_turbo', hp: 254, nm: 350 },
          { name: 'D5 235', engineType: 'diesel_turbo', hp: 235, nm: 480 },
          { name: 'T6 310', engineType: 'petrol_turbo', hp: 310, nm: 400 },
        ],
      },
      {
        name: 'V60 2018-2024',
        variants: [
          { name: 'D3 150', engineType: 'diesel_turbo', hp: 150, nm: 320 },
          { name: 'D4 190', engineType: 'diesel_turbo', hp: 190, nm: 400 },
          { name: 'T5 250', engineType: 'petrol_turbo', hp: 250, nm: 350 },
        ],
      },
    ],
  },
  Peugeot: {
    name: 'Peugeot',
    models: [
      {
        name: '308 T9 2013-2021',
        variants: [
          { name: '1.2 PureTech 130', engineType: 'petrol_turbo', hp: 130, nm: 230 },
          { name: '1.6 BlueHDi 120', engineType: 'diesel_turbo', hp: 120, nm: 300 },
          { name: 'GTi 1.6 THP 270', engineType: 'petrol_turbo', hp: 270, nm: 330 },
        ],
      },
      {
        name: '208 2019-2024',
        variants: [
          { name: '1.2 PureTech 100', engineType: 'petrol_turbo', hp: 100, nm: 205 },
          { name: '1.2 PureTech 130', engineType: 'petrol_turbo', hp: 130, nm: 230 },
          { name: '1.5 BlueHDi 100', engineType: 'diesel_turbo', hp: 100, nm: 250 },
        ],
      },
      {
        name: '3008 2016-2024',
        variants: [
          { name: '1.6 PureTech 180', engineType: 'petrol_turbo', hp: 180, nm: 250 },
          { name: '1.5 BlueHDi 130', engineType: 'diesel_turbo', hp: 130, nm: 300 },
          { name: '2.0 BlueHDi 180', engineType: 'diesel_turbo', hp: 180, nm: 400 },
        ],
      },
    ],
  },
  Renault: {
    name: 'Renault',
    models: [
      {
        name: 'Megane IV 2016-2022',
        variants: [
          { name: '1.5 dCi 110', engineType: 'diesel_turbo', hp: 110, nm: 260 },
          { name: '1.3 TCe 140', engineType: 'petrol_turbo', hp: 140, nm: 240 },
          { name: 'RS 1.8T 280', engineType: 'petrol_turbo', hp: 280, nm: 390 },
          { name: 'RS Trophy 1.8T 300', engineType: 'petrol_turbo', hp: 300, nm: 420 },
        ],
      },
      {
        name: 'Clio V 2019-2024',
        variants: [
          { name: '1.0 TCe 100', engineType: 'petrol_turbo', hp: 100, nm: 160 },
          { name: '1.3 TCe 130', engineType: 'petrol_turbo', hp: 130, nm: 240 },
          { name: '1.5 dCi 85', engineType: 'diesel_turbo', hp: 85, nm: 220 },
        ],
      },
    ],
  },
  Jaguar: {
    name: 'Jaguar',
    models: [
      {
        name: 'XE (X760) 2015-2023',
        variants: [
          { name: '2.0d 180', engineType: 'diesel_turbo', hp: 180, nm: 430 },
          { name: '2.0t 250', engineType: 'petrol_turbo', hp: 250, nm: 365 },
          { name: '2.0t 300', engineType: 'petrol_turbo', hp: 300, nm: 400 },
        ],
      },
      {
        name: 'F-Type 2013-2024',
        variants: [
          { name: '2.0T 300', engineType: 'petrol_turbo', hp: 300, nm: 400 },
          { name: '3.0 V6 S/C 380', engineType: 'petrol_turbo', hp: 380, nm: 460 },
          { name: '5.0 V8 S/C 450', engineType: 'petrol_turbo', hp: 450, nm: 580 },
          { name: 'R 5.0 V8 S/C 575', engineType: 'petrol_turbo', hp: 575, nm: 700 },
        ],
      },
      {
        name: 'F-Pace 2016-2024',
        variants: [
          { name: '2.0d 180', engineType: 'diesel_turbo', hp: 180, nm: 430 },
          { name: '3.0d V6 300', engineType: 'diesel_turbo', hp: 300, nm: 700 },
          { name: 'SVR 5.0 V8 550', engineType: 'petrol_turbo', hp: 550, nm: 680 },
        ],
      },
    ],
  },
  'Land Rover': {
    name: 'Land Rover',
    models: [
      {
        name: 'Range Rover Evoque 2011-2018',
        variants: [
          { name: '2.2 SD4 190', engineType: 'diesel_turbo', hp: 190, nm: 420 },
          { name: '2.0 Si4 240', engineType: 'petrol_turbo', hp: 240, nm: 340 },
        ],
      },
      {
        name: 'Range Rover Evoque 2019-2024',
        variants: [
          { name: '2.0 D180', engineType: 'diesel_turbo', hp: 180, nm: 430 },
          { name: '2.0 D240', engineType: 'diesel_turbo', hp: 240, nm: 500 },
          { name: '2.0 P250', engineType: 'petrol_turbo', hp: 250, nm: 365 },
        ],
      },
      {
        name: 'Discovery Sport 2014-2024',
        variants: [
          { name: '2.0 D180', engineType: 'diesel_turbo', hp: 180, nm: 430 },
          { name: '2.0 P250', engineType: 'petrol_turbo', hp: 250, nm: 365 },
          { name: '2.0 D150', engineType: 'diesel_turbo', hp: 150, nm: 380 },
        ],
      },
      {
        name: 'Range Rover Sport L494 2013-2022',
        variants: [
          { name: '3.0 SDV6 306', engineType: 'diesel_turbo', hp: 306, nm: 700 },
          { name: '3.0 V6 S/C 340', engineType: 'petrol_turbo', hp: 340, nm: 450 },
          { name: '5.0 V8 S/C SVR 575', engineType: 'petrol_turbo', hp: 575, nm: 700 },
        ],
      },
      {
        name: 'Defender 2020-2024',
        variants: [
          { name: '2.0 D200', engineType: 'diesel_turbo', hp: 200, nm: 430 },
          { name: '2.0 D240', engineType: 'diesel_turbo', hp: 240, nm: 500 },
          { name: '3.0 D300', engineType: 'diesel_turbo', hp: 300, nm: 650 },
          { name: '5.0 V8 525', engineType: 'petrol_turbo', hp: 525, nm: 625 },
        ],
      },
    ],
  },
  Mazda: {
    name: 'Mazda',
    models: [
      {
        name: '3 (BM/BN) 2013-2019',
        variants: [
          { name: '2.0 Skyactiv-G 120', engineType: 'petrol_na', hp: 120, nm: 210 },
          { name: '2.2 Skyactiv-D 150', engineType: 'diesel_turbo', hp: 150, nm: 380 },
        ],
      },
      {
        name: 'MX-5 ND 2015-2024',
        variants: [
          { name: '1.5 Skyactiv-G 132', engineType: 'petrol_na', hp: 132, nm: 152 },
          { name: '2.0 Skyactiv-G 184', engineType: 'petrol_na', hp: 184, nm: 205 },
        ],
      },
      {
        name: 'CX-5 KF 2017-2024',
        variants: [
          { name: '2.2 Skyactiv-D 150', engineType: 'diesel_turbo', hp: 150, nm: 380 },
          { name: '2.5 Skyactiv-G 194', engineType: 'petrol_na', hp: 194, nm: 258 },
          { name: '2.2 Skyactiv-D 184', engineType: 'diesel_turbo', hp: 184, nm: 445 },
        ],
      },
    ],
  },
  Hyundai: {
    name: 'Hyundai',
    models: [
      {
        name: 'i30 PD 2017-2023',
        variants: [
          { name: '1.4 T-GDi 140', engineType: 'petrol_turbo', hp: 140, nm: 242 },
          { name: '1.6 CRDi 136', engineType: 'diesel_turbo', hp: 136, nm: 300 },
          { name: 'N 2.0T 275', engineType: 'petrol_turbo', hp: 275, nm: 353 },
        ],
      },
      {
        name: 'i20 N 2021-2024',
        variants: [
          { name: '1.6 T-GDi 204', engineType: 'petrol_turbo', hp: 204, nm: 275 },
        ],
      },
      {
        name: 'Tucson NX4 2021-2024',
        variants: [
          { name: '1.6 T-GDi 150', engineType: 'petrol_turbo', hp: 150, nm: 250 },
          { name: '1.6 CRDi 136', engineType: 'diesel_turbo', hp: 136, nm: 320 },
        ],
      },
    ],
  },
  Kia: {
    name: 'Kia',
    models: [
      {
        name: 'Ceed (CD) 2018-2023',
        variants: [
          { name: '1.4 T-GDi 140', engineType: 'petrol_turbo', hp: 140, nm: 242 },
          { name: '1.6 CRDi 136', engineType: 'diesel_turbo', hp: 136, nm: 300 },
          { name: 'GT 1.6 T-GDi 204', engineType: 'petrol_turbo', hp: 204, nm: 265 },
        ],
      },
      {
        name: 'Stinger 2017-2023',
        variants: [
          { name: '2.0 T-GDi 245', engineType: 'petrol_turbo', hp: 245, nm: 353 },
          { name: '3.3 T-GDi GT 370', engineType: 'petrol_turbo', hp: 370, nm: 510 },
          { name: '2.2 CRDi 200', engineType: 'diesel_turbo', hp: 200, nm: 440 },
        ],
      },
      {
        name: 'Sportage NQ5 2022-2024',
        variants: [
          { name: '1.6 T-GDi 150', engineType: 'petrol_turbo', hp: 150, nm: 250 },
          { name: '1.6 CRDi 136', engineType: 'diesel_turbo', hp: 136, nm: 320 },
        ],
      },
    ],
  },
  Mini: {
    name: 'Mini',
    models: [
      {
        name: 'F56 2014-2023',
        variants: [
          { name: 'Cooper S 2.0 192', engineType: 'petrol_turbo', hp: 192, nm: 280 },
          { name: 'One 1.5T 102', engineType: 'petrol_turbo', hp: 102, nm: 180 },
          { name: 'JCW 2.0 231', engineType: 'petrol_turbo', hp: 231, nm: 320 },
          { name: 'Cooper D 1.5 116', engineType: 'diesel_turbo', hp: 116, nm: 270 },
          { name: 'GP3 2.0 306', engineType: 'petrol_turbo', hp: 306, nm: 450 },
        ],
      },
      {
        name: 'Countryman F60 2017-2024',
        variants: [
          { name: 'Cooper S 2.0 192', engineType: 'petrol_turbo', hp: 192, nm: 280 },
          { name: 'Cooper D 2.0 150', engineType: 'diesel_turbo', hp: 150, nm: 330 },
          { name: 'JCW 2.0 306', engineType: 'petrol_turbo', hp: 306, nm: 450 },
        ],
      },
    ],
  },
  Subaru: {
    name: 'Subaru',
    models: [
      {
        name: 'WRX STI 2008-2018',
        variants: [
          { name: '2.5T 300', engineType: 'petrol_turbo', hp: 300, nm: 407 },
        ],
      },
      {
        name: 'BRZ 2012-2024',
        variants: [
          { name: '2.0 NA 200', engineType: 'petrol_na', hp: 200, nm: 205 },
          { name: '2.4 NA 228', engineType: 'petrol_na', hp: 228, nm: 249 },
        ],
      },
      {
        name: 'Impreza WRX 2014-2021',
        variants: [
          { name: '2.0 Turbo 268', engineType: 'petrol_turbo', hp: 268, nm: 350 },
        ],
      },
    ],
  },
  Porsche: {
    name: 'Porsche',
    models: [
      {
        name: '911 (991) 2011-2019',
        variants: [
          { name: 'Carrera 3.0T 370', engineType: 'petrol_turbo', hp: 370, nm: 450 },
          { name: 'Carrera S 3.0T 420', engineType: 'petrol_turbo', hp: 420, nm: 500 },
          { name: 'Turbo 3.8T 540', engineType: 'petrol_turbo', hp: 540, nm: 710 },
          { name: 'Turbo S 3.8T 580', engineType: 'petrol_turbo', hp: 580, nm: 750 },
        ],
      },
      {
        name: 'Macan 2014-2024',
        variants: [
          { name: '2.0T 252', engineType: 'petrol_turbo', hp: 252, nm: 370 },
          { name: 'S 3.0T 354', engineType: 'petrol_turbo', hp: 354, nm: 480 },
          { name: 'GTS 2.9T 380', engineType: 'petrol_turbo', hp: 380, nm: 520 },
          { name: 'Turbo 2.9T 440', engineType: 'petrol_turbo', hp: 440, nm: 550 },
        ],
      },
      {
        name: 'Cayenne E3 2018-2024',
        variants: [
          { name: '3.0T 340', engineType: 'petrol_turbo', hp: 340, nm: 450 },
          { name: 'S 2.9T 440', engineType: 'petrol_turbo', hp: 440, nm: 550 },
          { name: 'Turbo 4.0T 550', engineType: 'petrol_turbo', hp: 550, nm: 770 },
        ],
      },
    ],
  },
  'Alfa Romeo': {
    name: 'Alfa Romeo',
    models: [
      {
        name: 'Giulia 2016-2024',
        variants: [
          { name: '2.0 Turbo 200', engineType: 'petrol_turbo', hp: 200, nm: 330 },
          { name: '2.0 Turbo 280', engineType: 'petrol_turbo', hp: 280, nm: 400 },
          { name: '2.2 JTDm 180', engineType: 'diesel_turbo', hp: 180, nm: 450 },
          { name: 'Quadrifoglio 2.9 V6 510', engineType: 'petrol_turbo', hp: 510, nm: 600 },
        ],
      },
      {
        name: 'Stelvio 2017-2024',
        variants: [
          { name: '2.0 Turbo 200', engineType: 'petrol_turbo', hp: 200, nm: 330 },
          { name: '2.2 JTDm 210', engineType: 'diesel_turbo', hp: 210, nm: 470 },
          { name: 'Quadrifoglio 2.9 V6 510', engineType: 'petrol_turbo', hp: 510, nm: 600 },
        ],
      },
    ],
  },
  Mitsubishi: {
    name: 'Mitsubishi',
    models: [
      {
        name: 'L200 2015-2024',
        variants: [
          { name: '2.4 DI-D 181', engineType: 'diesel_turbo', hp: 181, nm: 430 },
          { name: '2.2 DI-D 150', engineType: 'diesel_turbo', hp: 150, nm: 380 },
        ],
      },
      {
        name: 'Lancer Evo X 2007-2016',
        variants: [
          { name: '2.0 Turbo 295', engineType: 'petrol_turbo', hp: 295, nm: 407 },
          { name: '2.0 Turbo FQ-400 403', engineType: 'petrol_turbo', hp: 403, nm: 500 },
        ],
      },
    ],
  },
  Citroen: {
    name: 'Citroen',
    models: [
      {
        name: 'C4 2020-2024',
        variants: [
          { name: '1.2 PureTech 130', engineType: 'petrol_turbo', hp: 130, nm: 230 },
          { name: '1.5 BlueHDi 130', engineType: 'diesel_turbo', hp: 130, nm: 300 },
        ],
      },
      {
        name: 'DS3 2010-2019',
        variants: [
          { name: '1.6 THP 165', engineType: 'petrol_turbo', hp: 165, nm: 240 },
          { name: '1.6 THP 208 Racing', engineType: 'petrol_turbo', hp: 208, nm: 300 },
        ],
      },
    ],
  },
  Fiat: {
    name: 'Fiat',
    models: [
      {
        name: '500 Abarth 2008-2023',
        variants: [
          { name: '1.4 T-Jet 135', engineType: 'petrol_turbo', hp: 135, nm: 206 },
          { name: '1.4 T-Jet 160', engineType: 'petrol_turbo', hp: 160, nm: 230 },
          { name: '595 Competizione 180', engineType: 'petrol_turbo', hp: 180, nm: 250 },
          { name: '695 Biposto 190', engineType: 'petrol_turbo', hp: 190, nm: 250 },
        ],
      },
    ],
  },
  Suzuki: {
    name: 'Suzuki',
    models: [
      {
        name: 'Swift Sport 2018-2024',
        variants: [
          { name: '1.4 BoosterJet 140', engineType: 'petrol_turbo', hp: 140, nm: 230 },
        ],
      },
      {
        name: 'Jimny 2018-2024',
        variants: [
          { name: '1.5 NA 102', engineType: 'petrol_na', hp: 102, nm: 130 },
        ],
      },
    ],
  },
  Isuzu: {
    name: 'Isuzu',
    models: [
      {
        name: 'D-Max 2020-2024',
        variants: [
          { name: '1.9 DDi 164', engineType: 'diesel_turbo', hp: 164, nm: 360 },
        ],
      },
    ],
  },
};
