export const generateHandoverOptions = () => {
  const options = [];
  const currentYear = new Date().getFullYear();
  const quarters = ["Q1", "Q2", "Q3", "Q4"];
  const quarterToMonth = {
    Q1: "01",
    Q2: "04",
    Q3: "07",
    Q4: "10",
  };
  for (let year = currentYear; year < currentYear + 7; year++) {
    if (year === currentYear || year === currentYear + 1) {
      quarters.forEach((q) => {
        options.push({
          label: `${q} ${year}`,
          value: `${year}-${quarterToMonth[q]}`,// "2023-01"
        });
      });
    } else {
      options.push({
        label: `${year}`,
        value: `${year}-12`,
      });
    }
  }

  return options;
};
