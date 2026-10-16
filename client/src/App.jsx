import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import { appRoutes } from './routes/appRoutes';

import { CartProvider } from './context/CartProvider';
import { AuthProvider } from './context/AuthProvider';
import Layout from './components/layout/Layout';

import { ReactLenis } from 'lenis/react';
import { ROUTES } from './routes/paths';

// TanStack Query Client Setup
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      retry: 1,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
    },
  },
});

function AppRoutesContent() {
  const isPath = useLocation();

  return (
    <>
      <ReactLenis root options={{ duration: 1.3 }} />

      {/**
       * <Suspense fallback={ <AnimatePresence mode='wait'><LoaderScreen /></AnimatePresence>}>
       */}

      <Routes>
        <Route element={<Layout />}>
          {appRoutes.map((route, idx) => {
            if (route.children) {
              return (
                <Route key={idx} element={route.element}>
                  {route.children.map((childRoute, childIdx) => (
                    <Route
                      key={childIdx}
                      path={childRoute.path}
                      element={childRoute.element}
                    />
                  ))}
                </Route>
              );
            }

            return (
              <Route
                key={idx}
                index={ROUTES.HOME === isPath.pathname}
                path={route.path}
                element={route.element}
              />
            );
          })}
        </Route>
      </Routes>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <CartProvider>
            <AppRoutesContent />
          </CartProvider>
        </AuthProvider>
      </QueryClientProvider>
    </BrowserRouter>
  );
}

export default App;
