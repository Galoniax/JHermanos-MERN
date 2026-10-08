import { useState } from "react";
import { useCart } from "../hooks/useCart";
import { getProducts } from "@/services/product.api";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import ProductCard from "@/components/features/product/ProductCard";
import { useInView } from "react-intersection-observer";

import Skeleton from "react-loading-skeleton";

export default function Products() {
  const { addToCart } = useCart();

  const [params, setSearchParams] = useSearchParams();

  const category = params.get("category") || "";

  const { ref } = useInView({
    rootMargin: "200px",
    onChange: (inView) => {
      if (inView && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    },
  });

  const [sortBy, setSortBy] = useState("createdAt_desc");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isError,
    error,
    isLoading,
  } = useInfiniteQuery({
    queryKey: ["products"],
    queryFn: async ({ pageParam = 1 }) => {
      const response = await getProducts(category, pageParam);

      if (!response) throw new Error("Error obteniendo las órdenes");
      return response;
    },
    getNextPageParam: (lastPage) => {
      if (lastPage?.pagination?.hasMore) {
        return lastPage.pagination.page + 1;
      }
      return undefined;
    },
    initialPageParam: 1,

    staleTime: 1000 * 60 * 20,
    gcTime: 1000 * 60 * 60,
    retry: 3,
  });

  const products = data?.pages.flatMap((page) => page.data) || [];

  //console.log("DATA: ", products);
  //console.log("Error: ", isError, error);

  return (
    <main className="px-6 py-18 bg-pitch min-h-screen">
      <div className="flex flex-col gap-6">
        <div className="flex justify-between items-center px-20">
          <div className="flex flex-col items-start gap-1">
            <span className="font-light text-sm tracking-wider text-parch/40">
              Nuestro catalogo
            </span>

            <h1 className="font-bold text-parch text-[3rem]">
              Nuestros productos
            </h1>
          </div>

          <p className="font-light text-parch/50 text-lg max-w-lg text-right">
            Una colección pensada para perdurar. Materiales seleccionados y
            diseño atemporal para asegurar que cada pieza que elijas hoy, siga
            siendo esencial mañana.
          </p>
        </div>

        <div className="flex flex-col gap-2 lg:grid grid-cols-[350px_1fr]">
          {/* Filtros */}
          <div className="md:sticky top-20 self-start flex">
            <h2>Filtros</h2>
          </div>

          <section className="grid grid-cols-2 md:grid-cols-3 gap-8">
            {isLoading
              ? Array.from({ length: 8 }).map((_, index) => (
                  <div
                    key={index}
                    className="flex flex-col gap-2 opacity-80 brightness-10"
                  >
                    <Skeleton
                      height={420}
                      baseColor="var(--parch)"
                      highlightColor="#ffffff"
                      duration={2}
                      borderRadius="0px"
                    />
                    <Skeleton
                      count={2}
                      baseColor="var(--parch)"
                      highlightColor="#ffffff"
                      duration={2}
                      borderRadius="2px"
                    />
                  </div>
                ))
              : products.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
          </section>
        </div>
      </div>

      {/* Sentinel */}
      <div
        ref={ref}
        className="w-full py-4 flex justify-center"
        role="status"
        aria-label="Cargando más productos"
        aria-hidden="true"
      >
        {/** TODO: Mejorar estilo de no hay más productos */}
        {!hasNextPage && (
          <div className="text-sm text-text-4">
            No hay más productos para mostrar
          </div>
        )}
      </div>
    </main>
  );
}

/**
 * <section className="py-3 border-y border-parch/15 px-20">
       
          <div className="flex flex-row gap-10">
            <div className="flex items-center gap-4">
              <select
                value={category}
                onChange={(e) => setSearchParams({ category: e.target.value })}
                className="px-3 py-2 bg-parch/10 border border-parch/20 rounded-md text-parch"
              >
                <option value="">Todas las categorías</option>
                
              </select>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 bg-parch/10 border border-parch/20 rounded-md text-parch"
              >
                <option value="createdAt_desc">Más reciente</option>
                <option value="price_asc">Precio: Menor a mayor</option>
                <option value="price_desc">Precio: Mayor a menor</option>
              </select>

              <div className="relative">
                <input
                  type="number"
                  placeholder="Precio min"
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                  className="px-3 py-2 w-32 bg-parch/10 border border-parch/20 rounded-md text-parch placeholder:text-parch/40"
                />
                <span className="absolute left-3 bottom-2.5 text-parch/40 text-xs">
                  $
                </span>
              </div>

              <div className="relative">
                <input
                  type="number"
                  placeholder="Precio max"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                  className="px-3 py-2 w-32 bg-parch/10 border border-parch/20 rounded-md text-parch placeholder:text-parch/40"
                />
                <span className="absolute left-3 bottom-2.5 text-parch/40 text-xs">
                  $
                </span>
              </div>

              <button
                onClick={() => {
                  setSearchParams("");
                  setSortBy("createdAt_desc");
                  setMinPrice("");
                  setMaxPrice("");
                }}
                className="px-4 py-2 bg-parch/10 hover:bg-parch/20 rounded-md transition"
              >
                Limpiar
              </button>
            </div>
          </div>
        </section>
 */
