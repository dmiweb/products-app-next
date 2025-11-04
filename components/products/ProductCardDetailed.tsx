import { cn } from "@/lib/utils";
import { TProduct } from '@/types';
import { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import Image from 'next/image';
import { Button } from "../ui/button";
import { HeartIcon, Trash2Icon, ArrowBigLeft } from "lucide-react";

type ProductCardDetailedProps = {
  product: TProduct,
  isFavorite: boolean,
  toggleFavorite: (product: TProduct) => void,
  deleteProduct: (id: number) => void,
  onBack: () => void
}

export function ProductCardDetailed({
  product,
  isFavorite,
  toggleFavorite,
  deleteProduct,
  onBack
}: ProductCardDetailedProps) {

  return (
    <div className="flex flex-col items-center gap-3 w-[600px] mx-auto p-4">
      <Card className="animate-in fade-in duration-500">
        <CardHeader className="relative">
          <CardTitle className="text-2xl line-clamp-1">{product.title}</CardTitle>
          <CardDescription className="text-lg break-all">
            {product.description}
          </CardDescription>
          <Button
            variant="ghost"
            size="icon"
            aria-label="Удалить товар"
            className="absolute top-1 right-3 size-10 cursor-pointer"
            onClick={() => {deleteProduct(product.id); onBack()}}
          >
            <Trash2Icon className="size-5" />
          </Button>
        </CardHeader>

        <CardContent className="flex justify-center">
          <Image
            src={product.thumbnail!}
            width={400}
            height={400}
            className="object-contain object-center text-sm line-clamp-1"
            alt={product.title || ''}
          />
        </CardContent>

        <CardFooter className="flex justify-between">
          <div className="flex gap-1">
            <span className="text-lg">Цена:</span>
            <span className="text-lg font-bold">{product.price}</span>
            <span className="text-lg">$</span>
          </div>

          <Button
            variant="ghost"
            aria-label="Сохранить товар"
            className=" size-10 cursor-pointer"
            onClick={() => toggleFavorite(product)}
          >
            <HeartIcon className={cn("size-5", isFavorite && "fill-red-500 text-red-500")} />
          </Button>
        </CardFooter>
      </Card>

      <Button
        variant="outline"
        size="lg"
        aria-label="Назад к списку товаров"
        className="cursor-pointer"
        onClick={onBack}
      >
        <ArrowBigLeft />
        Назад
      </Button>
    </div>
  );
}