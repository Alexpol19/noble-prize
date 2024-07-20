import axios from "axios"

export const getPrizes = async (offset = 0, limit = 100, nobelPrizeYear?: number, yearTo?: number) => {
  const response = await axios.get(`https://api.nobelprize.org/2.1/nobelPrizes?offset=${offset}&limit=${limit}${nobelPrizeYear && yearTo ? `&nobelPrizeYear=${nobelPrizeYear}&yearTo=${yearTo}` : ''}`);
  return response.data;
};

export const getPrize = async (category: string, year: number) => {
  const response = await axios.get(`https://api.nobelprize.org/2.1/nobelPrize/${category}/${year}`);
  return response.data;
};

