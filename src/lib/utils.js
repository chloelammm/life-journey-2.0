import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { pagesConfig } from "@/pages.config"

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

// Detect if the app is running inside an iframe
export const isIframe = window.self !== window.top

// Generate a URL for a given page name based on pages.config routing
export function createPageUrl(pageName) {
  const { Pages, mainPage } = pagesConfig
  const mainPageKey = mainPage ?? Object.keys(Pages)[0]

  // Main page should map to root "/"
  if (pageName === mainPageKey) {
    return "/"
  }

  // Case-insensitive lookup to match how NavigationTracker resolves pages
  const pageKeys = Object.keys(Pages)
  const matchedKey =
    pageKeys.find((key) => key.toLowerCase() === pageName.toLowerCase()) ||
    pageName

  return `/${matchedKey}`
}
