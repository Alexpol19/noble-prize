import { v4 as uuidv4 } from 'uuid';
import { format } from "date-fns";
import Modal from '../ui/Modal';
import { extractYear, formatDate } from '../utils';

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
          <div key={prize.id} className={`${i !== prizes.length -1 && 'border-b border-gray-300 mt-3'}`}>
            <span className='text-lg font-bold mb-3'>{prize.categoryFullName.en}</span>
            <p className="my-3 flex gap-3">
              <span>Awarded at:</span>
              <span>{format(prize.dateAwarded, "dd MMMM yyyy")}</span>
            </p>

            <p className="my-3 flex gap-3">
              <span>Prize amount adjusted:</span>
              <span>{prize.prizeAmountAdjusted.toLocaleString()}</span>
            </p>
            
            <h4 className='text-lg font-semibold'>Laureates ({prize.laureates.length}):</h4>

            {/* <div className='pl-2'>
              {prize.laureates.map((laureate: any, i: number) => (
                <div key={uuidv4()} className={`${i !== prize.laureates.length -1 && 'border-b border-gray-300 mb-2'}`}>
                    <span className='text-lg font-bold mb-3'>{laureate.fullName?.en || laureate.orgName?.en}</span>
                    <p className="my-3 flex gap-3">
                      <span>{laureate.birth?.date ? 'Born' : 'Founded'}:</span>
                      <span>
                        {
                          laureate.birth?.date
                            ? (formatDate(laureate.birth.date) || extractYear(laureate.birth.date ))
                            : (formatDate(laureate.founded.date) || extractYear(laureate.founded.date ))
                        }
                      </span>
                    </p>
                    {laureate.death && <p className="my-3 flex gap-3">
                      <span>Dead:</span>
                      <span>{format(laureate.death.date, "dd MMMM yyyy")}</span>
                    </p>}
                </div>
              ))}
            </div> */}
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