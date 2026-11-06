import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ROUTES } from '../routes/paths';
import { formatPrice } from '../utils/formatPrice';
import { useCart } from '../hooks/useCart';
import { useQuery } from '@tanstack/react-query';
import { getProductById } from '@/services/product.api';

import { FaCheck, FaPlus } from 'react-icons/fa6';
import { FaMinus } from 'react-icons/fa6';
import Loader from '@/components/ui/feedback/Loader';

import { FaChevronRight } from 'react-icons/fa';

import { motion } from 'framer-motion';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'react-toastify';
import { ToastComponent } from '@/components/ui/feedback/ToastComponent';

function Specification({ title, value }) {
  const [isOpen, setIsOpen] = useState(true);

  const handleToggle = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className="border-t border-pitch/20 py-4 w-full">
      <div className="flex items-center justify-between">
        <button
          type="button"
          aria-expanded={isOpen}
          aria-controls={`spec-${title}`}
          onClick={handleToggle}
          className="flex w-full items-center justify-between cursor-pointer"
        >
          <h3 className="text-carbon text-lg font-bold capitalize">{title}:</h3>
          <span className="text-carbon text-pitch/40">
            {isOpen ? <FaMinus size={16} /> : <FaPlus size={16} />}
          </span>
        </button>
      </div>

      {isOpen && <p className="text-pitch/60 text-sm">{value}</p>}
    </div>
  );
}

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { isAuthenticated } = useAuth();
  const { cart: items, changeQuantity } = useCart();

  const [cantidad, setCantidad] = useState(1);
  const [status, setStatus] = useState('idle');

  const [index, setIndex] = useState(0);

  const { data: product, isLoading } = useQuery({
    queryKey: ['product', id],
    queryFn: async () => {
      const response = await getProductById(id);
      return response.data;
    },
    enabled: !!id,

    refetchInterval: 20 * 60 * 1000,
    staleTime: 0,
    cacheTime: 20 * 60 * 1000,
  });

  useEffect(() => {
    if (product) {
      document.title = `Hermanos Jota - ${product.name}`;

      if (product.slug) {
        window.history.replaceState(null, '', `/product/${id}/${product.slug}`);
      }
    }

    return () => {
      document.title = 'Hermanos Jota';
    };
  }, [product, id]);

  const handleIncrement = () => {
    if (!product) return;

    if (cantidad >= product.stock) {
      toast.error(
        <ToastComponent
          message="Límite de stock alcanzado"
          type="error"
          closeToast={() => toast.dismiss()}
        />
      );
      return;
    }

    setCantidad((prev) => prev + 1);
  };

  const handleDecrement = () => {
    setCantidad((prev) => (prev > 1 ? prev - 1 : 1));
  };

  // TODO: Modificar estilos de no encontrado + carga
  if (!product) {
    return (
      <main className="py-20 text-center">
        <h1 className="font-display text-3xl font-bold text-[var(--tinta)] mb-4">
          Producto no encontrado
        </h1>
        <p className="font-inter text-stone-600 mb-6">
          No pudimos encontrar el mueble que estás buscando en nuestro catálogo.
        </p>
        <Link to={ROUTES.PRODUCTS} className="btn btn--primary">
          ← Volver al catálogo
        </Link>
      </main>
    );
  }

  const item = items.find((item) => item.id === product._id);

  const sinStock = product.stock <= 0;
  const category = Object.keys(product?.especifications || {});

  return (
    <main className="relative min-h-screen bg-parch p-6 sm:p-10 lg:p-18">
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/black-mamba.png')] bg-parch bg-center opacity-20 pointer-events-none" />

      {/** Detalle de producto */}
      <div className="relative flex flex-col md:max-w-[80%] mx-auto gap-8">
        {/** Breadcrumb */}
        <div className="flex items-center gap-2 text-[11px] uppercase font-bold tracking-widest">
          <Link
            to={ROUTES.PRODUCTS}
            className="hover:underline decoration-pitch/80 underline-offset-4"
          >
            <span className="text-pitch/80">Catálogo</span>
          </Link>
          <FaChevronRight className="text-pitch/50" size={10} />

          <span className="text-pitch/40">{product.category.name}</span>
        </div>

        <div className=" flex flex-col lg:flex-row justify-center items-start *:flex-1 gap-8">
          {/* Imagen del producto */}
          <aside className="flex flex-col gap-2 overflow-x-hidden">
            <motion.div
              animate={{ x: `-${index * 100}%` }}
              transition={{ type: 'spring', stiffness: 260, damping: 30 }}
              className="w-full h-[800px] flex"
            >
              {product.image_url.map((url, i) => (
                <img
                  key={i}
                  src={url}
                  alt={`Imagen de ${product.name} ${i + 1}`}
                  className="w-full h-full object-cover border border-pitch/60 shrink-0"
                  loading={i === 0 ? 'eager' : 'lazy'}
                  fetchPriority={i === 0 ? 'high' : 'auto'}
                />
              ))}
            </motion.div>

            {/** Miniaturas */}
            {product.image_url.length > 1 && (
              <div className="flex gap-2 overflow-hidden">
                {product.image_url.map((image, idx) => (
                  <button
                    type="button"
                    onClick={() => {
                      setIndex(idx);
                    }}
                    aria-label="Imagen del producto"
                    key={idx}
                    className={`relative w-15 max-h-20 border cursor-pointer ${idx === index ? 'border-pitch/60' : 'border-pitch/20'}`}
                  >
                    {idx !== index && (
                      <div className="absolute inset-0 bg-parch/60"></div>
                    )}
                    <img
                      src={image}
                      className="h-full w-full object-cover"
                      alt={`Imágen de ${product.name}`}
                    />
                  </button>
                ))}
              </div>
            )}
          </aside>

          {/* Información y compra */}
          <section className="flex flex-col gap-5 w-full h-full">
            <h1 className="text-5xl font-bold text-carbon">{product.name}</h1>
            {product.discount > 0 && (
              <p className="text-pitch text-base font-semibold">
                {formatPrice(
                  product.finalPrice?.$numberDecimal || product.finalPrice
                )}
              </p>
            )}

            <p
              className={`${product.discount > 0 ? 'line-through text-gray-500' : 'text-carbon text-2xl font-bold tracking-tight'}`}
            >
              {formatPrice(product.price?.$numberDecimal || product.price)}
            </p>

            <p className="text-pitch/60 font-light text-lg">
              {product.description}
            </p>

            <div className="flex flex-col gap-2">
              <div className="flex gap-2">
                <div className="flex items-center gap-5 *:p-1 py-2 px-4 border border-pitch/20 bg-parch *:text-pitch">
                  <button
                    aria-label="Decrementar cantidad"
                    className="cursor-pointer"
                    onClick={handleDecrement}
                  >
                    -
                  </button>
                  <span className="text-xs">{cantidad}</span>
                  <button
                    aria-label="Incrementar cantidad"
                    className="cursor-pointer"
                    onClick={handleIncrement}
                  >
                    +
                  </button>
                </div>

                <button
                  disabled={status === 'loading' || sinStock}
                  onClick={() => {
                    setStatus('loading');

                    changeQuantity(product, cantidad);

                    setTimeout(() => {
                      setStatus('success');

                      setTimeout(() => setStatus('idle'), 1000);
                    }, 1000);
                  }}
                  className={`cursor-pointer uppercase flex items-center justify-center gap-2 w-full hover:bg-pitch/90 transition-colors text-sm font-medium py-4 bg-pitch text-parch`}
                >
                  {status === 'idle' && 'Agregar al carrito'}
                  {status === 'loading' && (
                    <>
                      <Loader size={14} color=" text-parch/80" />
                      Agregando a tu carrito...
                    </>
                  )}
                  {status === 'success' && (
                    <>
                      <FaCheck className="text-parch/80" size={16} />
                      Producto agregado
                    </>
                  )}
                </button>
              </div>
              <button
                type="button"
                onClick={() => {
                  if (!isAuthenticated) {
                    navigate(ROUTES.LOGIN);
                    return;
                  }

                  if (!item) {
                    changeQuantity(product, 1);
                  }
                  navigate(ROUTES.CHECKOUT);
                }}
                className="cursor-pointer uppercase text-parch bg-bordeau hover:bg-bordeau/80 transition-colors w-full text-sm font-medium py-4"
              >
                Comprar ahora - Ir a checkout →
              </button>

              <div className="flex gap-2 text-xs text-pitch/80 mt-3">
                <span>{product.stock <= 0 ? 'Sin stock' : 'En stock'}</span>
                {' | '}
                <span>{item && `${item.cantidad} items en el carrito`}</span>
              </div>
            </div>

            {/* Categorias del producto */}
            {category.length > 0 && (
              <div className="flex flex-col gap-1">
                {category.map((cat) => {
                  return (
                    <Specification
                      key={cat}
                      title={cat}
                      value={product.especifications[cat]}
                    />
                  );
                })}
              </div>
            )}
          </section>
        </div>
      </div>
    </main>
  );
}
