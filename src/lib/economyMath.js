export function calculateInflation(previousBasketPrice, currentBasketPrice) {
  if (!previousBasketPrice || previousBasketPrice <= 0) return 0;
  return Number((((currentBasketPrice - previousBasketPrice) / previousBasketPrice) * 100).toFixed(2));
}

export function suggestMarketPrice(history = []) {
  if (!history.length) return null;
  const total = history.reduce((sum, row) => sum + Number(row.average_price || 0), 0);
  return Math.round(total / history.length);
}
