import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect, useCallback } from "react";
import AvailabilityHeader from "../../components/availability/AvailabilityHeader";
import CalendarSettings from "../../components/availability/CalendarSettings";
import EventTypesModal from "../../components/availability/EventTypesModal";
import type { EventType, WeeklyRow } from "../../components/availability/types";
import WeeklyHoursCard from "../../components/availability/WeeklyHoursCard";
import DefaultLayout from "../../layouts/DefaultLayout";
import { requireAuth } from "../../auth/requireAuth";
import {
  getAvailabilities,
  createAvailability,
  updateAvailability,
  deleteAvailability,
  type Availability,
} from "../../lib/api";
import toast from "react-hot-toast";

export const Route = createFileRoute("/availability/")({
  beforeLoad: requireAuth,
  component: AvailabilityRoute,
});

// Day mapping: 0 = Sunday, 1 = Monday, ..., 6 = Saturday
const DAY_LABELS: WeeklyRow[] = [
  { short: "S", label: "Sunday", unavailable: true },
  { short: "M", label: "Monday", unavailable: true },
  { short: "T", label: "Tuesday", unavailable: true },
  { short: "W", label: "Wednesday", unavailable: true },
  { short: "T", label: "Thursday", unavailable: true },
  { short: "F", label: "Friday", unavailable: true },
  { short: "S", label: "Saturday", unavailable: true },
];

// Helper to convert backend time format (HH:MM:SS) to frontend format (HH:MM)
const formatTimeForInput = (time: string): string => {
  if (!time) return "";
  // If already in HH:MM format, return as is
  if (time.match(/^\d{2}:\d{2}$/)) return time;
  // If in HH:MM:SS format, remove seconds
  return time.substring(0, 5);
};

// Helper to convert frontend time format (HH:MM) to backend format (HH:MM:SS)
const formatTimeForBackend = (time: string): string => {
  if (!time) return "";
  // If already has seconds, return as is
  if (time.match(/^\d{2}:\d{2}:\d{2}$/)) return time;
  // Add seconds if missing
  return `${time}:00`;
};

function AvailabilityRoute() {
  const [activeTab, setActiveTab] = useState<"schedules" | "calendar">(
    "schedules",
  );
  const [isEventTypeModalOpen, setIsEventTypeModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [, setSaving] = useState(false);
  const [availabilitiesMap, setAvailabilitiesMap] = useState<
    Map<number, Availability>
  >(new Map());

  const [weeklyRows, setWeeklyRows] = useState<WeeklyRow[]>(DAY_LABELS);

  const [timezone, setTimezone] = useState<string>(
    Intl.DateTimeFormat().resolvedOptions().timeZone || "UTC",
  );

  const [eventTypes, setEventTypes] = useState<EventType[]>([
    {
      id: 1,
      name: "Interview with Beyond",
      duration: "30 mins",
      location: "Google Meet",
      selected: true,
    },
  ]);

  // Load availabilities from API
  const loadAvailabilities = useCallback(async () => {
    try {
      setLoading(true);
      const availabilities = await getAvailabilities();
      
      // Create a map for easy lookup
      const map = new Map<number, Availability>();
      availabilities.forEach((avail) => {
        map.set(avail.day_of_week, avail);
      });
      setAvailabilitiesMap(map);

      // Map to WeeklyRow format
      const rows: WeeklyRow[] = DAY_LABELS.map((day, index) => {
        const availability = map.get(index);
        if (availability) {
          return {
            ...day,
            from: formatTimeForInput(availability.start_time),
            to: formatTimeForInput(availability.end_time),
            unavailable: false,
          };
        }
        return { ...day, unavailable: true };
      });

      setWeeklyRows(rows);
    } catch (err) {
      console.error("Failed to load availabilities:", err);
      // Keep default rows on error
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadAvailabilities();
  }, [loadAvailabilities]);

  // Save availability when rows change
  const handleSaveAvailability = useCallback(
    async (dayIndex: number, row: WeeklyRow) => {
      try {
        setSaving(true);
        const existingAvailability = availabilitiesMap.get(dayIndex);

        if (row.unavailable || !row.from || !row.to) {
          // Delete if unavailable or times are missing
          if (existingAvailability) {
            await deleteAvailability(existingAvailability.id);
            availabilitiesMap.delete(dayIndex);
            setAvailabilitiesMap(new Map(availabilitiesMap));
            toast.success(`${row.label} availability removed`);
          }
        } else {
          // Create or update availability
          const payload = {
            day_of_week: dayIndex,
            start_time: formatTimeForBackend(row.from),
            end_time: formatTimeForBackend(row.to),
          };

          if (existingAvailability) {
            await updateAvailability(existingAvailability.id, {
              start_time: payload.start_time,
              end_time: payload.end_time,
            });
            toast.success(`${row.label} availability updated`);
          } else {
            const newAvailability = await createAvailability(payload);
            availabilitiesMap.set(dayIndex, newAvailability);
            setAvailabilitiesMap(new Map(availabilitiesMap));
            toast.success(`${row.label} availability saved`);
          }
        }
      } catch (err) {
        const message =
          err instanceof Error ? err.message : "Failed to save availability";
        toast.error(message);
      } finally {
        setSaving(false);
      }
    },
    [availabilitiesMap]
  );

  // Handle weekly rows change with debounced save
  const handleWeeklyRowsChange = useCallback(
    (newRows: WeeklyRow[]) => {
      setWeeklyRows(newRows);
      
      // Find which row changed by comparing with previous rows
      newRows.forEach((newRow, index) => {
        const oldRow = weeklyRows[index];
        if (
          oldRow.from !== newRow.from ||
          oldRow.to !== newRow.to ||
          oldRow.unavailable !== newRow.unavailable
        ) {
          // Debounce: save after a short delay
          setTimeout(() => {
            void handleSaveAvailability(index, newRow);
          }, 500);
        }
      });
    },
    [weeklyRows, handleSaveAvailability]
  );

  return (
    <DefaultLayout>
      <section className="max-w-6xl mx-auto w-full pt-2 pb-4 sm:pt-3 sm:pb-6 px-4 sm:px-0">
        <AvailabilityHeader
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />

        {activeTab === "schedules" ? (
          <>
            {loading ? (
              <div className="mt-4 rounded-lg border border-gray-200 bg-white p-6 text-center text-sm text-gray-500">
                Loading availabilities...
              </div>
            ) : (
              <WeeklyHoursCard
                rows={weeklyRows}
                onChange={handleWeeklyRowsChange}
                timezone={timezone}
                onTimezoneChange={setTimezone}
              />
            )}

            <EventTypesModal
              isOpen={isEventTypeModalOpen}
              onClose={() => setIsEventTypeModalOpen(false)}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              eventTypes={eventTypes}
              onSetEventTypes={(updater) =>
                setEventTypes((prev) => updater(prev))
              }
            />
          </>
        ) : (
          <CalendarSettings />
        )}
      </section>
    </DefaultLayout>
  );
}


