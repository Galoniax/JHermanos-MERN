import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import { appRoutes } from './routes/appRoutes';

import { CartProvider } from './context/CartProvider';
import { AuthProvider } from './context/AuthProvider';
import Layout from './components/layout/Layout';

import { ReactLenis } from 'lenis/react';
import { ROUTES } from './routes/paths';

import { ToastContainer } from 'react-toastify';
import { Suspense } from 'react';

// TanStack Query Client Setup
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 15 * 60 * 1000,
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
      <ReactLenis root options={{ duration: 1.25 }} />
     
      <Suspense fallback={<></>}>
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
      </Suspense>
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
        <ToastContainer
          position="bottom-right"
          stacked={true}
          icon={false}
          closeButton={false}
          draggable="mouse"
          toastClassName="!rounded-t-none !py-4 overflow-hidden !bg-parch border border-pitch/20"
          progressClassName="!h-1"
          autoClose={5000}
        />
      </QueryClientProvider>
    </BrowserRouter>
  );
}

export default App;
