const sections = [
  {
    title: "Profile",
    description: "Update your name, photo, and contact details.",
  },
  {
    title: "Notifications",
    description: "Control email reminders and follow‑up notifications.",
  },
  {
    title: "Workspace",
    description: "Manage team members, branding, and default settings.",
  },
];

const SettingsSections = () => {
  return (
    <section className="space-y-4">
      {sections.map((section) => (
        <article
          key={section.title}
          className="rounded-lg border border-gray-200 bg-white shadow-sm px-4 sm:px-6 py-4"
        >
          <h2 className="text-sm font-semibold text-gray-900">
            {section.title}
          </h2>
          <p className="mt-1 text-xs text-gray-500">{section.description}</p>
        </article>
      ))}
    </section>
  );
};

export default SettingsSections;


