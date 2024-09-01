// lib/services/affiliate-service.ts
import { URL } from "url";

export async function getAffiliateLink(url: string): Promise<string> {
  try {
    const parsedUrl = new URL(url);
    if (parsedUrl.hostname.includes("amazon")) {
      parsedUrl.searchParams.set("tag", "giftlistai-21");
      return parsedUrl.toString();
    }
    // Añade aquí lógica para otras tiendas
    return url;
  } catch (error) {
    console.error("Error al generar el enlace de afiliado:", error);
    return url;
  }
}
