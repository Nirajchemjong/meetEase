const mockBookings = [
  {
    attendee: "Alex Johnson",
    event: "Intro call",
    time: "Today, 14:30",
    location: "Google Meet",
    status: "Upcoming",
  },
  {
    attendee: "Sara Lee",
    event: "Product demo",
    time: "Tomorrow, 10:00",
    location: "Zoom",
    status: "Upcoming",
  },
  {
    attendee: "John Doe",
    event: "Customer check‑in",
    time: "Yesterday, 16:00",
    location: "Phone",
    status: "Completed",
  },
];

const statusClasses: Record<string, string> = {
  Upcoming: "bg-blue-50 text-blue-700",
  Completed: "bg-green-50 text-green-700",
  Cancelled: "bg-red-50 text-red-700",
};

const BookingsTable = () => {
  return (
    <section className="rounded-lg border border-gray-200 bg-white overflow-hidden">
      <div className="px-4 sm:px-6 py-3 border-b border-gray-200 flex items-center justify-between">
        <h2 className="text-sm font-semibold text-gray-900">All bookings</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-gray-50 text-xs uppercase text-gray-500">
            <tr>
              <th className="px-4 sm:px-6 py-2">Attendee</th>
              <th className="px-4 sm:px-6 py-2">Event</th>
              <th className="px-4 sm:px-6 py-2">Time</th>
              <th className="px-4 sm:px-6 py-2">Location</th>
              <th className="px-4 sm:px-6 py-2">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {mockBookings.map((b) => (
              <tr key={`${b.attendee}-${b.time}`} className="align-middle">
                <td className="px-4 sm:px-6 py-2 text-gray-900">
                  {b.attendee}
                </td>
                <td className="px-4 sm:px-6 py-2 text-gray-700">{b.event}</td>
                <td className="px-4 sm:px-6 py-2 text-gray-700">{b.time}</td>
                <td className="px-4 sm:px-6 py-2 text-gray-700">
                  {b.location}
                </td>
                <td className="px-4 sm:px-6 py-2">
                  <span
                    className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      statusClasses[b.status] ?? "bg-gray-50 text-gray-700"
                    }`}
                  >
                    {b.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default BookingsTable;


