import React from "react";

export function CustomPagination({ total, page, limit, onPageChange, className = "" }) {
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
    <div className={`col-12 text-center mt-5 ${className}`}>
      <ul className="pagination justify-center flex flex-wrap gap-1">
        <li className={`page-item ${page === 1 ? "disabled opacity-50 pointer-events-none" : ""}`}>
          <a className="page-link cursor-pointer" onClick={handlePrevious}>
            Previous
          </a>
        </li>

        {pageNumbers.map((pageNum, idx) => (
          <li
            key={idx}
            className={`page-item ${
              pageNum === "..."
                ? "disabled pointer-events-none"
                : pageNum === page
                ? "active bg-blue-500 text-white"
                : ""
            }`}
            aria-current={pageNum === page ? "page" : undefined}
          >
            {pageNum === "..." ? (
              <span className="page-link">…</span>
            ) : (
              <a
                className="page-link cursor-pointer"
                onClick={() => handlePageClick(pageNum)}
              >
                {pageNum}
              </a>
            )}
          </li>
        ))}

        <li className={`page-item ${page === totalPages ? "disabled opacity-50 pointer-events-none" : ""}`}>
          <a className="page-link cursor-pointer" onClick={handleNext}>
            Next
          </a>
        </li>
      </ul>
    </div>
  );
}
