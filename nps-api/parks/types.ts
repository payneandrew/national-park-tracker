import { z } from "zod";
import { ParkData, ParkDetail, ParkResponse } from "./schemas";

export type ParkData = z.infer<typeof ParkData>;

export type ParkResponse = z.infer<typeof ParkResponse>;

export type ParkDetail = z.infer<typeof ParkDetail>;
