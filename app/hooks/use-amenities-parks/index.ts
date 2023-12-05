import { fetcher } from '@/app/utils/api';
import useSWR from 'swr';

export const useAmenitiesParks = (ids: string[]) => {
  const idParams = ids.map((id) => `id=${id}`).join('&');

  const apiUrl = `https://developer.nps.gov/api/v1/amenities/parksplaces?${idParams}&api_key=${process.env.NEXT_PUBLIC_NP_API_KEY}`;

  console.log('apiUrl', apiUrl);
  const { data, error, isLoading, mutate } = useSWR<any>(apiUrl, fetcher);

  return {
    data,
    isLoading,
    error,
    mutate,
  };
};
