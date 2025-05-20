export const generateHandoverOptions = () => {
    const options = [];
    const currentYear = new Date().getFullYear();
    const quarters = ["Q1", "Q2", "Q3", "Q4"];
  
    for (let year = currentYear; year < currentYear + 7; year++) {
      if (year === currentYear || year === currentYear + 1) {
        // Add quarterly options for current and next year
        quarters.forEach((q) => {
          options.push({
            label: `${q} ${year}`,
            value: `${q.toLowerCase()}-${year}`, // e.g., q2-2025
          });
        });
      } else {
        // Add yearly options for future years
        options.push({
          label: `${year}`,
          value: `${year}`,
        });
      }
    }
  
    return options;
  };
  
  