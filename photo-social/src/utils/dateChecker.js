export function dateChecker(date) {
  const today = new Date();
  const dateToCheck = new Date(date);
  const diffTime = Math.abs(dateToCheck - today);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return `${diffDays}d`;
}
