import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function formatTimeAgo(timestamp: string): string {
  const date = new Date(timestamp);
  const now = new Date();
  const diffMillis = now.getTime() - date.getTime();
  const diffSeconds = Math.floor(diffMillis / 1000);
  const diffMinutes = Math.floor(diffSeconds / 60);
  const diffHours = Math.floor(diffMinutes / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffDays > 1) {
      return `${diffDays} days ago`;
  } else if (diffDays === 1) {
      return `1 day ago`;
  } else if (diffHours > 1) {
      return `${diffHours} hours ago`;
  } else if (diffHours === 1) {
      return `1 hour ago`;
  } else if (diffMinutes > 1) {
      return `${diffMinutes} minutes ago`;
  } else {
      return `${diffSeconds} seconds ago`;
  }
}