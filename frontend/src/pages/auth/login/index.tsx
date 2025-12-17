import { Link } from '@tanstack/react-router';
import type { FormEvent } from 'react';

const LoginPage = () => {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    console.log("Login submitted:", {
      email: formData.get("email"),
      password: formData.get("password"),
    });
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-[#f5f7f9] px-4">
      <section className="w-full max-w-md bg-white border border-gray-200 rounded-xl p-8">
        <h1 className="text-2xl font-bold text-center text-gray-800">
          Sign In to MeetEase
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              required
              placeholder="you@example.com"
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              required
              placeholder="••••••••"
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          {/* Forgot password */}
          <p className="text-center mt-4 text-sm">
            <Link
              to="/forget-password"
              className="text-blue-500 hover:text-blue-700 hover:underline"
            >
              Forgot password?
            </Link>
          </p>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2.5 rounded-md text-sm font-medium 
                      hover:bg-blue-700 transition focus:outline-none focus:ring-2 
                      focus:ring-blue-500 focus:ring-offset-2"
          >
            Sign in
          </button>
        </form>

        <div className="my-6 flex items-center">
          <div className="flex-1 h-px bg-gray-300" />
          <span className="mx-3 text-xs text-gray-500">OR</span>
          <div className="flex-1 h-px bg-gray-300" />
        </div>

        {/* Google Button */}
        <button
          className="w-full border border-gray-300 rounded-md py-2.5 flex items-center justify-center gap-2 text-sm font-medium hover:bg-gray-50 transition cursor:pointer"
        >
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            className="h-5 w-5"
            alt="Google"
          />
          Sign in with Google
        </button>
      </section>
    </main>
  );
};

export default LoginPage;
