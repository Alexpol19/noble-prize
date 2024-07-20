
import { LaureatesTable } from './LaureatesTable'
import Modal from './Modal'
import { SelectSearch } from './SelectSearch'
import { PrizeChart } from './PrizeChart'
import { usePrizes } from '../hooks'
import { useLaureates } from '../hooks/laureates'
import { SelectYearRange } from './SelectYearRange'
import { useMemo, useState } from 'react'
import { v4 as uuidv4 } from 'uuid';

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

const PrizeOverview = () => {
  const [yearsRange, setYearsRange] = useState([1901, 1909])

  const {
    isPending,
    error,
    data,
    isFetching
  } = usePrizes(yearsRange[0], yearsRange[1]);
  const {
    isPending: isPendingLaureates,
    error: errorLaureates,
    data: dataLaureates,
    isFetching: isFetchingLaureates
  } = useLaureates(yearsRange[0], yearsRange[1]);

  const categoryAwards = useMemo(() => countCategories(data || []), [data]);

  return (
    <div className="m-auto mt-6 flex max-w-[1000px] flex-col gap-4 px-10 py-2.5">
      <h1 className='text-4xl font-semibold text-center'>Nodel Prizes and Laureates</h1>
      <h2 className='text-3xl font-semibold text-center mt-7 mb-5'>Prize Overview:</h2>

      <div className='flex items-center gap-10'>
        <h3 className='text-2xl font-semibold text-center my-0'>Filter by year range</h3>
        <SelectYearRange
          value={`${yearsRange[0]}-${yearsRange[1]}`}
          handleChangeValue={(range:string) => {
            const years = range.split('-');
            setYearsRange([+years[0], +years[1]])
          }}
        />
      </div>
      <h3 className='text-2xl font-semibold text-center mt-7 mb-5'>Nodel prizes</h3>
      <div className="grid grid-cols-3 gap-3">
        {data?.map((prize) => (
          <div
            key={uuidv4()}
            className='flex gap-3'
          >
            <span>{prize.dateAwarded}</span>
            <span>{prize.prizeAmountAdjusted}</span>
            <span>{prize.category.en}</span>
          </div>
        ))}
      </div>

      <h3 className='text-2xl font-semibold text-center mt-7 mb-5'>Nodel Laureates</h3>
      <div className="grid grid-cols-3 gap-3">
        {dataLaureates?.map((laureate) => (
          <div
            key={laureate.id}
            className='flex gap-3'
          >
            <span>{laureate.fullName?.en || laureate.orgName?.en}</span>
          </div>
        ))}
      </div>

      <PrizeChart
        subtitle={`${yearsRange[0]}-${yearsRange[1]}`}
        data={categoryAwards}
      />

      <h3 className='text-2xl font-semibold text-center mt-7 mb-5'>-------------------------</h3>

      <Modal />
      <SelectSearch />
      <LaureatesTable />
    </div>
    )
}

export default PrizeOverview;