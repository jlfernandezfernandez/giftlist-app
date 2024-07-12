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
        userId: "{userId}",
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
        description: null,
        link: "https://www.amazon.es",
        website: "Amazon",
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
        website: "Amazon",
        price: 79.99,
        currency: "eur",
        state: "reserved",
        assignedUsers: [],
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
        userId: "{userId}",
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
        website: "Amazon",
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
        description: null,
        link: "https://www.amazon.es",
        website: "Amazon",
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
        userId: "{userId}",
        role: "owner",
        displayName: "Jordi",
        email: "jordi@example.com",
      },
      {
        userId: "4",
        role: "guest",
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
        website: "Amazon",
        price: 249.99,
        currency: "eur",
        state: "reserved",
        assignedUsers: [
          {
            userId: "4",
            displayName: "Ana",
            email: "ana@example.com",
          },
        ],
      },
    ],
  },
  {
    id: "4",
    name: "birthday",
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
        userId: "{userId}",
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
        website: "Amazon",
        price: 450.0,
        currency: "eur",
        state: "pending",
        assignedUsers: [],
      },
    ],
  },
  {
    id: "5",
    name: "baby shower",
    description: "Gifts for Ana's baby shower",
    date: "2023-10-10",
    privacy: "private",
    users: [
      {
        userId: "4",
        role: "owner",
        displayName: "Ana",
        email: "ana@example.com",
      },
      {
        userId: "5",
        role: "guest",
        displayName: "Carlos",
        email: "carlos@example.com",
      },
      {
        userId: "6",
        role: "guest",
        displayName: "Lucía",
        email: "lucia@example.com",
      },
      {
        userId: "{userId}",
        role: "guest",
        displayName: "Jordi",
        email: "jordi@example.com",
      },
    ],
    gifts: [
      {
        id: "7",
        name: "baby crib",
        description: "Comfortable baby crib",
        link: "https://www.amazon.es",
        website: "Amazon",
        price: 300.0,
        currency: "eur",
        state: "pending",
        assignedUsers: [],
      },
      {
        id: "8",
        name: "baby stroller",
        description: null,
        link: "https://www.amazon.es",
        website: "Amazon",
        price: 200.0,
        currency: "eur",
        state: "reserved",
        assignedUsers: [
          {
            userId: "5",
            displayName: "Carlos",
            email: "carlos@example.com",
          },
        ],
      },
      {
        id: "9",
        name: "baby monitor",
        description: "High quality baby monitor",
        link: "https://www.amazon.es",
        website: "Amazon",
        price: 150.0,
        currency: "eur",
        state: "bought",
        assignedUsers: [
          {
            userId: "6",
            displayName: "Lucía",
            email: "lucia@example.com",
          },
        ],
      },
    ],
  },
  {
    id: "6",
    name: "housewarming",
    description: "Gifts for Ana's new house",
    date: "2023-11-20",
    privacy: "private",
    users: [
      {
        userId: "4",
        role: "owner",
        displayName: "Ana",
        email: "ana@example.com",
      },
      {
        userId: "5",
        role: "guest",
        displayName: "Carlos",
        email: "carlos@example.com",
      },
      {
        userId: "6",
        role: "guest",
        displayName: "Lucía",
        email: "lucia@example.com",
      },
      {
        userId: "7",
        role: "guest",
        displayName: "Miguel",
        email: "miguel@example.com",
      },
      {
        userId: "8",
        role: "guest",
        displayName: "Sara",
        email: "sara@example.com",
      },
      {
        userId: "9",
        role: "guest",
        displayName: "Laura",
        email: "laura@example.com",
      },
      {
        userId: "10",
        role: "guest",
        displayName: "Pablo",
        email: "pablo@example.com",
      },
      {
        userId: "11",
        role: "guest",
        displayName: "Irene",
        email: "irene@example.com",
      },
      {
        userId: "12",
        role: "guest",
        displayName: "Alberto",
        email: "alberto@example.com",
      },
      {
        userId: "13",
        role: "guest",
        displayName: "Marta",
        email: "marta@example.com",
      },
      {
        userId: "{userId}",
        role: "guest",
        displayName: "Jordi",
        email: "jordi@example.com",
      },
    ],
    gifts: [
      {
        id: "10",
        name: "coffee maker",
        description: null,
        link: "https://www.amazon.es",
        website: "Amazon",
        price: 299.99,
        currency: "eur",
        state: "pending",
        assignedUsers: [
          {
            userId: "5",
            displayName: "Carlos",
            email: "carlos@example.com",
          },
          {
            userId: "6",
            displayName: "Lucía",
            email: "lucia@example.com",
          },
          {
            userId: "7",
            displayName: "Miguel",
            email: "miguel@example.com",
          },
          {
            userId: "8",
            displayName: "Sara",
            email: "sara@example.com",
          },
          {
            userId: "9",
            displayName: "Laura",
            email: "laura@example.com",
          },
          {
            userId: "10",
            displayName: "Pablo",
            email: "pablo@example.com",
          },
          {
            userId: "11",
            displayName: "Irene",
            email: "irene@example.com",
          },
          {
            userId: "12",
            displayName: "Alberto",
            email: "alberto@example.com",
          },
          {
            userId: "13",
            displayName: "Marta",
            email: "marta@example.com",
          },
          {
            userId: "{userId}",
            displayName: "Jordi",
            email: "jordi@example.com",
          },
        ],
      },
    ],
  },
  {
    id: "7",
    name: "office setup",
    description: "Gifts for Ana's new office setup",
    date: "2024-01-15",
    privacy: "private",
    users: [
      {
        userId: "4",
        role: "owner",
        displayName: "Ana",
        email: "ana@example.com",
      },
      {
        userId: "5",
        role: "guest",
        displayName: "Carlos",
        email: "carlos@example.com",
      },
      {
        userId: "6",
        role: "guest",
        displayName: "Lucía",
        email: "lucia@example.com",
      },
      {
        userId: "{userId}",
        role: "guest",
        displayName: "Jordi",
        email: "jordi@example.com",
      },
    ],
    gifts: [
      {
        id: "11",
        name: "office chair",
        description: null,
        link: "https://www.amazon.es",
        website: "Amazon",
        price: 150.0,
        currency: "eur",
        state: "pending",
        assignedUsers: [],
      },
      {
        id: "12",
        name: "desk lamp",
        description: "Adjustable desk lamp",
        link: "https://www.amazon.es",
        website: "Amazon",
        price: 40.0,
        currency: "eur",
        state: "reserved",
        assignedUsers: [
          {
            userId: "5",
            displayName: "Carlos",
            email: "carlos@example.com",
          },
        ],
      },
      {
        id: "13",
        name: "monitor stand",
        description: "Adjustable monitor stand",
        link: "https://www.amazon.es",
        website: "Amazon",
        price: 30.0,
        currency: "eur",
        state: "bought",
        assignedUsers: [
          {
            userId: "6",
            displayName: "Lucía",
            email: "lucia@example.com",
          },
        ],
      },
    ],
  },
  {
    id: "8",
    name: "baking essentials",
    description: "Gifts for Ana's baking adventures",
    date: "2024-02-10",
    privacy: "private",
    users: [
      {
        userId: "4",
        role: "owner",
        displayName: "Ana",
        email: "ana@example.com",
      },
      {
        userId: "5",
        role: "guest",
        displayName: "Carlos",
        email: "carlos@example.com",
      },
      {
        userId: "6",
        role: "guest",
        displayName: "Lucía",
        email: "lucia@example.com",
      },
      {
        userId: "{userId}",
        role: "guest",
        displayName: "Jordi",
        email: "jordi@example.com",
      },
    ],
    gifts: [
      {
        id: "14",
        name: "stand mixer",
        description: "High-end stand mixer",
        link: "https://www.amazon.es",
        website: "Amazon",
        price: null,
        currency: null,
        state: "pending",
        assignedUsers: [],
      },
      {
        id: "15",
        name: "baking pans set",
        description: null,
        link: "https://www.amazon.es",
        website: "Amazon",
        price: 60.0,
        currency: "eur",
        state: "reserved",
        assignedUsers: [
          {
            userId: "5",
            displayName: "Carlos",
            email: "carlos@example.com",
          },
        ],
      },
      {
        id: "16",
        name: "measuring cups",
        description: "Stainless steel measuring cups",
        link: "https://www.amazon.es",
        website: "Amazon",
        price: 20.0,
        currency: "eur",
        state: "bought",
        assignedUsers: [
          {
            userId: "6",
            displayName: "Lucía",
            email: "lucia@example.com",
          },
          {
            userId: "{userId}",
            displayName: "Jordi",
            email: "jordi@example.com",
          },
        ],
      },
    ],
  },
];

export async function GET(request: Request) {
  const userId = validateUserId(request);
  console.log(`GET gift lists for user ${userId}`);
  return NextResponse.json(replaceUserIdInGiftLists(giftLists, userId));
}

function validateUserId(request: Request): string {
  const url = new URL(request.url);
  const userId = url.searchParams.get("userId");
  if (!userId) {
    throw { message: "userId is required" };
  }
  return userId;
}

function replaceUserIdInGiftLists(
  giftLists: GiftList[],
  userId: string
): GiftList[] {
  return giftLists.map((giftList) => {
    return {
      ...giftList,
      users: giftList.users.map((user) =>
        user.userId === "{userId}" ? { ...user, userId } : user
      ),
      gifts: giftList.gifts.map((gift) => ({
        ...gift,
        assignedUsers: gift.assignedUsers.map((assignedUser) =>
          assignedUser.userId === "{userId}"
            ? { ...assignedUser, userId }
            : assignedUser
        ),
      })),
    };
  });
}
