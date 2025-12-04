import { createFileRoute } from '@tanstack/react-router'
import LoginPage from '../../pages/auth/login'

// This route still maps to "/" in the URL.
// The "(auth)" folder is just for organizing files.
export const Route = createFileRoute('/(auth)/')({
  component: LoginPage,
})

