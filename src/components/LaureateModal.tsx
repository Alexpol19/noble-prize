import { v4 as uuidv4 } from 'uuid';
import { format } from "date-fns";
import Modal from '../ui/Modal';
import { extractYear, formatDate } from '../utils';
import { memo } from 'react';

const LaureateModal = memo(({
  laureate,
  open,
  loading,
  onOpenChange
}: {
  laureate: any,
  open: boolean,
  loading: boolean,
  onOpenChange: (open: boolean) => void
}) => (
  <Modal
    title={laureate && !loading ? laureate.fullName?.en || laureate.orgName?.en : ''}
    titleHref={laureate && !loading ? laureate.wikipedia?.english : ''}
    open={open}
    onOpenChange={onOpenChange}
    content={
      <>
        {laureate && !loading && (
          <div>
            <p className="my-3 flex gap-3">
              <span className='font-semibold'>{laureate.birth?.date ? 'Born' : 'Founded'}:</span>
              <span>
                {
                  laureate.birth?.date
                    ? (formatDate(laureate.birth.date) || extractYear(laureate.birth.date ))
                    : (formatDate(laureate.founded.date) || extractYear(laureate.founded.date ))
                }
              </span>
            </p>
            {laureate.death && <p className="my-3 flex gap-3">
              <span className='font-semibold'>Died:</span>
              <span>{format(laureate.death.date, "dd MMMM yyyy")}</span>
            </p>}
            
            <h4 className='text-lg font-semibold'>Prizes:</h4>

            <div className='pl-2'>
              {laureate.nobelPrizes.map((prize: any, i: number) => (
                <div key={uuidv4()} className={`${i !== laureate.nobelPrizes.length -1 && 'border-b border-gray-300 mb-2'}`}>
                  <p className="my-3 flex gap-3 font-semibold">
                    {prize.categoryFullName.en} {prize.awardYear}
                  </p>
                  <p className="my-3">
                    <span className='font-semibold'>Prize motivation: </span>
                    {prize.motivation.en}
                  </p>
                  <p className="my-3 flex gap-3">
                    <span className='font-semibold'>Prize portion: </span>
                    {prize.portion}
                  </p>
                  <p className="my-3 flex gap-3">
                    <span className='font-semibold'>Prize amount: </span>
                    {prize.prizeAmount}
                  </p>
                  {prize.residences?.length && (
                    <p className="my-3 flex gap-3">
                    <span className='font-semibold'>Residence: </span>
                      {prize.residences[0].locationString.en}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {!laureate && !loading && (
          <h4 className="w-full py-3 text-2xl font-semibold text-center my-0">No data found</h4>
        )}
        {loading && (
          <h4 className="w-full py-3 text-2xl font-semibold text-center my-0 text-gray-600">Loading...</h4>
        )}
      </>
    }
  />
));

export default LaureateModal;