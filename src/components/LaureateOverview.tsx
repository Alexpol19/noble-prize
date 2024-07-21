import { LaureatesTable } from './LaureatesTable'
import { useLaureate, useSearchLaureates } from '../hooks'
import { useState } from 'react'
import LaureateModal from './LaureateModal';
import SearchLaureate from './SearchLaureate';

const LaureateOverview = () => {
  const [ laureateId, setLaureateId ] = useState<number>(0);
  const [ laureateName, setName ] = useState('');
  const [ laureateResidence, setResidence ] = useState('');
  const [ lastChanged, setLastChanged ] = useState<'name' | 'residence'>('name');

  const {
    data: dataLaureates,
    isFetching: isFetchingLaureates
  } = useSearchLaureates(lastChanged === 'name' ? laureateName : '', lastChanged === 'residence' ? laureateResidence : '');

  const {
    data: dataLaureate,
    isFetching: isFetchingLaureate
  } = useLaureate(laureateId);

  const onInputChange = (value: string, field: 'name' | 'residence') => {
    if(field === 'name') {
      setName(value);
    } else {
      setResidence(value);
    }
    setLastChanged(field);
  }

  return (
    <div>
      <h2 className='text-3xl font-semibold text-center mt-7 mb-5'>Laureate Overview:</h2>

      <SearchLaureate
        laureateName={laureateName}
        laureateResidence={laureateResidence}
        onInputChange={onInputChange}
      />

      <LaureatesTable
        data={dataLaureates}
        handleRowClick={setLaureateId}
        loading={isFetchingLaureates}
      />
      <LaureateModal
        laureate={dataLaureate?.length && dataLaureate[0]}
        open={!!laureateId}
        loading={isFetchingLaureate}
        onOpenChange={(open) => !open && setLaureateId(0)}
      />
    </div>
    )
}

export default LaureateOverview;