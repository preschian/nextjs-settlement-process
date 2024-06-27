import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// @ts-ignore
export const fetcher = (...args) => fetch(...args).then((res) => res.json())
