import { v4 as uuidv4 } from 'uuid';
import Modal from '../ui/Modal';
import { formatDate } from '../utils';

const PrizesModal = ({
  prizes,
  awardYear,
  open,
  loading,
  onOpenChange
}: {
  prizes: any[],
  awardYear: string | null
  open: boolean,
  loading: boolean,
  onOpenChange: (open: boolean) => void
}) => (
  <Modal
    title={`Prizes ${awardYear}`}
    open={open}
    onOpenChange={onOpenChange}
    content={
      <>
        {prizes && !loading && prizes.map((prize, i) => (
          <div key={uuidv4()} className={`${i !== prizes.length -1 && 'border-b border-gray-300 mt-3'}`}>
            <span className='text-lg font-bold mb-3'>{prize.categoryFullName.en}</span>
            <p className="my-3 flex gap-3">
              <span className='font-semibold'>Awarded at:</span>
              <span>{prize.dateAwarded && formatDate(prize.dateAwarded) || awardYear}</span>
            </p>

            <p className="my-3 flex gap-3">
              <span className='font-semibold'>Prize amount adjusted:</span>
              <span>{prize.prizeAmountAdjusted.toLocaleString()}</span>
            </p>
            
            <h4 className='text-lg font-semibold'>Laureates:</h4>

            <div className='pl-2'>
              {prize.laureates.map((laureate: any, i: number) => (
                <div key={laureate.id} className={`${i !== prize.laureates.length -1 && 'border-b border-gray-300 mb-2'}`}>
                    <span className='text-base font-bold mb-3'>{laureate.fullName?.en || laureate.orgName?.en}</span>
                    <p className="my-3">
                      <span className='font-semibold'>Motivation: </span>
                      <span>{laureate.motivation.en}</span>
                    </p>
                </div>
              ))}
            </div>
          </div>
        ))}

        {!prizes && !loading && (
          <h4 className="w-full py-3 text-2xl font-semibold text-center my-0">No data found</h4>
        )}
        {loading && (
          <h4 className="w-full py-3 text-2xl font-semibold text-center my-0 text-gray-600">Loading...</h4>
        )}
      </>
    }
  />
);

export default PrizesModal;