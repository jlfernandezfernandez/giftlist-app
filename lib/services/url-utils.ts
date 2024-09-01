// lib/services/url-utils.ts
export function extractWebsiteName(url: string): string {
  try {
    const hostname = new URL(url).hostname;
    const parts = hostname.split(".");
    if (parts.length > 2) {
      return parts[parts.length - 2];
    }
    return parts[0];
  } catch (error) {
    console.error("Invalid URL:", url);
    return "";
  }
}
