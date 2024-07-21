import { useEffect, useState } from "react";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { format, parseISO, isValid } from 'date-fns';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export default function useDebounce(value: any, delay: number) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(
    () => {
      const handler = setTimeout(() => {
        setDebouncedValue(value);
      }, delay);

      return () => {
        clearTimeout(handler);
      };
    },
    [value, delay]
  );

  return debouncedValue;
}

export const formatDate = (dateString: string) => {
  const parsedDate = parseISO(dateString);
  if (isValid(parsedDate)) {
    return format(parsedDate, "dd MMMM yyyy");
  }
  return "";
};

export const extractYear = (dateString:string) => {
  const datePattern = /^\d{4}-\d{2}-\d{2}$/;
  if (datePattern.test(dateString)) {
    const [year] = dateString.split('-').map(Number);
    return year;
  }
  return 'Invalid Date';
};
