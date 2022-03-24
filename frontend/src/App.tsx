import { QueryClient, QueryClientProvider } from 'react-query';
import { AuthProvider } from './contexts';
import { AppRouter } from './routes';


const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60
    }
  }
})

function App() {
  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <AppRouter />
        </AuthProvider>
      </QueryClientProvider>
    </div>
  );
}

export default App;
