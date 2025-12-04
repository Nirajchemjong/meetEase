type Booking = {
  id: number;
  /** ISO start date-time string */
  start: string;
  dateLabel: string;
  timeRange: string;
  attendee: string;
  eventType: string;
  hosts: number;
  nonHosts: number;
  location: string;
  meetingLink: string;
};

type BookingDetailsModalProps = {
  booking: Booking | null;
  isOpen: boolean;
  onClose: () => void;
};

const BookingDetailsModal = ({
  booking,
  isOpen,
  onClose,
}: BookingDetailsModalProps) => {
  if (!isOpen || !booking) return null;

  const handleCopyLink = async () => {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(booking.meetingLink);
      }
    } catch {
      // ignore for now
    }
  };

  const handleCancel = () => {
    // Placeholder for API call
    console.log("Cancel booking", booking.id);
    onClose();
  };

  const handleReschedule = () => {
    // Placeholder for API call
    console.log("Reschedule booking", booking.id);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-40 flex items-center justify-center bg-black/30 px-4"
      aria-modal="true"
      role="dialog"
    >
      <div className="max-w-lg w-full rounded-xl bg-white shadow-xl border border-gray-200">
        <div className="px-6 pt-6 pb-4 space-y-3">
          <h2 className="text-base font-semibold text-gray-900">Meeting details</h2>
          <p className="text-sm font-medium text-gray-900">{booking.attendee}</p>
          <p className="text-xs text-gray-500">
            Event type{" "}
            <span className="font-semibold text-gray-900">
              {booking.eventType}
            </span>
          </p>
          <p className="text-xs text-gray-500">
            {booking.dateLabel} • {booking.timeRange}
          </p>
          <p className="text-xs text-gray-500">Location: {booking.location}</p>

          <div className="mt-3 space-y-1">
            <p className="text-xs font-semibold text-gray-900">Meeting link</p>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <a
                href={booking.meetingLink}
                target="_blank"
                rel="noreferrer"
                className="text-xs text-blue-600 hover:underline break-all"
              >
                {booking.meetingLink}
              </a>
              <button
                type="button"
                onClick={handleCopyLink}
                className="self-start rounded-full border border-gray-300 px-3 py-1 text-xs font-medium text-gray-700 hover:bg-gray-50"
              >
                Copy link
              </button>
            </div>
          </div>
        </div>

        <div className="mt-2 flex items-center justify-between gap-2 border-t border-gray-200 px-6 py-4">
          <button
            type="button"
            className="text-xs sm:text-sm font-medium text-gray-600 hover:text-gray-800"
            onClick={onClose}
          >
            Close
          </button>
          <div className="flex items-center gap-2">
            <button
              type="button"
              className="rounded-full border border-gray-300 px-4 py-1.5 text-xs sm:text-sm font-semibold text-gray-700 hover:bg-gray-50"
              onClick={handleCancel}
            >
              Cancel
            </button>
            <button
              type="button"
              className="rounded-full bg-blue-600 px-5 py-1.5 text-xs sm:text-sm font-semibold text-white hover:bg-blue-700"
              onClick={handleReschedule}
            >
              Reschedule
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export type { Booking };
export default BookingDetailsModal;


