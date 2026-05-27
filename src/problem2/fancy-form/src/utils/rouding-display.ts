export function formatWithTilde(num: number, precision = 6) {
  const multiplier = Math.pow(10, precision);
  const rounded = Math.round(num * multiplier) / multiplier;

  // If the numbers don't match, it means it was rounded/approximated
  if (rounded !== num) {
    return `~${rounded}`;
  }

  return rounded; // Or rounded.toFixed(precision) to force zeros
}
