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
          value: `${year}-${quarterToMonth[q]}`, // "2023-01"
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

export const generateRangeOptions = (step = 25, max = 100) => {
  const options = [
    {
      label: `Any`,
      value: `any`,
    },
  ];
  for (let i = 0; i < max; i += step) {
    options.push({
      label: `${i}-${i + step}%`,
      value: `${i}-${i + step}`,
    });
  }
  return options;
};

export const normalizeHandover = (handoverBy) => {
  if (!handoverBy) return "";

  const [year, monthStr] = handoverBy.split("-");
  const month = parseInt(monthStr, 10);

  let quarterStartMonth;

  if (month >= 1 && month <= 3) quarterStartMonth = "01"; // Q1
  else if (month >= 4 && month <= 6) quarterStartMonth = "04"; // Q2
  else if (month >= 7 && month <= 9) quarterStartMonth = "07"; // Q3
  else quarterStartMonth = "10"; // Q4

  return `${year}-${quarterStartMonth}`;
};


export const getQuarterFromDate = (handoverBy) => {
  if (!handoverBy) return "";

  const [year, monthStr] = handoverBy.split("-");
  const month = parseInt(monthStr, 10);

  let quarter = "";

  if (month >= 1 && month <= 3) quarter = "Q1";
  else if (month >= 4 && month <= 6) quarter = "Q2";
  else if (month >= 7 && month <= 9) quarter = "Q3";
  else if (month >= 10 && month <= 12) quarter = "Q4";

  return `${quarter} ${year}`;
};
