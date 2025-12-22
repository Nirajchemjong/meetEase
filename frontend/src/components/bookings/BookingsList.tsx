import { useEffect, useMemo, useState } from "react";
import BookingDetailsModal, { type Booking } from "./BookingDetailsModal";
import {
  getFilteredEvents,
  type EventFilterType,
  type GroupedEventsResponse,
  type FilteredEvent,
} from "../../lib/api";

type TabId = "upcoming" | "past";

const BookingsList = () => {
  const [activeTab, setActiveTab] = useState<TabId>("upcoming");
  const [dateRangeOpen, setDateRangeOpen] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [fromDate, setFromDate] = useState<string>("");
  const [toDate, setToDate] = useState<string>("");
  const [bookingsByDate, setBookingsByDate] = useState<[string, Booking[]][]>(
    [],
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Map API event to Booking shape used in UI
  const mapEventToBooking = (dateLabel: string, ev: FilteredEvent): Booking => {
    const attendee =
      ev.contact_name || ev.contact_email || "Unknown attendee";

    // Convert "HH:MM" to 12-hour range string
    const to12Hour = (time: string): string => {
      const [h, m] = time.split(":").map(Number);
      const period = h >= 12 ? "PM" : "AM";
      const displayHours = h % 12 === 0 ? 12 : h % 12;
      return `${displayHours.toString().padStart(2, "0")}:${m
        .toString()
        .padStart(2, "0")} ${period}`;
    };

    const startLabel = to12Hour(ev.start_time);
    const endLabel = to12Hour(ev.end_time);

    return {
      id: ev.id,
      start: ev.start_at,
      dateLabel,
      timeRange: `${startLabel} – ${endLabel}`,
      attendee,
      eventType: ev.event_types || "Event",
      hosts: 1,
      nonHosts: 0,
      location: ev.location_link || "Online",
      meetingLink: ev.location_link || "",
    };
  };

  // Load bookings from backend when tab or date range changes
  useEffect(() => {
    const loadBookings = async () => {
      try {
        setLoading(true);
        setError(null);

        let filter: EventFilterType = activeTab;
        const options: { from_date?: string; to_date?: string } = {};

        // If both from & to are set, use range filter
        if (fromDate && toDate) {
          filter = "range";
          options.from_date = fromDate;
          options.to_date = toDate;
        }

        const grouped: GroupedEventsResponse = await getFilteredEvents(
          filter,
          options,
        );

        const entries: [string, Booking[]][] = Object.entries(grouped).map(
          ([dateKey, events]) => [
            dateKey,
            events.map((ev) => mapEventToBooking(dateKey, ev)),
          ],
        );

        // Sort dates descending for upcoming, ascending for past
        entries.sort(([a], [b]) => {
          if (activeTab === "upcoming") {
            return a < b ? 1 : -1;
          }
          return a > b ? 1 : -1;
        });

        setBookingsByDate(entries);
      } catch (err) {
        const message =
          err instanceof Error ? err.message : "Failed to load bookings";
        setError(message);
        setBookingsByDate([]);
      } finally {
        setLoading(false);
      }
    };

    void loadBookings();
  }, [activeTab, fromDate, toDate]);

  const totalEvents = useMemo(
    () => bookingsByDate.reduce((sum, [, list]) => sum + list.length, 0),
    [bookingsByDate],
  );

  return (
    <>
      {/* Top controls: calendar select, toggle, count */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between mb-4">
        <div className="flex items-center gap-3">
          <button
            type="button"
            className="inline-flex items-center rounded-lg border border-gray-300 px-3 py-1.5 text-xs sm:text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
             MeetEase
            <span className="ml-1 text-[10px]">▼</span>
          </button>
          <label className="flex items-center gap-2 text-xs text-gray-600">
            <span>Show buffers</span>
            <input
              type="checkbox"
              className="h-4 w-7 appearance-none rounded-full bg-gray-200 outline-none cursor-pointer checked:bg-blue-600 relative"
            />
          </label>
        </div>
        <p className="text-xs text-gray-500">
          Displaying {totalEvents} event{totalEvents === 1 ? "" : "s"}
        </p>
      </div>

      {/* Tabs + actions */}
      <div className="rounded-t-lg border border-gray-200 border-b-0 bg-white">
        <div className="flex items-center justify-between px-4 sm:px-6 pt-3">
          <div className="flex items-center gap-6 text-sm font-medium text-gray-500">
            {(["upcoming", "past"] as TabId[]).map((tab) => {
              const active = tab === activeTab;
              const label = tab === "upcoming" ? "Upcoming" : "Past";
              return (    
                <button
                  key={tab}
                  type="button"
                  className={`relative pb-2 ${
                    active ? "text-blue-600" : "text-gray-500 hover:text-gray-800"
                  }`}
                  onClick={() => setActiveTab(tab)}
                >
                  {label}
                  {active && (
                    <span className="absolute left-0 right-0 -bottom-0.5 h-0.5 bg-blue-600 rounded-full" />
                  )}
                </button>
              );
            })}
            <button
              type="button"
              className="text-sm text-gray-500 -mt-2 hover:text-gray-800 flex items-center gap-1"
              onClick={() => setDateRangeOpen((v) => !v)}
            >
              Date range
              <span className="text-[10px]">
                {dateRangeOpen ? "▲" : "▼"}
              </span>
            </button>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <button
              type="button"
              className="rounded-full border border-gray-300 px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-50"
            >
              Export
            </button>
            <button
              type="button"
              className="rounded-full border border-gray-300 px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-50 flex items-center gap-1"
              onClick={() => setFilterOpen((v) => !v)}
            >
              Filter
              <span className="text-[10px]">{filterOpen ? "▲" : "▼"}</span>
            </button>
          </div>
        </div>

        {/* Date range panel */}
        {dateRangeOpen && (
          <div className="px-4 sm:px-6 pb-3 text-xs text-gray-700 space-y-2">
            <p className="font-medium">Date range</p>
            <div className="flex flex-col sm:flex-row sm:items-center gap-2">
              <label className="flex items-center gap-2">
                <span className="w-12 text-gray-500">From</span>
                <input
                  type="date"
                  value={fromDate}
                  onChange={(e) => setFromDate(e.target.value)}
                  className="rounded-md border border-gray-300 px-2 py-1 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </label>
              <label className="flex items-center gap-2">
                <span className="w-12 text-gray-500">To</span>
                <input
                  type="date"
                  value={toDate}
                  onChange={(e) => setToDate(e.target.value)}
                  className="rounded-md border border-gray-300 px-2 py-1 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </label>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  className="rounded-full border border-gray-300 px-3 py-1 text-xs font-medium text-gray-700 hover:bg-gray-50"
                  onClick={() => {
                    setFromDate("");
                    setToDate("");
                  }}
                >
                  Clear
                </button>
                <button
                  type="button"
                  className="rounded-full bg-blue-600 px-4 py-1 text-xs font-semibold text-white hover:bg-blue-700"
                  onClick={() => setDateRangeOpen(false)}
                >
                  Apply
                </button>
              </div>
            </div>
          </div>
        )}
        {filterOpen && (
          <div className="px-4 sm:px-6 pb-3 text-xs text-gray-500">
            Additional filters coming soon.
          </div>
        )}
      </div>

      {/* Bookings list */}
      <div className="border border-t-0 border-gray-200 rounded-b-lg bg-white">
        {loading ? (
          <p className="px-4 sm:px-6 py-6 text-xs text-gray-500">
            Loading bookings...
          </p>
        ) : error ? (
          <p className="px-4 sm:px-6 py-6 text-xs text-red-500">{error}</p>
        ) : bookingsByDate.length === 0 ? (
          <p className="px-4 sm:px-6 py-6 text-xs text-gray-500">
            No meetings to show.
          </p>
        ) : (
          <>
            {bookingsByDate.map(([dateLabel, bookings]) => (
              <div key={dateLabel}>
                <div className="px-4 sm:px-6 py-3 border-b border-gray-100 text-xs font-medium text-gray-600">
                  {dateLabel}
                </div>
                {bookings.map((b) => (
                  <button
                    key={b.id}
                    type="button"
                    className="w-full text-left px-4 sm:px-6 py-4 flex items-center justify-between gap-4 hover:bg-blue-50/40 focus:outline-none focus:bg-blue-50/60"
                    onClick={() => setSelectedBooking(b)}
                  >
                    <div className="flex items-center gap-4">
                      <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-purple-500" />
                      <div>
                        <p className="text-xs text-gray-500">
                          {b.timeRange}
                        </p>
                        <p className="text-sm font-semibold text-gray-900">
                          {b.attendee}
                        </p>
                        <p className="text-xs text-gray-500">
                          Event type{" "}
                          <span className="font-semibold text-gray-900">
                            {b.eventType}
                          </span>
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <p className="text-xs text-gray-500 whitespace-nowrap">
                        {b.hosts} host | {b.nonHosts} non-hosts
                      </p>
                      <button
                        type="button"
                        className="text-xs font-medium text-blue-600 hover:underline"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedBooking(b);
                        }}
                      >
                        Details
                      </button>
                    </div>
                  </button>
                ))}
              </div>
            ))}

            <p className="px-4 sm:px-6 py-4 text-xs text-gray-400 text-center border-t border-gray-100">
              You&apos;ve reached the end of the list
            </p>
          </>
        )}
      </div>

      <BookingDetailsModal
        booking={selectedBooking}
        isOpen={!!selectedBooking}
        onClose={() => setSelectedBooking(null)}
      />
    </>
  );
};

export default BookingsList;


