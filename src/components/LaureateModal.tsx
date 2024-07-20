import * as Dialog from '@radix-ui/react-dialog';
import { Cross2Icon } from '@radix-ui/react-icons';
import { v4 as uuidv4 } from 'uuid';
import { format } from "date-fns";

const LaureateModal = ({
  laureate,
  open,
  onOpenChange
}: {
  laureate: any,
  open: boolean,
  onOpenChange: (open: boolean) => void
}) => (
  <Dialog.Root open={open} onOpenChange={onOpenChange}>
    <Dialog.Portal>
      <Dialog.Overlay className="bg-blackA6 data-[state=open]:animate-overlayShow fixed inset-0" />
      <Dialog.Content className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
        <Dialog.Title className="text-mauve12 m-0 text-[17px] font-medium">
          {laureate && <a href={laureate.wikipedia?.english} target='_blank' className='text-xl'>{laureate.fullName?.en || laureate.orgName?.en}</a>}
        </Dialog.Title>

        {laureate && (
          <div>
            <p className="my-3 flex gap-3">
              <span>Born:</span>
              <span>{format(laureate.birth.date, "dd MMMM yyyy")}</span>
            </p>
            {laureate.death && <p className="my-3 flex gap-3">
              <span>Dead:</span>
              <span>{format(laureate.death.date, "dd MMMM yyyy")}</span>
            </p>}
            
            <h4 className='text-lg font-semibold'>Prizes ({laureate.nobelPrizes.length}):</h4>

            <div className='pl-2'>
              {laureate.nobelPrizes.map((prize: any, i: number) => (
                <div key={uuidv4()} className={`${i !== laureate.nobelPrizes.length -1 && 'border-b border-gray-300'}`}>
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
                </div>
              ))}
            </div>
          </div>
        )}

        {!laureate && (
          <h4 className="w-full py-3 text-2xl font-semibold text-center my-0">No data found</h4>
        )}
        
        <div className="mt-[25px] flex justify-end">
          <Dialog.Close asChild>
            <button className="bg-green4 text-green11 hover:bg-green5 focus:shadow-green7 inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-medium leading-none focus:shadow-[0_0_0_2px] focus:outline-none">
              Close
            </button>
          </Dialog.Close>
        </div>
        <Dialog.Close asChild>
          <button
            className="text-violet11 hover:bg-violet4 focus:shadow-violet7 absolute top-[10px] right-[10px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full focus:shadow-[0_0_0_2px] focus:outline-none"
            aria-label="Close"
          >
            <Cross2Icon />
          </button>
        </Dialog.Close>
      </Dialog.Content>
    </Dialog.Portal>
  </Dialog.Root>
);

export default LaureateModal;