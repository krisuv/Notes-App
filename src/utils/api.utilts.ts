/**
 * Utility function for debouncing user input
 * @param func - The function to debounce
 * @param wait - The debounce time in milliseconds
 * @returns The debounced function
 */
export function debounce<T extends (...args: any[]) => void>(
  func: T,
  wait: number
): T {
  let timeout: number | undefined;
  return function (this: any, ...args: Parameters<T>) {
    clearTimeout(timeout);
    timeout = window.setTimeout(() => func.apply(this, args), wait);
  } as T;
}
