import { createFileRoute } from "@tanstack/react-router";
import PageHeader from "../../components/layout/PageHeader";
import EventTypesList from "../../components/scheduling/EventTypesList";
import DefaultLayout from "../../layouts/DefaultLayout";
import { requireAuth } from "../../auth/requireAuth";

export const Route = createFileRoute("/scheduling/")({
  beforeLoad: requireAuth,
  component: SchedulingRoute,
});

function SchedulingRoute() {
  return (
    <DefaultLayout>
      <section className="max-w-6xl mx-auto w-full pt-2 pb-4 sm:pt-3 sm:pb-6 px-4 sm:px-0">
        <PageHeader
          title="Scheduling"
          subtitle="Manage your event types and booking links."
        />
        <EventTypesList />
      </section>
    </DefaultLayout>
  );
}


