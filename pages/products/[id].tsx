import { useRouter } from "next/router";
import { useState, useEffect, useMemo } from "react";
import { useProductStore } from "@/store/useProductStore";
import { TProduct } from "@/types";

export default function ProductPage() {
  const router = useRouter();
  const { id } = router.query;

  const { getProduct } = useProductStore();

  const product = useMemo(() => {
    return getProduct(Number(id));
  }, [id]);

  if (!product) {
    return <div>Product not found</div>;
  }

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