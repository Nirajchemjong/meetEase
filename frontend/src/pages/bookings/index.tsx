import BookingsList from "../../components/bookings/BookingsList";
import PageHeader from "../../components/layout/PageHeader";
import DefaultLayout from "../../layouts/DefaultLayout";

const BookingsPage = () => {
  return (
    <DefaultLayout>
      <section className="max-w-6xl mx-auto w-full py-4 sm:py-6 px-4 sm:px-0">
        <PageHeader
          title="Bookings"
          subtitle="See all upcoming and past meetings scheduled with you."
        />
        <BookingsList />
      </section>
    </DefaultLayout>
  );
};

export default BookingsPage;