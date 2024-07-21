import { useState } from 'react'
import SearchLaureate from './SearchLaureate';
import LaureatesContainer from './LaureatesContainer';
import LaureateModalContainer from './LaureateModalContainer';

const LaureateOverview = () => {
  const [ laureateId, setLaureateId ] = useState<number>(0);

  const [ laureateName, setName ] = useState('');
  const [ laureateResidence, setResidence ] = useState('');
  const [ lastChanged, setLastChanged ] = useState<'name' | 'residence'>('name');

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
      <div className="mb-7"/>
      <LaureatesContainer
        laureateName={laureateName}
        laureateResidence={laureateResidence}
        lastChanged={lastChanged}
        setLaureateId={setLaureateId}
      />
      <LaureateModalContainer
        setLaureateId={setLaureateId}
        laureateId={laureateId}
      />
    </div>
  )
}

export default LaureateOverview;