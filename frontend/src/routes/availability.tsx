import { createFileRoute } from '@tanstack/react-router'
import AvailabilityPage from '../pages/availability'

export const Route = createFileRoute('/availability')({
  component: AvailabilityPage,
})


