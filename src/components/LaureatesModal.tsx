import { v4 as uuidv4 } from 'uuid';
import { format } from "date-fns";
import Modal from '../ui/Modal';
import { extractYear, formatDate } from '../utils';

const LaureatesModal = ({
  laureates,
  awardYear,
  open,
  onOpenChange
}: {
  laureates: any[],
  awardYear: string | null
  open: boolean,
  onOpenChange: (open: boolean) => void
}) => (
  <Modal
    title={`Laureates ${awardYear}`}
    open={open}
    onOpenChange={onOpenChange}
    content={
      <>
        {laureates?.length  && laureates.map((laureate, i) => (
          <div key={laureate.id} className={`${i !== laureates.length -1 && 'border-b border-gray-300 mt-3'}`}>
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
            
            <h4 className='text-lg font-semibold'>Prizes ({laureate.nobelPrizes.length}):</h4>

            <div className='pl-2'>
              {laureate.nobelPrizes.map((prize: any, i: number) => (
                <div key={uuidv4()} className={`${i !== laureate.nobelPrizes.length -1 && 'border-b border-gray-300 mb-2'}`}>
                  <p className="my-3 flex gap-3">
                    {prize.categoryFullName.en} {prize.awardYear}
                  </p>
                  <p className="my-3 flex gap-3">
                    Prize motivation: {prize.motivation.en}
                  </p>
                  <p className="my-3 flex gap-3">
                    Prize portion: {prize.portion}
                  </p>
                  <p className="my-3 flex gap-3">
                    Prize amount: {prize.prizeAmount}
                  </p>
                  {prize.residences?.length && (
                    <p className="my-3 flex gap-3">
                      Residence: {prize.residences[0].locationString.en}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}

        {!laureates && (
          <h4 className="w-full py-3 text-2xl font-semibold text-center my-0">No data found</h4>
        )}
      </>
    }
  />
);

export default LaureatesModal;