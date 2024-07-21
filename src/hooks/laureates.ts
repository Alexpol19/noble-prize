import {
  useQuery,
} from '@tanstack/react-query'
import { getLaureates, getLaureate } from '../api';
import useDebounce from '../utils';

// get all laureates
const getAllLaureates = async (nobelPrizeYear?: number, yearTo?: number, name?: string, residence?: string) => {
  let laureates:any[] = [];
  let offset = 0;
  const limit = 100;
  let total = 0;

  do {
    const data = await getLaureates(offset, limit, nobelPrizeYear, yearTo, name, residence);
    laureates = laureates.concat(data.laureates);
    total = data.meta.count;
    offset += limit;
  } while (laureates.length < total);

  return laureates;
};

const useLaureates = (nobelPrizeYear?: number, yearTo?: number) => {
  const { isPending, error, data, isFetching } = useQuery({
    queryKey: ['laureates', nobelPrizeYear, yearTo],
    queryFn: () => getAllLaureates(nobelPrizeYear, yearTo),
    staleTime: Infinity,
  });

  return { isPending, error, data, isFetching };
};

// search laureates by name or by residence
const useSearchLaureates = (name?:string, residence?:string) => {

  const debouncedName = useDebounce(name, 1000);
  const debouncedResidence = useDebounce(residence, 1000);
  const shouldFetch = debouncedName || debouncedResidence ? true : false;

  const { isPending, error, data, isFetching } = useQuery({
    queryKey: ['laureatesSearch', debouncedName, debouncedResidence],
    queryFn: () => getAllLaureates(undefined, undefined, debouncedName, debouncedResidence),
    staleTime: Infinity,
    enabled: shouldFetch,
  });

  return { isPending, error, data, isFetching };
};

// get 1 laureate
const useLaureate = (laureateID: number) => {
  const { isPending, error, data, isFetching } = useQuery({
    queryKey: ['laureate', laureateID],
    queryFn: () => getLaureate(laureateID),
    enabled: !!laureateID,
    staleTime: Infinity,
  });

  return { isPending, error, data, isFetching };
};

export { useLaureates, useLaureate, useSearchLaureates };
