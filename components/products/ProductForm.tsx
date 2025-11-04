"use client"
import { useRouter } from 'next/navigation';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { TProduct } from '@/types';
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { generateId } from '@/lib/utils';

const formSchema = z.object({
  id: z.number(),
  title: z.string().min(2, "Название должно быть не менее 2 символов"),
  description: z.string().min(10, "Описание должно быть не менее 10 символов"),
  price: z.number({ error: "Цена должна быть указана" }).min(0, "Цена не может быть отрицательной"),
  thumbnail: z.string().min(1, "URL обязателен").refine(
    (value) => {
      try {
        new URL(value);
        return true;
      } catch {
        return false;
      }
    },
    "Введите корректный URL изображения"
  )
})

type ProductFormValues = z.infer<typeof formSchema>;

export function ProductForm({ createProduct }: { createProduct: (product: TProduct) => void }) {
  const router = useRouter();

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: generateId(),
      title: "",
      description: "",
      price: 0,
      thumbnail: "",
    },
    mode: "all"
  })

  function onSubmit(values: ProductFormValues) {
    createProduct(values);

    form.reset();
    router.push('/');
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 p-8 border rounded-lg shadow-xl"
      >
        <FormField
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Название товара</FormLabel>
              <FormControl>
                <Input placeholder="iPhone 15 Pro" {...field} />
              </FormControl>
              <FormDescription>
                Введите название товара
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Описание</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Опишите характеристики товара..."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="price"
          render={() => (
            <FormItem>
              <FormLabel>Цена ($)</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="150"
                  {...form.register('price', { valueAsNumber: true })}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="thumbnail"
          render={({ field }) => (
            <FormItem>
              <FormLabel>URL изображения</FormLabel>
              <FormControl>
                <Input
                  placeholder="https://example.com/image.jpg"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className='flex justify-end gap-4'>
          <Button
            type="submit"
            variant="default"
            size="lg"
            className='cursor-pointer'
          >
            Добавить товар
          </Button>

          <Button
            type="button"
            variant="outline"
            size="lg"
            className='cursor-pointer'
            onClick={() => router.push('/')}
          >
            Отмена
          </Button>
        </div>
      </form>
    </Form>
  )
}