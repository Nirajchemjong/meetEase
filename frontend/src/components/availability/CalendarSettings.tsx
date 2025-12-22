import { EnvelopeIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

const CalendarSettings = () => {
  const [googleConnected, setGoogleConnected] = useState(false);
  const [outlookConnected, setOutlookConnected] = useState(false);

  const handleConnect = (provider: "google" | "outlook") => {
    // Placeholder for future API integration
    if (provider === "google") {
      setGoogleConnected(true);
    } else {
      setOutlookConnected(true);
    }
  };

  return (
    <section className="mt-4 rounded-lg border border-gray-200 bg-white px-4 sm:px-6 py-5 space-y-6">
      <header>
        <h2 className="text-sm font-semibold text-gray-900">
          Calendar settings
        </h2>
        <p className="mt-1 text-xs text-gray-500 max-w-xl">
          Connect your calendars so MeetEase can automatically block busy times
          and keep your availability in sync.
        </p>
      </header>

      <div className="space-y-4">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-red-50">
              <EnvelopeIcon className="h-4 w-4 text-red-500" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">
                Google Calendar
              </p>
              <p className="text-xs text-gray-500">
                Sync events from your Gmail / Google Workspace account.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {googleConnected && (
              <span className="text-xs font-medium text-green-600">
                Connected
              </span>
            )}
            <button
              type="button"
              className={`rounded-full px-4 py-1.5 text-xs font-semibold ${
                googleConnected
                  ? "bg-gray-100 text-gray-600 cursor-default"
                  : "bg-blue-600 text-white hover:bg-blue-700"
              }`}
              onClick={() => !googleConnected && handleConnect("google")}
            >
              {googleConnected ? "Connected" : "Connect"}
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-50">
              <span className="text-xs font-semibold text-blue-600">O</span>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">
                Outlook / Office 365
              </p>
              <p className="text-xs text-gray-500">
                Connect your Microsoft account to sync events.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {outlookConnected && (
              <span className="text-xs font-medium text-green-600">
                Connected
              </span>
            )}
            <button
              type="button"
              className={`rounded-full px-4 py-1.5 text-xs font-semibold ${
                outlookConnected
                  ? "bg-gray-100 text-gray-600 cursor-default"
                  : "bg-blue-600 text-white hover:bg-blue-700"
              }`}
              onClick={() => !outlookConnected && handleConnect("outlook")}
            >
              {outlookConnected ? "Connected" : "Connect"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CalendarSettings;


