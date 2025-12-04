import { createFileRoute } from '@tanstack/react-router'
import SchedulePage from '../pages/schedule'

export const Route = createFileRoute('/scheduling')({
  component: SchedulePage,
})


