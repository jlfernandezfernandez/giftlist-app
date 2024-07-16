// lib/services/scraper-service.ts

import { Gift } from "@/types/gift";

export async function scrapeProductData(url: string): Promise<Partial<Gift>> {
  // Mocked scraping data
  const mockData: Partial<Gift>[] = [
    {
      name: "iPhone 14",
      description: "Almacenamiento: 128GB, Color: Negro",
      price: 999.99,
      currency: "EUR",
      website: "Amazon",
      link: url,
    },
    {
      name: "Apple Watch Series 7",
      description: "Tamaño: 45mm, Color: Plata",
      price: 429.99,
      currency: "EUR",
      website: "Amazon",
      link: url,
    },
    {
      name: "Roborock S7",
      description: "",
      price: 549.99,
      currency: "EUR",
      website: "Amazon",
      link: url,
    },
    {
      name: "Nike Air Max",
      description: "Tamaño: 42, Color: Negro",
      price: 129.99,
      currency: "EUR",
      website: "Amazon",
      link: url,
    },
    {
      name: "Perfume Dior Sauvage",
      description: "Volumen: 100ml",
      price: 89.99,
      currency: "EUR",
      website: "Amazon",
      link: url,
    },
    {
      name: "MacBook Air M2",
      description: "Almacenamiento: 256GB, Color: Gris Espacial",
      price: 1249.99,
      currency: "EUR",
      website: "Amazon",
      link: url,
    },
    {
      name: "AirPods Pro",
      description: "",
      price: 279.99,
      currency: "EUR",
      website: "Amazon",
      link: url,
    },
    {
      name: "Roborock H6",
      description: "",
      price: 299.99,
      currency: "EUR",
      website: "Amazon",
      link: url,
    },
    {
      name: "Chaqueta Nike Sportswear",
      description: "Tamaño: L, Color: Negro",
      price: 79.99,
      currency: "EUR",
      website: "Amazon",
      link: url,
    },
    {
      name: "Perfume Chanel No. 5",
      description: "Volumen: 100ml",
      price: 109.99,
      currency: "EUR",
      website: "Amazon",
      link: url,
    },
  ];

  const selectedData = mockData[Math.floor(Math.random() * mockData.length)];

  return selectedData;
}
