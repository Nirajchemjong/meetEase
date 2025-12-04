import { useState } from "react";
import CustomerFormModal from "../../components/customers/CustomerFormModal";
import CustomersList from "../../components/customers/CustomersList";
import { initialCustomers, type Customer } from "../../components/customers/types";
import PageHeader from "../../components/layout/PageHeader";
import DefaultLayout from "../../layouts/DefaultLayout";

const CustomersPage = () => {
  const [customers, setCustomers] = useState<Customer[]>(initialCustomers);
  const [isAddOpen, setIsAddOpen] = useState(false);

  const handleAddCustomer = (data: Omit<Customer, "id">) => {
    setCustomers((prev) => [
      ...prev,
      {
        id: prev.length ? prev[prev.length - 1].id + 1 : 1,
        ...data,
      },
    ]);
  };

  return (
    <DefaultLayout>
      <section className="max-w-6xl mx-auto w-full py-4 sm:py-6 px-4 sm:px-0">
        <PageHeader
          title="Customers"
          subtitle="Manage people who have booked with you."
          rightSlot={
            <button
              type="button"
              className="rounded-full bg-blue-600 px-4 py-1.5 text-xs font-semibold text-white hover:bg-blue-700"
              onClick={() => setIsAddOpen(true)}
            >
              + New customer
            </button>
          }
        />
        <CustomersList customers={customers} />
      </section>

      <CustomerFormModal
        isOpen={isAddOpen}
        onClose={() => setIsAddOpen(false)}
        onSubmit={handleAddCustomer}
        availableTags={[...new Set(customers.map((c) => c.tag))].filter(Boolean)}
        availableEventTypes={[
          ...new Set(customers.map((c) => c.eventType)),
        ].filter(Boolean)}
        availableTimezones={[
          ...new Set(customers.map((c) => c.timezone)),
        ].filter(Boolean)}
      />
    </DefaultLayout>
  );
};

export default CustomersPage;