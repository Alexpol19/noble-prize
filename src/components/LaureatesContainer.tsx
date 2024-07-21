import { LaureatesTable } from './LaureatesTable'
import { useSearchLaureates } from '../hooks'
import { memo } from 'react';

const LaureatesContainer = memo(({
  laureateName,
  laureateResidence,
  lastChanged,
  setLaureateId,
}: {
  laureateName: string,
  laureateResidence: string,
  lastChanged: 'name' | 'residence',
  setLaureateId: (id: number) => void,
}) => {
  const {
    data: dataLaureates,
    isFetching: isFetchingLaureates
  } = useSearchLaureates(lastChanged === 'name' ? laureateName : '', lastChanged === 'residence' ? laureateResidence : '');

  return (
    <LaureatesTable
      data={dataLaureates}
      handleRowClick={setLaureateId}
      loading={isFetchingLaureates}
    />
  )
})

export default LaureatesContainer;