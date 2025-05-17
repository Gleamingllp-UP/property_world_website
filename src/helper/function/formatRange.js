export const formatRange = (arr, label, isBed = false) => {
  if (!arr || arr.length === 0) return `${label}: Any`;

  const sorted = [...arr].sort((a, b) => a - b);

  const min = sorted[0];
  const max = sorted[sorted.length - 1];

  const formatValue = (val) => {
    if (val === 0 && isBed) return "Studio";
    if (val >= 7) return "7+";
    return val;
  };

  const from = formatValue(min);
  const to = formatValue(max);

  return from === to ? `${label}: ${from}` : `${label}: ${from} - ${to}`;
};
