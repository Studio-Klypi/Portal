export function relativeDate(date: Date | string): string {
  const diff: number = Date.now() - new Date(date).getTime();

  // Time calculations for days, hours, minutes and seconds
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  if (days === 0) {
    if (hours === 0) {
      if (minutes === 0) {
        return seconds < 10 ? "Few seconds ago" : `${seconds} seconds ago`;
      }

      return minutes === 1 ? "A minute ago" : `${minutes} minutes ago`;
    }

    return hours === 1 ? "An hour ago" : `${hours} hours ago`;
  }

  return days === 1 ? "Yesterday" : `${days} days ago`;
}
