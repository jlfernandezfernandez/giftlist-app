import { NextResponse } from "next/server";
import { GiftList } from "@/types/gift-list";

const giftLists: GiftList[] = [
  {
    id: "1",
    name: "birthday",
    description: "Gifts for my birthday",
    date: "2023-06-01",
    privacy: "private",
    users: [
      {
        userId: "sgPjqDaObAWP4DF25QeoTCG45Y32",
        role: "owner",
        displayName: "Jordi",
        email: "jordi@example.com",
      },
      {
        userId: "2",
        role: "guest",
        displayName: "Aldara",
        email: "aldara@example.com",
      },
    ],
    gifts: [
      {
        id: "1",
        name: "wireless headphones",
        description: "High quality Bluetooth headphones",
        link: "https://www.amazon.es",
        price: 99.99,
        currency: "eur",
        state: "pending",
        assignedUsers: [
          {
            userId: "2",
            displayName: "Aldara",
            email: "aldara@example.com",
          },
        ],
      },
      {
        id: "2",
        name: "instant pressure cooker",
        description: "Multi-function pressure cooker",
        link: "https://www.amazon.es",
        price: 79.99,
        currency: "eur",
        state: "reserved",
        assignedUsers: [
          {
            userId: "sgPjqDaObAWP4DF25QeoTCG45Y32",
            displayName: "Jordi",
            email: "jordi@example.com",
          },
        ],
      },
    ],
  },
  {
    id: "2",
    name: "wedding",
    description: "Gifts for Aldara and Jordi's wedding",
    date: "2023-09-15",
    privacy: "private",
    users: [
      {
        userId: "2",
        role: "owner",
        displayName: "Aldara",
        email: "aldara@example.com",
      },
      {
        userId: "sgPjqDaObAWP4DF25QeoTCG45Y32",
        role: "owner",
        displayName: "Jordi",
        email: "jordi@example.com",
      },
      {
        userId: "3",
        role: "guest",
        displayName: "Juan",
        email: "juan@example.com",
      },
    ],
    gifts: [
      {
        id: "3",
        name: "smart watch",
        description: "High quality smart watch",
        link: "https://www.amazon.es",
        price: 199.99,
        currency: "eur",
        state: "bought",
        assignedUsers: [
          {
            userId: "3",
            displayName: "Juan",
            email: "juan@example.com",
          },
        ],
      },
      {
        id: "4",
        name: "noise-cancelling headphones",
        description: "High quality noise-cancelling headphones",
        link: "https://www.amazon.es",
        price: 149.99,
        currency: "eur",
        state: "pending",
        assignedUsers: [],
      },
    ],
  },
  {
    id: "3",
    name: "housewarming",
    description: "Gifts for Jordi's new house",
    date: "2023-08-01",
    privacy: "private",
    users: [
      {
        userId: "sgPjqDaObAWP4DF25QeoTCG45Y32",
        role: "guest",
        displayName: "Jordi",
        email: "jordi@example.com",
      },
      {
        userId: "4",
        role: "owner",
        displayName: "Ana",
        email: "ana@example.com",
      },
    ],
    gifts: [
      {
        id: "5",
        name: "espresso machine",
        description: "High quality espresso machine",
        link: "https://www.amazon.es",
        price: 249.99,
        currency: "eur",
        state: "reserved",
        assignedUsers: [
          {
            userId: "sgPjqDaObAWP4DF25QeoTCG45Y32",
            displayName: "Jordi",
            email: "jordi@example.com",
          },
        ],
      },
    ],
  },
  {
    id: "4",
    name: "bithday",
    description: "Gifts for Aldara",
    date: "2023-08-01",
    privacy: "private",
    users: [
      {
        userId: "2",
        role: "owner",
        displayName: "Aldara",
        email: "aldara@example.com",
      },
      {
        userId: "sgPjqDaObAWP4DF25QeoTCG45Y32",
        role: "guest",
        displayName: "Jordi",
        email: "jordi@example.com",
      },
    ],
    gifts: [
      {
        id: "6",
        name: "Apple Watch",
        description: "Apple Watch Series 7",
        link: "https://www.amazon.es",
        price: 450.0,
        currency: "eur",
        state: "pending",
        assignedUsers: [
          {
            userId: "sgPjqDaObAWP4DF25QeoTCG45Y32",
            displayName: "Jordi",
            email: "jordi@example.com",
          },
        ],
      },
    ],
  },
];

export async function GET(request: Request) {
  const url = new URL(request.url);
  const userId = url.searchParams.get("userId");
  console.log(`GET gift lists for user ${userId}`);

  return NextResponse.json(giftLists);
}
