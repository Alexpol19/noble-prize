import { PrizeChart } from './PrizeChart'
import { usePrizes, useLaureates } from '../hooks'
import { useMemo } from 'react'
import { LaureatesNumberChart } from './LaureatesNumberChart';
import { PrizeAmountChart } from './PrizeAmountChart';

const countCategories = (data: any[]):Record<string, number> => {
  return data.reduce((acc, item) => {
    const category = item.category.en;
    if (acc[category]) {
      acc[category] += 1;
    } else {
      acc[category] = 1;
    }
    return acc;
  }, {});
};

const groupPrizesByYear = (prizes: any[]):Record<string, any> => prizes.reduce((acc, prize) => {
  const { awardYear } = prize;
  if (!acc[awardYear]) {
      acc[awardYear] = [];
  }
  acc[awardYear].push(prize);
  return acc;
}, {});

const groupLaureatesByYear = (laureates: any[], yearsRange: number[]):Record<string, any> => {
  const [minYear, maxYear] = yearsRange;

  return laureates.reduce((acc, laureate) => {
      laureate.nobelPrizes.forEach((prize: any) => {
          const { awardYear } = prize;
          if (awardYear >= minYear && awardYear <= maxYear) {
              if (!acc[awardYear]) {
                  acc[awardYear] = [];
              }
              acc[awardYear].push(laureate);
          }
      });
      return acc;
  }, {});
};

const PrizeCharts = ({
  yearsRange,
}: {
  yearsRange: [number, number]
}) => {
  const {
    data,
  } = usePrizes(yearsRange[0], yearsRange[1]);
  const {
    data: dataLaureates,
  } = useLaureates(yearsRange[0], yearsRange[1]);

  const categoryAwards = useMemo(() => countCategories(data || []), [data]);

  const groupedPrizesPerYear = useMemo(() => groupPrizesByYear(data || []), [data]);
  const groupedLaureatesPerYear = useMemo(() => groupLaureatesByYear(dataLaureates || [], yearsRange), [dataLaureates]);

  return (
    <>
      <div className="mb-7" />
      <PrizeAmountChart
        title="Adjusted award amount"
        subtitle={`${yearsRange[0]}-${yearsRange[1]}`}
        data={groupedPrizesPerYear}
      />
      <div className="mb-7" />
      <LaureatesNumberChart
        title="Number of laureates"
        subtitle={`${yearsRange[0]}-${yearsRange[1]}`}
        data={groupedLaureatesPerYear}
      />
      <div className="mb-7" />
      <PrizeChart
        subtitle={`${yearsRange[0]}-${yearsRange[1]}`}
        data={categoryAwards}
      />
    </>
    )
}

export default PrizeCharts;