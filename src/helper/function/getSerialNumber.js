export const getSerialNumber = (index, currentPage, limit) => {
    return (currentPage - 1) * limit + index + 1;
  };
  
 