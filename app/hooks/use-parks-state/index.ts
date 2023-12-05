import { fetcher } from '@/app/utils/api';
import { ParkResponse } from '@/nps-api/parks/types';
import useSWR from 'swr';

export const useParksState = (stateCode: string) => {
  const apiUrl =
    process.env.NEXT_PUBLIC_VISITED_PARKS_ENABLED === 'true'
      ? `${process.env.NEXT_PUBLIC_API_URL}/parks/${stateCode}`
      : `https://developer.nps.gov/api/v1/parks?stateCode=${stateCode}&api_key=${process.env.NEXT_PUBLIC_NP_API_KEY}`;

  const { data, error, isLoading, mutate } = useSWR<ParkResponse>(
    apiUrl,
    fetcher
  );

  return {
    data,
    isLoading,
    error,
    mutate,
  };
};
