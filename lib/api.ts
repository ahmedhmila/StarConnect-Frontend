// frontend/lib/api.ts

export const getStrapiURL = (path = "") => {
  return `${process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:1337"}${path}`;
};

export async function fetchGlobalConfig() {
  try {
    // We fetch the "Global Config" single type from Strapi
    const res = await fetch(getStrapiURL("/api/global-config?populate=*"), {
      next: { revalidate: 60 },
      cache: 'no-store'
    });
    const data = await res.json();
    return data.data?.attributes;
  } catch (error) {
    console.error("API Error:", error);
    return null;
  }
}