"use client";

import { useUser } from "@/context/user-context";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { DashboardWidgets } from "@/components/dashboard/dashboard-widgets";
import { OwnGiftListSummary } from "@/components/dashboard/own-gift-list-summary";
import { SharedGiftListSummary } from "@/components/dashboard/shared-gift-list-summary";
import { AssignedGiftsSummary } from "@/components/dashboard/assigned-gifts-summary";

export default function DashboardPage() {
  const { user } = useUser();

  if (!user) {
    return null;
  }

  return (
    <div className="space-y-8">
      <DashboardHeader />
      <DashboardWidgets user={user} />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <OwnGiftListSummary />
        <SharedGiftListSummary />
      </div>
      <AssignedGiftsSummary user={user} />
    </div>
  );
}
