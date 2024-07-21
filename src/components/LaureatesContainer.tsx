import { LaureatesTable } from './LaureatesTable'
import { useLaureate, useSearchLaureates } from '../hooks'
import { useState } from 'react'
import LaureateModal from './LaureateModal';

const LaureatesContainer = ({
  laureateName,
  laureateResidence,
  lastChanged,
}: {
  laureateName: string,
  laureateResidence: string,
  lastChanged: 'name' | 'residence',
}) => {
  const [ laureateId, setLaureateId ] = useState<number>(0);

  const {
    data: dataLaureates,
    isFetching: isFetchingLaureates
  } = useSearchLaureates(lastChanged === 'name' ? laureateName : '', lastChanged === 'residence' ? laureateResidence : '');

  const {
    data: dataLaureate,
    isFetching: isFetchingLaureate
  } = useLaureate(laureateId);

  return (
    <>
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
    </>
    )
}

export default LaureatesContainer;