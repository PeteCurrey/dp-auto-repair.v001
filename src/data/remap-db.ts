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
        ],
      },
      {
        name: 'Passat B8 2014-2023',
        variants: [
          { name: '2.0 TDI 190', engineType: 'diesel_turbo', hp: 190, nm: 400 },
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
};
