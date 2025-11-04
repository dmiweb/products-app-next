import { useProductStore } from '@/store/useProductStore';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export function ProductFilter() {
  const { filter, selectFilter } = useProductStore();

  return (
    <div className='flex justify-end'>
      <Select value={filter} onValueChange={selectFilter}>
        <SelectTrigger className="w-[180px] cursor-pointer">
          <SelectValue placeholder="Фильтр" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all" className='cursor-pointer'>Все товары</SelectItem>
          <SelectItem value="favorites" className='cursor-pointer'>Избранные</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}