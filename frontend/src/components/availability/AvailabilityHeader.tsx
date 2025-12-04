type AvailabilityHeaderProps = {
  activeTab: "schedules" | "calendar";
  onTabChange: (tab: "schedules" | "calendar") => void;
};

const AvailabilityHeader = ({
  activeTab,
  onTabChange,
}: AvailabilityHeaderProps) => {
  const tabs: { id: "schedules" | "calendar"; label: string }[] = [
    { id: "schedules", label: "Schedules" },
    { id: "calendar", label: "Calendar settings" },
  ];

  return (
    <header className="mb-4 sm:mb-6">
      <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900 mb-4">
        Availability
      </h1>

      <nav
        aria-label="Availability sections"
        className="border-b border-gray-200"
      >
        <ul className="flex gap-6 text-sm font-medium text-gray-500">
          {tabs.map((tab) => {
            const isActive = tab.id === activeTab;
            return (
              <li key={tab.id}>
                <button
                  type="button"
                  onClick={() => onTabChange(tab.id)}
                  className={`relative pb-2 transition-colors ${
                    isActive
                      ? "text-blue-600"
                      : "text-gray-500 hover:text-gray-800"
                  }`}
                >
                  {tab.label}
                  {isActive && (
                    <span className="absolute left-0 right-0 -bottom-0.5 h-0.5 bg-blue-600 rounded-full" />
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
};

export default AvailabilityHeader;


