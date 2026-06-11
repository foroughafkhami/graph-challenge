/** Shapes mirror the fake backend's flight payload (see CLAUDE.md). */

export type FlightClass = 'economy' | 'business';

export type Place = {
  country: string;
  iso3: string;
  /** ISO 8601 timestamp. */
  time: string;
  airline: string;
};

export type Flight = {
  logoSrc: string;
  logoStyle: { height: string; margin: string };
  /** Origin. */
  src: Place;
  /** Destination. */
  dst: Place;
  /** Seconds before departure that boarding opens, sent as a string. */
  boarding: string;
  transfer: boolean;
  gates: number;
  seat: string;
  price: string;
  class: FlightClass;
};
