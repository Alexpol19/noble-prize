import { memo } from "react";

const SearchLaureate = memo(({
  laureateName,
  laureateResidence,
  onInputChange,
}: {
  laureateName: string,
  laureateResidence: string,
  onInputChange: (value: string, field: 'name' | 'residence') => void,
}) => (
  <div className='flex items-center gap-5'>
    <h3 className='text-2xl font-semibold text-center my-0'>Search for a Laureate:</h3>
    <input
      className="w-full flex-1 rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring "
      placeholder='Enter laureate name...'
      value={laureateName}
      onChange={(e) => onInputChange(e.target.value, 'name')}
    />
    <input
      className="w-full flex-1 rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring "
      placeholder='Enter laureate residence...'
      value={laureateResidence}
      onChange={(e) => onInputChange(e.target.value, 'residence')}
    />
  </div>
))

export default SearchLaureate;