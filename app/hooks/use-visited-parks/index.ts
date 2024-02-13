import { fetcher } from '@/app/utils/api';
import axios from 'axios';
import useSWR from 'swr';

const useVisitedParks = () => {
  const { data: parkCodes } = useSWR<string[]>(
    `${process.env.NEXT_PUBLIC_API_URL}/visited-parks/park-codes`,
    fetcher
  );

  const isParkVisited = (parkCode: string) => {
    return parkCodes ? parkCodes.includes(parkCode) : false;
  };

  const toggleVisited = async (
    parkCode: string,
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.stopPropagation();
    event.preventDefault();

    isParkVisited(parkCode) === true
      ? await axios.delete(
          `${process.env.NEXT_PUBLIC_API_URL}/visited-parks/${parkCode}`,
          {
            headers: {
              Accept: 'application/json',
            },
          }
        )
      : await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/visited-parks/${parkCode}`,
          {
            headers: {
              Accept: 'application/json',
            },
          }
        );
  };

  return { isParkVisited, toggleVisited };
};

export default useVisitedParks;
