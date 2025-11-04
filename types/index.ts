export type TProduct =  {
  id: number,
  title?: string,
  description?: string,
  price?: number,
  thumbnail?: string,
  category?: string,
  isFavorite?: boolean,
}

export type TProductsResponse = {
  products: TProduct[],
  total: number,
  skip: number,
  limit: number,
};