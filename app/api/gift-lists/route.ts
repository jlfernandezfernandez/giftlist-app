import { NextResponse } from "next/server";
import { GiftList } from "@/types/gift-list";

const giftLists: GiftList[] = [
  {
    id: 1,
    name: "Cumpleaños",
    description: "Regalos para mi cumpleaños",
    date: "2023-06-01",
    owner: "Mis listas",
    gifts: [
      {
        id: 1,
        name: "Auriculares Inalámbricos",
        prize: 99.99,
        currency: "EUR",
        website: "Amazon",
        url: "https://www.amazon.es",
        status: "Pendiente",
        assignedTo: [
          {
            uid: "1",
            displayName: "Juan",
            email: "juan@ejemplo.com",
            idToken: "token",
          },
          {
            uid: "2",
            displayName: "María",
            email: "maria@ejemplo.com",
            idToken: "token",
          },
        ],
      },
      {
        id: 2,
        name: "Olla a Presión Instantánea",
        prize: 79.99,
        currency: "EUR",
        website: "Amazon",
        url: "https://www.amazon.es",
        status: "Reservado",
        assignedTo: [
          {
            uid: "3",
            displayName: "Miguel",
            email: "miguel@ejemplo.com",
            idToken: "token",
          },
        ],
      },
    ],
  },
  {
    id: 2,
    name: "Boda",
    description: "Regalos para la boda de María y Juan",
    date: "2023-09-15",
    owner: "María",
    gifts: [
      {
        id: 3,
        name: "Reloj Inteligente",
        prize: 199.99,
        currency: "EUR",
        website: "Amazon",
        url: "https://www.amazon.es",
        status: "Comprado",
        assignedTo: [
          {
            uid: "1",
            displayName: "Juan",
            email: "juan@ejemplo.com",
            idToken: "token",
          },
          {
            uid: "2",
            displayName: "María",
            email: "maria@ejemplo.com",
            idToken: "token",
          },
          {
            uid: "3",
            displayName: "Miguel",
            email: "miguel@ejemplo.com",
            idToken: "token",
          },
        ],
      },
      {
        id: 4,
        name: "Auriculares con Cancelación de Ruido",
        prize: 149.99,
        currency: "EUR",
        website: "Amazon",
        url: "https://www.amazon.es",
        status: "Pendiente",
        assignedTo: [
          {
            uid: "1",
            displayName: "Juan",
            email: "juan@ejemplo.com",
            idToken: "token",
          },
        ],
      },
    ],
  },
  {
    id: 3,
    name: "Inauguración de la Casa",
    description: "Regalos para la nueva casa de Miguel",
    date: "2023-08-01",
    owner: "Miguel",
    gifts: [
      {
        id: 5,
        name: "Máquina de Espresso",
        prize: 249.99,
        currency: "EUR",
        website: "Amazon",
        url: "https://www.amazon.es",
        status: "Reservado",
        assignedTo: [
          {
            uid: "2",
            displayName: "María",
            email: "maria@ejemplo.com",
            idToken: "token",
          },
          {
            uid: "3",
            displayName: "Miguel",
            email: "miguel@ejemplo.com",
            idToken: "token",
          },
          {
            uid: "4",
            displayName: null,
            email: "miguel@ejemplo.com",
            idToken: "token",
          },
        ],
      },
    ],
  },
];

export async function GET() {
  return NextResponse.json(giftLists);
}
