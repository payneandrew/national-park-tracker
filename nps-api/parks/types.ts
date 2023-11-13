import { z } from 'zod';
import { Image, Images, ParkData, ParkDetail, ParkResponse } from './schemas';

export type ParkData = z.infer<typeof ParkData>;

export type ParkResponse = z.infer<typeof ParkResponse>;

export type ParkDetail = z.infer<typeof ParkDetail>;

export type Images = z.infer<typeof Images>;

export type ParkImage = z.infer<typeof Image>;
