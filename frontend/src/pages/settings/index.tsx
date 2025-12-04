import SettingsSections from "../../components/settings/SettingsSections";
import PageHeader from "../../components/layout/PageHeader";
import DefaultLayout from "../../layouts/DefaultLayout";

const SettingsPage = () => {
  return (
    <DefaultLayout>
      <section className="max-w-6xl mx-auto w-full py-4 sm:py-6 px-4 sm:px-0">
        <PageHeader
          title="Settings"
          subtitle="Configure your MeetEase account and workspace."
        />
        <SettingsSections />
      </section>
    </DefaultLayout>
  );
};

export default SettingsPage;