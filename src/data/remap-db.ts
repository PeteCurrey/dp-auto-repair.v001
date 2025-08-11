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
        ],
      },
      {
        name: 'A4 (B9) 2016-2023',
        variants: [
          { name: '2.0 TDI 190', engineType: 'diesel_turbo', hp: 190, nm: 400 },
          { name: '2.0 TFSI 252', engineType: 'petrol_turbo', hp: 252, nm: 370 },
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
        ],
      },
      {
        name: '1 Series F20 2011-2019',
        variants: [
          { name: '118i 136', engineType: 'petrol_turbo', hp: 136, nm: 220 },
          { name: '120d 184', engineType: 'diesel_turbo', hp: 184, nm: 380 },
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
        ],
      },
      {
        name: 'Passat B8 2014-2023',
        variants: [
          { name: '2.0 TDI 190', engineType: 'diesel_turbo', hp: 190, nm: 400 },
        ],
      },
      {
        name: 'Transporter T6 2015-2020',
        variants: [
          { name: '2.0 TDI 150', engineType: 'diesel_turbo', hp: 150, nm: 340 },
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
        ],
      },
      {
        name: 'Mondeo Mk5 2014-2022',
        variants: [
          { name: '2.0 TDCi 180', engineType: 'diesel_turbo', hp: 180, nm: 400 },
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
        ],
      },
      {
        name: 'A-Class W177 2018-2023',
        variants: [
          { name: 'A200 163', engineType: 'petrol_turbo', hp: 163, nm: 250 },
          { name: 'A180d 116', engineType: 'diesel_turbo', hp: 116, nm: 260 },
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
        name: 'GT86 2012-2021',
        variants: [
          { name: '2.0 NA 200', engineType: 'petrol_na', hp: 200, nm: 205 },
        ],
      },
      {
        name: 'Avensis 2015-2018',
        variants: [
          { name: '2.0 D-4D 143', engineType: 'diesel_turbo', hp: 143, nm: 320 },
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
    ],
  },
};
