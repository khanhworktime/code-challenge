export function calculateRate(
  payTokenPrice?: number | null,
  receiveTokenPrice?: number | null,
) {
  if (!payTokenPrice || !receiveTokenPrice) return 0;

  return payTokenPrice / receiveTokenPrice;
}

export function calculateReceiveAmount(
  payAmount?: number | null,
  rate?: number | null,
) {
  if (!payAmount || !rate) return 0;

  return payAmount * rate;
}
