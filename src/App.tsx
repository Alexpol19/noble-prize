import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import PrizeOverview from './components/PrizeOverview'
import LaureateOverview from './components/LaureateOverview'

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="m-auto mt-6 flex max-w-[1000px] flex-col gap-4 px-10 py-2.5">
        <h1 className='text-4xl font-semibold text-center'>Nobel Prizes and Laureates</h1>
        <PrizeOverview />
        <LaureateOverview />
        <div className='mb-7' />
      </div>
    </QueryClientProvider>
  )
}

export default App
