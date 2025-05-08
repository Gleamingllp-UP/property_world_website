import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
  } from "@/components/ui/pagination";
  
  export function CommonPagination({ total, page, limit, onPageChange,className }) {
    if (!total || total <= limit) return null; 
  
    const totalPages = Math.ceil(total / limit);
  
    const handlePrevious = () => {
      if (page > 1) onPageChange(page - 1);
    };
  
    const handleNext = () => {
      if (page < totalPages) onPageChange(page + 1);
    };
  
    const handlePageClick = (pageNumber) => {
      if (pageNumber !== page) onPageChange(pageNumber);
    };
  
    // Show at max 5 pages in pagination (smart behavior)
    const getPageNumbers = () => {
      const pages = [];
      const maxVisiblePages = 5;
  
      if (totalPages <= maxVisiblePages) {
        for (let i = 1; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        if (page <= 3) {
          pages.push(1, 2, 3, 4, "...", totalPages);
        } else if (page >= totalPages - 2) {
          pages.push(1, "...", totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
        } else {
          pages.push(1, "...", page - 1, page, page + 1, "...", totalPages);
        }
      }
      return pages;
    };
  
    const pageNumbers = getPageNumbers();
  
    return (
      <Pagination className={`mt-6 ${className}`}>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious 
              onClick={handlePrevious}
              className={page === 1 ? "pointer-events-none opacity-50" : ""}
            />
          </PaginationItem>
  
          {pageNumbers.map((pageNum, idx) => (
            <PaginationItem key={idx}>
              {pageNum === "..." ? (
                <PaginationEllipsis />
              ) : (
                <PaginationLink 
                  isActive={pageNum === page} 
                  onClick={() => handlePageClick(pageNum)}
                >
                  {pageNum}
                </PaginationLink>
              )}
            </PaginationItem>
          ))}
  
          <PaginationItem>
            <PaginationNext 
              onClick={handleNext}
              className={page === totalPages ? "pointer-events-none opacity-50" : ""}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    );
  }
  