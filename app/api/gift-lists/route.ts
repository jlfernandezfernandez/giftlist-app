import { NextResponse } from "next/server";
import { GiftList } from "@/types/gift-list";

const giftLists: GiftList[] = [
  {
    id: 1,
    name: "Birthday",
    description: "Gifts for my birthday",
    date: "2023-06-01",
    owner: "Mine",
    gifts: [
      {
        id: 1,
        name: "Wireless Headphones",
        prize: 99.99,
        website: "Amazon",
        status: "Pending",
        assignedTo: [
          {
            uid: "1",
            displayName: "John",
            email: "john@example.com",
            idToken: "token",
          },
          {
            uid: "2",
            displayName: "Sarah",
            email: "sarah@example.com",
            idToken: "token",
          },
        ],
      },
      {
        id: 2,
        name: "Instant Pot",
        prize: 79.99,
        website: "Amazon",
        status: "Reserved",
        assignedTo: [
          {
            uid: "3",
            displayName: "Michael",
            email: "michael@example.com",
            idToken: "token",
          },
        ],
      },
    ],
  },
  {
    id: 2,
    name: "Wedding",
    description: "Gifts for Sarah and John's wedding",
    date: "2023-09-15",
    owner: "Sarah",
    gifts: [
      {
        id: 3,
        name: "Smartwatch",
        prize: 199.99,
        website: "Amazon",
        status: "Purchased",
        assignedTo: [
          {
            uid: "1",
            displayName: "John",
            email: "john@example.com",
            idToken: "token",
          },
          {
            uid: "2",
            displayName: "Sarah",
            email: "sarah@example.com",
            idToken: "token",
          },
          {
            uid: "3",
            displayName: "Michael",
            email: "michael@example.com",
            idToken: "token",
          },
        ],
      },
      {
        id: 4,
        name: "Noise-Cancelling Headphones",
        prize: 149.99,
        website: "Amazon",
        status: "Pending",
        assignedTo: [
          {
            uid: "1",
            displayName: "John",
            email: "john@example.com",
            idToken: "token",
          },
        ],
      },
    ],
  },
  {
    id: 3,
    name: "Housewarming",
    description: "Gifts for Michael's new home",
    date: "2023-08-01",
    owner: "Michael",
    gifts: [
      {
        id: 5,
        name: "Espresso Machine",
        prize: 249.99,
        website: "Amazon",
        status: "Reserved",
        assignedTo: [
          {
            uid: "2",
            displayName: "Sarah",
            email: "sarah@example.com",
            idToken: "token",
          },
          {
            uid: "3",
            displayName: "Michael",
            email: "michael@example.com",
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
