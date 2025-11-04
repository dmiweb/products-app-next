import { useState } from "react";
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

// export function ProductPagination() {
//   const { pagination, setPagination } = useProductStore();
//   const [currentPage, setCurrentPage] = useState<number>(pagination.page);
//   const { page, limit, total } = pagination;
//   // Вычисляем общее количество страниц
//   const totalPages = Math.ceil(total / limit);

//   // Функция для изменения страницы
//   const handlePageChange = (newPage: number) => {
//     if (page < 1 || page > totalPages || page === currentPage) return;

//     const skip = (page - 1) * pagination.limit;
//     setCurrentPage(page);

//     // Экшен для сохранения данных пагинации
//     setPagination(pagination.total, skip, pagination.limit, page);
//   };

//   // Функция для генерации номеров страниц
//   const getPageNumbers = () => {
//     const pages = [];
//     const showEllipsis = totalPages > 7;

//     if (!showEllipsis) {
//       // Показываем все страницы если их мало
//       for (let i = 1; i <= totalPages; i++) {
//         pages.push(i);
//       }
//     } else {
//       if (currentPage <= 3) {
//         // Показываем: 1 2 3 4  ... last
//         for (let i = 1; i <= 4; i++) {
//           pages.push(i);
//         }
//         pages.push('ellipsis');
//         pages.push(totalPages);
//       } else if (currentPage >= totalPages - 2) {
//         // Показываем: 1 ...  last-3 last-2 last-1 last
//         pages.push(1);
//         pages.push('ellipsis');
//         for (let i = totalPages - 3; i <= totalPages; i++) {
//           pages.push(i);
//         }
//       } else {
//         // Показываем: 1 ... current-1 current current+1 ... last
//         pages.push(1);
//         pages.push('ellipsis');
//         pages.push(currentPage - 1);
//         pages.push(currentPage);
//         pages.push(currentPage + 1);
//         pages.push('ellipsis');
//         pages.push(totalPages);
//       }
//     }

//     return pages;
//   };

//   // Если страница всего одна, не показываем пагинацию
//   if (totalPages <= 1) return null;

//   const pageNumbers = getPageNumbers();

//   return (
//     <Pagination>
//       <PaginationContent>
//         {/* Кнопка "Назад" */}
//         <PaginationItem>
//           <PaginationPrevious
//             href="#"
//             onClick={(e) => {
//               e.preventDefault();
//               handlePageChange(currentPage - 1);
//             }}
//             className={
//               currentPage === 1
//                 ? "pointer-events-none opacity-50"
//                 : "cursor-pointer hover:bg-secondary"
//             }
//           />
//         </PaginationItem>

//         {/* Номера страниц */}
//         {pageNumbers.map((page, index) => (
//           <PaginationItem key={index}>
//             {page === 'ellipsis' ? (
//               <PaginationEllipsis />
//             ) : (
//               <PaginationLink
//                 href="#"
//                 onClick={(e) => {
//                   e.preventDefault();
//                   handlePageChange(page as number);
//                 }}
//                 isActive={currentPage === page}
//                 className={
//                   currentPage === page
//                     ? "bg-primary text-primary-foreground"
//                     : "cursor-pointer hover:bg-secondary"
//                 }
//               >
//                 {page}
//               </PaginationLink>
//             )}
//           </PaginationItem>
//         ))}

//         {/* Кнопка "Вперед" */}
//         <PaginationItem>
//           <PaginationNext
//             href="#"
//             onClick={(e) => {
//               e.preventDefault();
//               handlePageChange(currentPage + 1);
//             }}
//             className={
//               currentPage === totalPages
//                 ? "pointer-events-none opacity-50"
//                 : "cursor-pointer hover:bg-secondary"
//             }
//           />
//         </PaginationItem>
//       </PaginationContent>
//     </Pagination>
//   );
// }