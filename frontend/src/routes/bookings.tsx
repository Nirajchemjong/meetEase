import { createFileRoute } from '@tanstack/react-router'
import BookingsPage from '../pages/bookings'

export const Route = createFileRoute('/bookings')({
  component: BookingsPage,
})
