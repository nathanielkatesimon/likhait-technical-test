import { useEffect, useState } from "react";

export function usePagination(items: any[], items_per_page: number) {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(items.length / items_per_page);
  const startIndex = (currentPage - 1) * items_per_page;
  const endIndex = startIndex + items_per_page;
  const currentItems = items.slice(startIndex, endIndex);

  useEffect(() => {
    if(currentItems.length === 0 && totalPages > 0){
      setCurrentPage(totalPages);
    }
  }, [items]);

  const jumpToItem = (predicate: (item: any) => boolean) => {
    const index = items.findIndex(predicate);
    if(index === -1) return;
    setCurrentPage(Math.floor(index / items_per_page) + 1);
  }

  return {
    currentPage,
    setCurrentPage,
    totalPages,
    currentItems,
    jumpToItem,
  };
}