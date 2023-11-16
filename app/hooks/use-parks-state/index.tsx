import { fetcher } from '@/app/utils/api';
import { ParkResponse } from '@/nps-api/parks/types';
import useSWR from 'swr';

export const useParksState = (stateCode: string) => {
  const { data, error, isLoading, mutate } = useSWR<ParkResponse>(
    `${process.env.NEXT_PUBLIC_API_URL}/parks/${stateCode}`,
    fetcher
  );

  return {
    data,
    isLoading,
    error,
    mutate,
  };
};
