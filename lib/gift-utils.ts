// components/lib/gift-utils.ts

export const badgeVariant = (status: string) => {
  switch (status) {
    case "pending":
      return "default";
    case "reserved":
      return "warning"; // Yellow
    case "bought":
      return "success"; // Green
    default:
      return "default";
  }
};

export const currencySymbol = (currency: string) => {
  switch (currency.toLowerCase()) {
    case "usd":
      return "$";
    case "eur":
      return "€";
    case "gbp":
      return "£";
    default:
      return "";
  }
};
