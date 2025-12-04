const mockEventTypes = [
  {
    name: "Intro call",
    duration: "15 mins",
    location: "Google Meet",
    status: "Active",
  },
  {
    name: "Product demo",
    duration: "30 mins",
    location: "Zoom",
    status: "Active",
  },
  {
    name: "Customer check‑in",
    duration: "45 mins",
    location: "Phone",
    status: "Paused",
  },
];

const EventTypesList = () => {
  return (
    <section className="rounded-lg border border-gray-200 bg-white shadow-sm">
      <div className="flex items-center justify-between px-4 sm:px-6 py-3 border-b border-gray-200">
        <h2 className="text-sm font-semibold text-gray-900">Event types</h2>
        <button
          type="button"
          className="rounded-full bg-blue-600 px-4 py-1.5 text-xs font-semibold text-white hover:bg-blue-700"
        >
          + New event type
        </button>
      </div>
      <ul className="divide-y divide-gray-200">
        {mockEventTypes.map((event) => (
          <li key={event.name} className="px-4 sm:px-6 py-3 flex items-center justify-between gap-3">
            <div>
              <p className="text-sm font-medium text-gray-900">
                {event.name}
              </p>
              <p className="text-xs text-gray-500">
                {event.duration} • {event.location}
              </p>
            </div>
            <span
              className={`text-xs font-medium ${
                event.status === "Active" ? "text-green-600" : "text-gray-500"
              }`}
            >
              {event.status}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default EventTypesList;


