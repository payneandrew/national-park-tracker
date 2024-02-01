import { fetcher } from '@/app/utils/api';
import useSWR from 'swr';

export const useCampgroundsPark = (parkCode: string) => {
  const apiUrl = `https://developer.nps.gov/api/v1/campgrounds?api_key=${process.env.NEXT_PUBLIC_NP_API_KEY}&parkCode=${parkCode}`;

  const { data, error, isLoading, mutate } = useSWR(apiUrl, fetcher);

  return {
    data,
    isLoading,
    error,
    mutate,
  };
};
