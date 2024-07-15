import { GiftList } from "@/types/gift-list";

export const giftListsMock: GiftList[] = [
  {
    id: "1",
    name: "birthday",
    description: "Gifts for my birthday",
    date: "2023-06-01",
    users: [
      {
        userId: "{userId}",
        role: "owner",
        name: "Jordi",
        email: "jordi@example.com",
      },
      {
        userId: "2",
        role: "guest",
        name: "Aldara",
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
            name: "Aldara",
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
    users: [
      {
        userId: "2",
        role: "owner",
        name: "Aldara",
        email: "aldara@example.com",
      },
      {
        userId: "{userId}",
        role: "owner",
        name: "Jordi",
        email: "jordi@example.com",
      },
      {
        userId: "3",
        role: "guest",
        name: "Juan",
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
            name: "Juan",
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
    users: [
      {
        userId: "{userId}",
        role: "owner",
        name: "Jordi",
        email: "jordi@example.com",
      },
      {
        userId: "4",
        role: "guest",
        name: "Ana",
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
            name: "Ana",
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
    users: [
      {
        userId: "2",
        role: "owner",
        name: "Aldara",
        email: "aldara@example.com",
      },
      {
        userId: "{userId}",
        role: "guest",
        name: "Jordi",
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
    users: [
      {
        userId: "4",
        role: "owner",
        name: "Ana",
        email: "ana@example.com",
      },
      {
        userId: "5",
        role: "guest",
        name: "Carlos",
        email: "carlos@example.com",
      },
      {
        userId: "6",
        role: "guest",
        name: "Lucía",
        email: "lucia@example.com",
      },
      {
        userId: "{userId}",
        role: "guest",
        name: "Jordi",
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
            name: "Carlos",
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
            name: "Lucía",
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
    users: [
      {
        userId: "4",
        role: "owner",
        name: "Ana",
        email: "ana@example.com",
      },
      {
        userId: "5",
        role: "guest",
        name: "Carlos",
        email: "carlos@example.com",
      },
      {
        userId: "6",
        role: "guest",
        name: "Lucía",
        email: "lucia@example.com",
      },
      {
        userId: "7",
        role: "guest",
        name: "Miguel",
        email: "miguel@example.com",
      },
      {
        userId: "8",
        role: "guest",
        name: "Sara",
        email: "sara@example.com",
      },
      {
        userId: "9",
        role: "guest",
        name: "Laura",
        email: "laura@example.com",
      },
      {
        userId: "10",
        role: "guest",
        name: "Pablo",
        email: "pablo@example.com",
      },
      {
        userId: "11",
        role: "guest",
        name: "Irene",
        email: "irene@example.com",
      },
      {
        userId: "12",
        role: "guest",
        name: "Alberto",
        email: "alberto@example.com",
      },
      {
        userId: "13",
        role: "guest",
        name: "Marta",
        email: "marta@example.com",
      },
      {
        userId: "{userId}",
        role: "guest",
        name: "Jordi",
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
            name: "Carlos",
            email: "carlos@example.com",
          },
          {
            userId: "6",
            name: "Lucía",
            email: "lucia@example.com",
          },
          {
            userId: "7",
            name: "Miguel",
            email: "miguel@example.com",
          },
          {
            userId: "8",
            name: "Sara",
            email: "sara@example.com",
          },
          {
            userId: "9",
            name: "Laura",
            email: "laura@example.com",
          },
          {
            userId: "10",
            name: "Pablo",
            email: "pablo@example.com",
          },
          {
            userId: "11",
            name: "Irene",
            email: "irene@example.com",
          },
          {
            userId: "12",
            name: "Alberto",
            email: "alberto@example.com",
          },
          {
            userId: "13",
            name: "Marta",
            email: "marta@example.com",
          },
          {
            userId: "{userId}",
            name: "Jordi",
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
    users: [
      {
        userId: "4",
        role: "owner",
        name: "Ana",
        email: "ana@example.com",
      },
      {
        userId: "5",
        role: "guest",
        name: "Carlos",
        email: "carlos@example.com",
      },
      {
        userId: "6",
        role: "guest",
        name: "Lucía",
        email: "lucia@example.com",
      },
      {
        userId: "{userId}",
        role: "guest",
        name: "Jordi",
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
            name: "Carlos",
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
            name: "Lucía",
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
    users: [
      {
        userId: "4",
        role: "owner",
        name: "Ana",
        email: "ana@example.com",
      },
      {
        userId: "5",
        role: "guest",
        name: "Carlos",
        email: "carlos@example.com",
      },
      {
        userId: "6",
        role: "guest",
        name: "Lucía",
        email: "lucia@example.com",
      },
      {
        userId: "{userId}",
        role: "guest",
        name: "Jordi",
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
            name: "Carlos",
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
            name: "Lucía",
            email: "lucia@example.com",
          },
          {
            userId: "{userId}",
            name: "Jordi",
            email: "jordi@example.com",
          },
        ],
      },
    ],
  },
];

export function replaceUserIdInGiftList(
  giftLists: GiftList[],
  userId: string
): GiftList[] {
  return giftLists.map((giftList) => replaceUserIdInGift(giftList, userId));
}

export function replaceUserIdInGift(
  giftList: GiftList,
  userId: string
): GiftList {
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
}
