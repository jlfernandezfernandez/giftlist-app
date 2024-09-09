export function DashboardHeader() {
  return (
    <header className="flex items-center justify-between mb-8">
      <div className="flex items-center">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
          Dashboard
        </h1>
      </div>
      <div className="hidden sm:block">
        <p className="text-sm text-muted-foreground">
          Welcome to your GiftList AI dashboard
        </p>
      </div>
    </header>
  );
}
