/* eslint-disable @typescript-eslint/no-explicit-any */
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function flattenAttributes(entry: any): any {
  if (!entry) return null;

  if (Array.isArray(entry)) {
    return entry.map(flattenAttributes);
  }

  if (typeof entry === "object" && entry !== null) {
    const { attributes, ...rest } = entry;

    const flattened = { ...rest.data };

    if (attributes && typeof attributes === "object") {
      for (const key in attributes) {
        const value = attributes[key];
        if (value && typeof value === "object") {
          // Recursively flatten nested data
          if (value.data !== undefined) {
            flattened[key] = flattenAttributes(value.data);
          } else {
            flattened[key] = flattenAttributes(value);
          }
        } else {
          flattened[key] = value;
        }
      }
    }

    return flattened;
  }

  return entry;
}

export function getStrapiURL() {
  return process.env.NEXT_PUBLIC_STRAPI_URL ?? "http://localhost:5000";
}

export function getStrapiMedia(url: string | null) {
  if (url == null) return null;
  if (url.startsWith("data:")) return url;
  if (url.startsWith("http") || url.startsWith("//")) return url;
  return `${getStrapiURL()}${url}`;
}
