import { useRouter } from "next/router";
import { useState, useEffect } from "react";

export type TProduct =  {
  id: number,
  title?: string,
  description?: string,
  price?: number,
  thumbnail?: string,
  category?: string,
  isFavorite?: boolean,
}

export default function ProductPage() {
  const router = useRouter();
  const { id } = router.query;
  const [product, setProduct] = useState<TProduct | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      loadProduct(id as string);
    }
  }, [id]);

  const loadProduct = async (productId: string) => {
    try {
      const response = await fetch(`https://jsonexamples.com/products/${productId}`);
      const data = await response.json();
      console.log(data)
      setProduct(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (!product) return <div>Product not found</div>;

  return (
    <div>
      <div className="product-card">
        <img src={product.thumbnail} alt={product.title} />
        <h3>{product.title}</h3>
        <p>${product.price}</p>
      </div>
    </div>
  );
}