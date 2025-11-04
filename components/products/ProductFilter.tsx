import { useProductStore } from '@/store/useProductStore';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export function ProductFilter() {
  const { filter, selectFilter } = useProductStore();

  return (
    <div className='flex justify-end'>
      <Select value={filter} onValueChange={selectFilter}>
        <SelectTrigger className="w-[180px] text-lg text-zinc-800 cursor-pointer">
          <SelectValue placeholder="Фильтр" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all" className='text-lg text-zinc-800 cursor-pointer'>
            Все товары
          </SelectItem>
          <SelectItem value="favorites" className='text-lg text-zinc-800 cursor-pointer'>
            Избранные
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}