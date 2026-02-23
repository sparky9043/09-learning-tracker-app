import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import CurrentUserContextProvider from './contexts/CurrentUserContextProvider.tsx';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import OpenaiResponseContextProvider from './contexts/OpenaiResponseContextProvider.tsx';

// Later  learn how  to automatically update cache
const queryClient = new QueryClient(
    // {
    //   mutationCache: new MutationCache(
    //     {
    //       onSuccess: (_data, _variables, _context, mutation) => {
    //         queryClient.invalidateQueries({
    //               queryKey: mutation.options.mutationKey,
    //             });
    //         },
    //       }),
    // }
);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CurrentUserContextProvider>
      <OpenaiResponseContextProvider>
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
      </OpenaiResponseContextProvider>
    </CurrentUserContextProvider>
  </StrictMode>,
)
