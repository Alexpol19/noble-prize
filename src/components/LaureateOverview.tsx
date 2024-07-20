import { LaureatesTable } from './LaureatesTable'
import { useLaureate, useSearchLaureates } from '../hooks'
import { useState } from 'react'

const LaureateOverview = () => {
  const [ laureateId, setLaureateId ] = useState<number>(0);
  const [ laureateName, setName ] = useState('');
  const [ laureateResidence, setResidence ] = useState('');
  const [ lastChanged, setLastChanged ] = useState<'name' | 'residence'>('name');

  const {
    isPending: isPendingLaureates,
    error: errorLaureates,
    data: dataLaureates,
    isFetching: isFetchingLaureates
  } = useSearchLaureates(lastChanged === 'name' ? laureateName : '', lastChanged === 'residence' ? laureateResidence : '');

  const {
    isPending: isPendingLaureate,
    error: errorLaureate,
    data: dataLaureate,
    isFetching: isFetchingLaureate
  } = useLaureate(laureateId);

  console.log(dataLaureate)
  return (
    <div>
      <h2 className='text-3xl font-semibold text-center mt-7 mb-5'>Laureate Overview:</h2>

      <div className='flex items-center gap-5'>
        <h3 className='text-2xl font-semibold text-center my-0'>Search for a Laureate:</h3>
        <input
          className="w-full flex-1 rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring "
          placeholder='Enter laureate name...'
          value={laureateName}
          onChange={(e) => {
            setName(e.target.value);
            setLastChanged('name')
          }}
        />
        <input
          className="w-full flex-1 rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring "
          placeholder='Enter laureate residence...'
          value={laureateResidence}
          onChange={(e) => {
            setResidence(e.target.value);
            setLastChanged('residence')
          }}
        />
      </div>

      {/* <Modal /> */}
      <LaureatesTable
        data={dataLaureates}
        handleRowClick={setLaureateId}
        loading={isFetchingLaureates}
      />
    </div>
    )
}

export default LaureateOverview;