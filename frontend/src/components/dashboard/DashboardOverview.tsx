const cards = [
  { label: "Upcoming meetings", value: "8", subtext: "Next 7 days" },
  {
    label: "Bookings this week",
    value: "24",
    subtext: "Across all event types",
  },
  { label: "No‑show rate", value: "2%", subtext: "Last 30 days" },
];

const DashboardOverview = () => {
  return (
    <section className="grid gap-4 sm:grid-cols-3 mb-6">
      {cards.map((card) => (
        <article
          key={card.label}
          className="rounded-lg border border-gray-200 bg-white shadow-sm px-4 py-3"
        >
          <p className="text-xs text-gray-500">{card.label}</p>
          <p className="mt-1 text-2xl font-semibold text-gray-900">
            {card.value}
          </p>
          <p className="mt-1 text-xs text-gray-500">{card.subtext}</p>
        </article>
      ))}
    </section>
  );
};

export default DashboardOverview;