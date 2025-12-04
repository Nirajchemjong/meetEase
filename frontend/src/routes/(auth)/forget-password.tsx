import { createFileRoute } from '@tanstack/react-router'
import ForgetPasswordPage from '../../pages/auth/forgetpassword'

// This route still maps to "/forget-password" in the URL.
// The "(auth)" folder is just for organizing files.
export const Route = createFileRoute('/(auth)/forget-password')({
  component: ForgetPasswordPage,
})

