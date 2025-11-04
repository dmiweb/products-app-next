import { useMemo } from "react";
import { TProduct } from '@/types';
import { ProductCard } from "./ProductCard";

type ProductListProps = {
  products: TProduct[],
  favorites: TProduct[],
  filter: 'all' | 'favorites'
}

export function ProductList({ products, favorites, filter }: ProductListProps) {
  const productList = useMemo(() => {
    if (filter === 'favorites') {
      return favorites.map(product => ({
        product,
        isFavorite: true
      }));
    }

    return products.map(product => ({
      product,
      isFavorite: favorites.some(fav => fav.id === product.id)
    }));
  }, [products, favorites, filter]);

  return (
    <>
      {!productList.length
        ? <div className='absolute  left-2/4 top-1/3 -translate-x-1/2'>Список пуст</div>
        : <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
          {productList.map(({ product, isFavorite }) =>
            <li
              key={product.id}
              id={String(product.id)}
              className="cursor-pointer">
              <ProductCard product={product} isFavorite={isFavorite} />
            </li>
          )}
        </ul>}
    </>
  );
}