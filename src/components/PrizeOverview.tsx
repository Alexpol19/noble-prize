import {
  useQuery,
} from '@tanstack/react-query'
import { getPrizes } from '../api'
import { LaureatesTable } from './LaureatesTable'
import Modal from './Modal'
import { SelectSearch } from './SelectSearch'
import { PrizeChart } from './PrizeChart'

const PrizeOverview = () => {

  const { isPending, error, data, isFetching } = useQuery({
    queryKey: ['prizes'],
    queryFn: getPrizes,
    // staleTime: 5000,
  })
  console.log(isPending)
  console.log(error)
  console.log(data)
  console.log(isFetching)

  return (
    <>
      {/* <ul>{query.data?.map((prize) => <li key={prize.id}>{prize.title}</li>)}</ul> */}
      <Modal />
      <SelectSearch />
      <LaureatesTable />
      <PrizeChart />
    </>
    )
}

export default PrizeOverview;