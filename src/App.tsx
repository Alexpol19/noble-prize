import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import PrizeOverview from './components/PrizeOverview'

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <PrizeOverview />
    </QueryClientProvider>
  )
}

export default App
