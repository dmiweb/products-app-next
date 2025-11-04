'use client';
import { useProductStore } from '@/store/useProductStore';
import { ProductForm } from '@/components/products/ProductForm';

export default function CreateProductPage() {
  const { createProduct } = useProductStore();
  return (
    <div className="container mx-auto py-8 max-w-2xl">
      <div className="flex items-center gap-4 mb-6">
        <h1 className="text-2xl font-bold">Добавить новый продукт</h1>
      </div>

      <ProductForm createProduct={createProduct} />
    </div>
  )
}