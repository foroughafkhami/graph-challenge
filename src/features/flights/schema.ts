import { z } from 'zod';

export const flightClassSchema = z.enum(['economy', 'business']);

export const placeSchema = z.object({
  country: z.string(),
  iso3: z.string(),
  /** ISO 8601 timestamp. */
  time: z.string(),
  airline: z.string(),
});

export const flightSchema = z.object({
  logoSrc: z.string(),
  logoStyle: z.object({ height: z.string(), margin: z.string() }),
  src: placeSchema,
  dst: placeSchema,
  boarding: z.string(),
  transfer: z.boolean(),
  gates: z.number(),
  seat: z.string(),
  price: z.string(),
  class: flightClassSchema,
});

export const flightListResponseSchema = z.object({
  total: z.number(),
  result: z.array(flightSchema),
});

export type FlightClass = z.infer<typeof flightClassSchema>;
export type Place = z.infer<typeof placeSchema>;
export type Flight = z.infer<typeof flightSchema>;
export type FlightListResponse = z.infer<typeof flightListResponseSchema>;
