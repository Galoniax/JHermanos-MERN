import { useAuth } from '@/hooks/useAuth';
import { useInfiniteQuery } from '@tanstack/react-query';
import { getOrders } from '@/services/order.api';
import { formatPrice } from '@/utils/formatPrice';

import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { useInView } from 'react-intersection-observer';
import { toast } from 'react-toastify';
import { ToastComponent } from '@/components/ui/feedback/ToastComponent';

const statusColor = {
  PENDIENTE: 'text-[#E5B510]',
  PAGADO: 'text-[#04B00B]',
  ENTREGADO: 'text-[#3a86ff]',
  CANCELADO: 'text-[#E03F32]',
};

export default function Profile() {
  const { user, isAuthenticated } = useAuth();

  const { ref } = useInView({
    rootMargin: '200px',
    onChange: (inView) => {
      if (inView && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    },
  });

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isError,
    error,
    isLoading,
  } = useInfiniteQuery({
    queryKey: ['orders', user?._id],
    queryFn: async ({ pageParam = 1 }) => {
      const res = await getOrders(pageParam);

      return res;
    },
    getNextPageParam: (lastPage) => {
      if (lastPage?.pagination?.hasMore) {
        return lastPage.pagination.page + 1;
      }
      return undefined;
    },
    initialPageParam: 1,

    enabled: !!isAuthenticated && !!user,

    staleTime: 1000 * 60 * 20,
    gcTime: 1000 * 60 * 60,
  });

  const orders = data?.pages.flatMap((page) => page.data) || [];

  if (isError) {
    toast.error(
      <ToastComponent
        message={error.error}
        status={error.status}
        type="error"
        closeToast={() => toast.dismiss()}
      />
    );
  }

  return (
    <main className="relative min-h-screen bg-parch p-6 sm:p-10 lg:p-18">
      <div className="flex flex-col md:max-w-[80%] mx-auto gap-8">
        <header>
          <h1 className="font-bold text-pitch text-[2rem] lg:text-[3rem]">
            Tus órdenes
          </h1>
          <p className="font-light text-pitch/50 text-base lg:text-lg text-left">
            Todo lo que has pedido desde tu cuenta, con los detalles que te
            hemos enviado.
          </p>
        </header>

        {/* Orders list */}
        {isLoading ? (
          <div className="py-16 text-center flex flex-col items-center gap-4">
            <p className="text-sm uppercase tracking-widest">
              Cargando órdenes...
            </p>
          </div>
        ) : (
          orders &&
          orders.length > 0 &&
          orders?.map((order) => {
            return (
              <div className="py-2 space-y-4" key={order._id}>
                <div className="flex flex-wrap items-center justify-between text-xs sm:text-sm font-medium pt-2 gap-2">
                  <div className="flex items-center gap-3 uppercase tracking-wider text-neutral-400 font-mono text-[11px] sm:text-xs">
                    <span>
                      {format(
                        new Date(order.createdAt),
                        "dd 'de' MMMM 'del' yyyy",
                        {
                          locale: es,
                        }
                      )}
                    </span>
                    <span>{order.checkout_reference}</span>
                    <span className={statusColor[order.status.toUpperCase()]}>
                      {order.status.toUpperCase()}
                    </span>
                  </div>
                  <p className="text-pitch font-bold tracking-tight text-sm sm:text-base">
                    {formatPrice(order?.total_amount?.$numberDecimal || 'N/A')}
                  </p>
                </div>

                {/* Items */}
                <div className="flex flex-col gap-4 mt-1">
                  {order?.items?.map((item) => {
                    return (
                      <div
                        key={item._id}
                        className="flex items-center justify-between gap-4"
                      >
                        <div className="flex items-center gap-3 sm:gap-4">
                          <div className="w-8 h-12 overflow-hidden flex-shrink-0 flex items-center justify-center">
                            <img
                              src={item?.product?.image_url?.[0]}
                              alt={item.name}
                              className="w-full h-full object-cover"
                              loading="lazy"
                            />
                          </div>
                          <span className="text-pitch/80 font-semibold tracking-tighter text-sm">
                            {item.product?.name}
                          </span>
                        </div>
                        <div className="flex flex-col gap-1 items-end">
                          <span className="text-sm text-pitch/60 font-light font-mono">
                            &times;{item.quantity}
                          </span>
                          <p className="text-xs text-pitch/60 font-light font-mono">
                            {formatPrice(item?.unit_price?.$numberDecimal || 0)}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Delivery details */}
                {order?.shipping_address && <section></section>}

                {/* Divider after each order */}
                <div className="border-t border-pitch/20 border-dotted" />
              </div>
            );
          })
        )}

        {!isError &&
          !isLoading &&
          (!isAuthenticated || orders?.length === 0) && (
            <div className="flex justify-center items-center py-10">
              <p className="text-pitch/60 text-sm">
                {!isAuthenticated
                  ? 'Inicia sesión para ver tus órdenes.'
                  : 'No tienes órdenes registradas.'}
              </p>
            </div>
          )}
      </div>

      {/* Sentinel */}
      <div
        ref={ref}
        className="w-full py-4 flex justify-center"
        role="status"
        aria-label="Cargando más órdenes"
        aria-hidden="true"
      />
    </main>
  );
}
