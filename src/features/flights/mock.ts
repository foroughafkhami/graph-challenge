import type { Flight } from '@/features/flights/types';

/**
 * Static fixtures used to build the dashboard UI ahead of the data layer.
 * Replaced by the `/list` query in a later task.
 */
export const MOCK_FLIGHTS: Flight[] = [
  {
    logoSrc: '',
    logoStyle: { height: '24px', margin: '0' },
    src: { country: 'Bengaluru', iso3: 'BLR', time: '2023-06-12T06:20:00Z', airline: 'Lufthansa' },
    dst: { country: 'New Delhi', iso3: 'DEL', time: '2023-06-12T08:45:00Z', airline: 'Lufthansa' },
    boarding: '2700',
    transfer: false,
    gates: 8,
    seat: '20A',
    price: '100',
    class: 'economy',
  },
  {
    logoSrc: '',
    logoStyle: { height: '24px', margin: '0' },
    src: { country: 'Mumbai', iso3: 'BOM', time: '2023-06-12T09:10:00Z', airline: 'Emirates' },
    dst: { country: 'Dubai', iso3: 'DXB', time: '2023-06-12T12:05:00Z', airline: 'Emirates' },
    boarding: '3600',
    transfer: true,
    gates: 14,
    seat: '4C',
    price: '320',
    class: 'business',
  },
  {
    logoSrc: '',
    logoStyle: { height: '24px', margin: '0' },
    src: { country: 'Chennai', iso3: 'MAA', time: '2023-06-12T14:40:00Z', airline: 'IndiGo' },
    dst: { country: 'Kolkata', iso3: 'CCU', time: '2023-06-12T16:55:00Z', airline: 'IndiGo' },
    boarding: '1800',
    transfer: false,
    gates: 3,
    seat: '12F',
    price: '75',
    class: 'economy',
  },
];
