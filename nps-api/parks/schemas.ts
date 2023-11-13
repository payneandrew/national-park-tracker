import { z } from 'zod';

export const Image = z.object({
  credit: z.string(),
  altText: z.string(),
  title: z.string(),
  caption: z.string(),
  url: z.string(),
});

export const Images = z.array(Image);

export const ParkDetail = z.object({
  states: z.string(),
  weatherInfo: z.string(),
  directionsInfo: z.string(),
  addresses: z.array(z.unknown()),
  entranceFees: z.array(
    z.object({
      cost: z.string(),
      description: z.string(),
      title: z.string(),
    })
  ),
  topics: z.array(z.unknown()),
  name: z.string(),
  latitude: z.string(),
  activities: z.array(z.unknown()),
  operatingHours: z.array(z.unknown()),
  url: z.string(),
  longitude: z.string(),
  contacts: z.object({}),
  entrancePasses: z.array(z.unknown()),
  parkCode: z.string(),
  designation: z.string(),
  images: Images.optional(),
  fullName: z.string(),
  latLong: z.string(),
  id: z.string(),
  directionsUrl: z.string(),
  description: z.string(),
});

export const ParkData = z.array(ParkDetail);

export const ParkResponse = z.object({
  total: z.string(),
  data: ParkData,
  limit: z.string(),
  start: z.string(),
});
