import {
  useQuery,
} from '@tanstack/react-query'
import { getLaureates, getLaureate } from '../api';

// get all laureates
const getAllLaureates = async (nobelPrizeYear?: number, yearTo?: number) => {
  let laureates:any[] = [];
  let offset = 0;
  const limit = 100;
  let total = 0;

  do {
    const data = await getLaureates(offset, limit, nobelPrizeYear, yearTo);
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

// get 1 laureate
const useLaureate = (laureateID: number) => {
  const { isPending, error, data, isFetching } = useQuery({
    queryKey: ['laureate', laureateID],
    queryFn: () => getLaureate(laureateID),
    staleTime: Infinity,
  });

  return { isPending, error, data, isFetching };
};

export { useLaureates, useLaureate };
