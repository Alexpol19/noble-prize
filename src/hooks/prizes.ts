import {
  useQuery,
} from '@tanstack/react-query'
import { getPrizes, getPrize } from '../api';

// get all prizes
const getAllPrizes = async (nobelPrizeYear?: number, yearTo?: number) => {
  let prizes:any[] = [];
  let offset = 0;
  const limit = 100;
  let total = 0;

  do {
    const data = await getPrizes(offset, limit, nobelPrizeYear, yearTo);
    prizes = prizes.concat(data.nobelPrizes);
    total = data.meta.count;
    offset += limit;
  } while (prizes.length < total);

  return prizes;
};

const usePrizes = (nobelPrizeYear?: number, yearTo?: number) => {
  const { isPending, error, data, isFetching } = useQuery({
    queryKey: ['prizes', nobelPrizeYear, yearTo],
    queryFn: () => getAllPrizes(nobelPrizeYear, yearTo),
    staleTime: Infinity,
  });

  return { isPending, error, data, isFetching };
};

// get 1 prize
const usePrize = (category: string, year: number) => {
  const { isPending, error, data, isFetching } = useQuery({
    queryKey: ['prize', category, year],
    queryFn: () => getPrize(category, year),
    staleTime: Infinity,
  });

  return { isPending, error, data, isFetching };
};

export { usePrizes, usePrize };
