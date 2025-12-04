import EventTypesList from "../../components/scheduling/EventTypesList";
import PageHeader from "../../components/layout/PageHeader";
import DefaultLayout from "../../layouts/DefaultLayout";

const SchedulingPage = () => {
  return (
    <DefaultLayout>
      <section className="max-w-6xl mx-auto w-full py-4 sm:py-6 px-4 sm:px-0">
        <PageHeader
          title="Scheduling"
          subtitle="Manage your event types and booking links."
        />
        <EventTypesList />
      </section>
    </DefaultLayout>
  );
};

export default SchedulingPage;