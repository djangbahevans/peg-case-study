import { QueryClient, QueryClientProvider } from 'react-query';
import { AuthProvider } from './contexts';
import { AppThemeProvider } from './contexts/ThemeContext';
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
      <AppThemeProvider>
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <AppRouter />
          </AuthProvider>
        </QueryClientProvider>
      </AppThemeProvider>
    </div>
  );
}

export default App;
