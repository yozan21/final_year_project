import { formatDistanceToNow, differenceInDays, format } from "date-fns";

export function formatSmartDate(dateString) {
  const date = new Date(dateString);
  const daysAgo = differenceInDays(new Date(), date);

  if (daysAgo > 2) {
    return format(date, "MMM d, yyyy"); // e.g., "Jul 15, 2025"
  }

  return `${formatDistanceToNow(date, { includeSeconds: true })} ago`;
}
