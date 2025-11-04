import { useState } from 'react';
import Link from 'next/link'
import { useProductStore } from "@/store/useProductStore";
import { TProduct } from '@/types';
import { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import Image from 'next/image';
import { Button } from "../ui/button";
import { HeartIcon, Trash2Icon } from "lucide-react"
import { cn } from "@/lib/utils";


type ProductCardProps = {
  product: TProduct,
  isFavorite: boolean
}

export function ProductCard({ product, isFavorite }: ProductCardProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const { toggleFavorite, deleteProduct } = useProductStore();

  const handleDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();

    setIsDeleting(true);
    setTimeout(() => deleteProduct(product.id), 600);
  }

  const handleToggleFavorite = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(product);
  }

  return (
    <Link href={`/products/${product.id}`}>
      <Card className={cn(
        "cursor-pointer hover:shadow-lg transition-shadow group",
        "transition-all duration-700 ease",
        isDeleting && "animate-delete"
      )}>

      <CardHeader className="relative">
        <CardTitle className="line-clamp-1">{product.title}</CardTitle>
        <CardDescription className="min-h-[2.5rem] break-words line-clamp-2">
          {product.description}
        </CardDescription>
        <Button
          variant="ghost"
          size="icon"
          aria-label="Удалить товар"
          className="absolute top-0 right-1 cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity duration-200"
          onClick={handleDelete}
        >
          <Trash2Icon />
        </Button>
      </CardHeader>

      <CardContent className="w-[250px] h-[250px] mx-auto  overflow-hidden">
        <Image
          src={product.thumbnail!}
          width={250}
          height={250}
          className="object-contain object-center text-sm line-clamp-1"
          alt={product.title || ''}
        />
      </CardContent>

      <CardFooter className="flex justify-between">
        <div className="flex gap-1">
          <span>Цена:</span>
          <span className="font-bold">{product.price}</span>
          <span>$</span>
        </div>

        <Button
          variant="ghost"
          size="icon"
          aria-label="Сохранить товар"
          className="cursor-pointer"
          onClick={handleToggleFavorite}
        >
          <HeartIcon
            className={cn("size-4.5", isFavorite && "fill-red-500 text-red-500")}
          />
        </Button>
      </CardFooter>
    </Card>
    </Link >
  );
}