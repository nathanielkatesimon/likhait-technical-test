import { useEffect, useState } from "react";

export function usePagination(items: any[], items_per_page: number) {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsCount, setItemsCount] = useState(items.length);

  const totalPages = Math.ceil(items.length / items_per_page);
  const startIndex = (currentPage - 1) * items_per_page;
  const endIndex = startIndex + items_per_page;
  const currentItems = items.slice(startIndex, endIndex);

  useEffect(() => {
    if(currentItems.length === 0){
      setCurrentPage(currentPage > 1 ? currentPage - 1 : 1);
    }

    if(itemsCount < items.length){
      setItemsCount(items.length);
      setCurrentPage(1);
    }
  }, [items]);

  return {
    currentPage,
    setCurrentPage,
    totalPages,
    currentItems
  };
}