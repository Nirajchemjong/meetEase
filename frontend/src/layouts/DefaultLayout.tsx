import { Bars3Icon } from "@heroicons/react/24/outline";
import { useRouterState } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";
import { Sidebar } from "../components/Sidebar.tsx";


const DefaultLayout = ({ children }: { children: ReactNode }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const pathname = useRouterState().location.pathname;
  console.log(pathname);
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <header className="flex items-center justify-between bg-white px-4 py-3 shadow-md">
        <div className="flex items-center gap-2">
        <button
          className="p-2 mr-2"
          aria-label={sidebarOpen ? "Close sidebar" : "Open sidebar"}
          onClick={() => setSidebarOpen((prev) => !prev)}
        >
          <Bars3Icon className="h-6 w-6" aria-hidden="true" />
        </button>
        <span className="font-semibold text-lg">MeetEase</span>
        </div>
        <span className="font-semibold text-lg">{pathname.toUpperCase().split("/").pop()}</span>
      </header>

      {/* Sidebar + main content row */}
      <div className="flex flex-1">
        {/* Sidebar for desktop and drawer on mobile */}
        <div>
          {/* Overlay for mobile */}
          {sidebarOpen && (
            <div
              className="fixed inset-0 z-30 bg-black opacity-30 sm:hidden"
              onClick={() => setSidebarOpen(false)}
            />
          )}
          <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
        </div>

        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DefaultLayout;