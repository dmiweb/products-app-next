import { useEffect } from "react";
import { cn } from "@/lib/utils";
import { useProductStore } from "@/store/useProductStore";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

export function ProductPagination() {
  const { pagination, setPagination } = useProductStore();
  const { page, limit, total } = pagination;
  const totalPages = Math.ceil(total / limit);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, [pagination.page]);

  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages) return;
    setPagination(newPage, limit);
  };

  // Функция для генерации номеров страниц с эллипсисами
  const getPageNumbers = () => {
    const pages = [];
    const showEllipsis = totalPages > 7;

    if (!showEllipsis) {
      // Показываем все страницы если их мало
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (page <= 3) {
        // Показываем: 1 2 3 4 ... last
        for (let i = 1; i <= 4; i++) {
          pages.push(i);
        }
        pages.push('ellipsis');
        pages.push(totalPages);
      } else if (page >= totalPages - 2) {
        // Показываем: 1 ... last-3 last-2 last-1 last
        pages.push(1);
        pages.push('ellipsis');
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        // Показываем: 1 ... current-1 current current+1 ... last
        pages.push(1);
        pages.push('ellipsis');
        pages.push(page - 1);
        pages.push(page);
        pages.push(page + 1);
        pages.push('ellipsis');
        pages.push(totalPages);
      }
    }

    return pages;
  };

  if (totalPages <= 1) return null;

  const pageNumbers = getPageNumbers();

  return (
    <Pagination>
      <PaginationContent>
        {/* Кнопка "Назад" */}
        <PaginationPrevious
          className={
            page === 1
              ? "pointer-events-none opacity-50"
              : "cursor-pointer hover:bg-secondary"
          }
          onClick={() => handlePageChange(page - 1)}
        // disabled={page === 1}
        />

        {/* Номера страниц с эллипсисами */}
        {pageNumbers.map((pageNum, index) => (
          <PaginationItem key={index}>
            {pageNum === 'ellipsis' ? (
              <PaginationEllipsis />
            ) : (
              <PaginationLink
                className={cn(
                  "cursor-pointer",
                  page === pageNum ? "bg-gray-200 cursor-default hover:bg-gray-200" : ''
                )}
                onClick={() => handlePageChange(pageNum as number)}
                isActive={page === pageNum}
              >
                {pageNum}
              </PaginationLink>
            )}
          </PaginationItem>
        ))}

        {/* Кнопка "Вперед" */}
        <PaginationNext
          className={
            page === totalPages
              ? "pointer-events-none opacity-50"
              : "cursor-pointer hover:bg-secondary"
          }
          onClick={() => handlePageChange(page + 1)}
        // disabled={page === totalPages}
        />
      </PaginationContent>
    </Pagination>
  );
}