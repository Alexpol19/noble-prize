import axios from "axios"

export const getLaureates = async (offset = 0, limit = 100, nobelPrizeYear?: number, yearTo?: number) => {
  const response = await axios.get(`https://api.nobelprize.org/2.1/laureates?offset=${offset}&limit=${limit}${nobelPrizeYear && yearTo ? `&nobelPrizeYear=${nobelPrizeYear}&yearTo=${yearTo}` : ''}`);
  return response.data;
};

export const getLaureate = async (laureateID: number) => {
  const response = await axios.get(`https://api.nobelprize.org/2.1//laureate/${laureateID}`);
  return response.data;
};

