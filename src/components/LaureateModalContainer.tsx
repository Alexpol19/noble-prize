import { memo } from 'react';
import { useLaureate } from '../hooks'
import LaureateModal from './LaureateModal';

const LaureateModalContainer = memo(({
  setLaureateId,
  laureateId,
}: {
  laureateId: number,
  setLaureateId: (id: number) => void,
}) => {
  const {
    data: dataLaureate,
    isFetching: isFetchingLaureate
  } = useLaureate(laureateId);

  return (
    <LaureateModal
      laureate={dataLaureate?.length && dataLaureate[0]}
      open={!!laureateId}
      loading={isFetchingLaureate}
      onOpenChange={(open) => !open && setLaureateId(0)}
    />
  )
})

export default LaureateModalContainer;