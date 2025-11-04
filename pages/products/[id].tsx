import { useRouter } from "next/router";
import { useProductStore } from "@/store/useProductStore";
import { Button } from "@/components/ui/button";
import { ProductCardDetailed } from "@/components/products/ProductCardDetailed";
import { ArrowBigLeft } from "lucide-react"

export default function ProductPage() {
  const router = useRouter();
  const { id } = router.query;

  const { favorites, getProduct, toggleFavorite, deleteProduct } = useProductStore();
  const isFavorite = favorites.some(fav => fav.id === Number(id));

  const product = getProduct(Number(id));

  if (!product) {
    return (
      <div className="flex flex-col items-center gap-4 p-8">
        <h1>Товар не найден</h1>
        <Button
          variant="outline"
          size="lg"
          aria-label="Назад к списку товаров"
          className="cursor-pointer"
          onClick={() => router.push('/')}
        >
          <ArrowBigLeft />
          Назад
        </Button>
      </div>
    )
  }

  return (
    <ProductCardDetailed
      product={product}
      isFavorite={isFavorite}
      toggleFavorite={toggleFavorite}
      deleteProduct={deleteProduct}
      onBack={() => router.back()}
    />
  );
}