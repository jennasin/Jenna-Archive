import { QueryClient } from "@tanstack/react-query";
import { GalleryItem } from "@shared/schema";

let cachedGalleryData: GalleryItem[] | null = null;

export async function fetchGalleryData(): Promise<GalleryItem[]> {
  if (cachedGalleryData) {
    return cachedGalleryData;
  }

  const response = await fetch("/data/gallery.json");
  if (!response.ok) {
    throw new Error(`Failed to fetch gallery data: ${response.statusText}`);
  }
  
  const data = await response.json();
  cachedGalleryData = data;
  return data;
}

export async function getGalleryItem(id: string): Promise<GalleryItem | undefined> {
  const items = await fetchGalleryData();
  return items.find((item) => item.id === id);
}

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchInterval: false,
      refetchOnWindowFocus: false,
      staleTime: Infinity,
      retry: false,
    },
    mutations: {
      retry: false,
    },
  },
});
