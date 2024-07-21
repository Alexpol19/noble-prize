import { SelectYearRange } from './SelectYearRange'
import { useState } from 'react'
import PrizeCharts from './PrizeCharts';

const PrizeOverview = () => {
  const [yearsRange, setYearsRange] = useState<[number, number]>([1901, 1909])

  return (
    <div>
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
      <PrizeCharts yearsRange={yearsRange} />
    </div>
    )
}

export default PrizeOverview;