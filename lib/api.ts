// frontend/lib/api.ts

export const getStrapiURL = (path = "") => {
  return `${process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:1337"}${path}`;
};

// 1. Fetch the Crisis Config
export async function fetchGlobalConfig() {
  try {
    const res = await fetch(getStrapiURL("/api/global-config?populate=*"), {
      next: { revalidate: 60 },
      cache: 'no-store'
    });
    const data = await res.json();
    // FIX: Handle v5 (data.data is the object) vs v4 (data.data.attributes)
    return data.data?.attributes || data.data; 
  } catch (error) {
    console.error("API Error (Global Config):", error);
    return null;
  }
}

// 2. Fetch Articles (News)
export async function fetchArticles() {
  try {
    // Sort by ID descending to get newest first
    const res = await fetch(getStrapiURL("/api/articles?populate=*&sort=id:desc"), {
      next: { revalidate: 60 },
      cache: 'no-store'
    });
    const data = await res.json();
    return data.data; // Returns the array of articles
  } catch (error) {
    console.error("API Error (Articles):", error);
    return [];
  }
}

// 3. Helper to get image URL safely
export function getStrapiMedia(url: string | null) {
  if (url == null) {
    return null;
  }
  // If it's already a full URL (Azure Blob), return it
  if (url.startsWith("http") || url.startsWith("//")) {
    return url;
  }
  // Otherwise prepend the API URL
  return `${getStrapiURL()}${url}`;
}