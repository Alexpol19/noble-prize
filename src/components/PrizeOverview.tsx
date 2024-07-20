import {
  useQuery,
} from '@tanstack/react-query'
import { getPrizes } from '../api'
import { Combobox, Modal } from '../ui'

const PrizeOverview = () => {

  // Access the client

  // Queries
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
      <Combobox />
    </>
    )
}

export default PrizeOverview;