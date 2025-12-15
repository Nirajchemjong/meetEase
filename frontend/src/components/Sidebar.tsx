import {
    Bars3Icon,
    CalendarIcon,
    ChartBarIcon,
    ClockIcon,
    Cog6ToothIcon,
    LinkIcon,
    PowerIcon,
    UserGroupIcon,
} from "@heroicons/react/24/outline";
import { Link, useRouterState } from "@tanstack/react-router";

const navMenu = [
  { name: "Dashboard", to: "/dashboard", icon: <ChartBarIcon className="h-5 w-5 mr-2" /> },
  { name: "Scheduling", to: "/scheduling", icon: <LinkIcon className="h-5 w-5 mr-2" /> },
  { name: "Bookings", to: "/bookings", icon: <CalendarIcon className="h-5 w-5 mr-2" /> },
  { name: "Availability", to: "/availability", icon: <ClockIcon className="h-5 w-5 mr-2" /> },
  { name: "Customers", to: "/customers", icon: <UserGroupIcon className="h-5 w-5 mr-2" /> },
  { name: "Settings", to: "/settings", icon: <Cog6ToothIcon className="h-5 w-5 mr-2" /> },
  { name: "Logout", to: "/logout", icon: <PowerIcon className="h-5 w-5 mr-2" /> },
];

export const Sidebar = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
}) => (
  <aside
    className={`
      fixed sm:relative z-40 inset-y-0 left-0 
      transform ${open ? "translate-x-0" : "-translate-x-full"}
      transition-transform duration-200 ease-in-out
      sm:inset-auto sm:h-full sm:w-64
      bg-white shadow-md w-64 flex flex-col h-full
    `}
  >
    <div className="flex items-center justify-between px-4 py-4 border-b sm:hidden">
      <span className="font-bold text-lg">Menu</span>
      <button
        className="p-2"
        aria-label="Close sidebar"
        onClick={() => setOpen(false)}
      >
        <Bars3Icon className="h-6 w-6" />
      </button>
    </div>
    <SidebarNav />
  </aside>
);

const SidebarNav = () => {
  const routerState = useRouterState();
  const pathname = routerState.location.pathname;

  return (
    <nav className="flex-1 px-4 py-6">
      <ul className="space-y-2">
        {navMenu.map((item) => {
          const isActive =
            pathname === item.to || (item.to !== "/" && pathname.startsWith(item.to));

          const baseClasses =
            "flex items-center px-3 py-2 rounded font-medium transition";
          const inactiveClasses = "text-gray-700 hover:bg-blue-100";
          const activeClasses = "bg-blue-600 text-white";

          return (
            <li key={item.to}>
              <Link
                to={item.to}
                className={`${baseClasses} ${
                  isActive ? activeClasses : inactiveClasses
                }`}
              >
                {item.icon}
                <span>{item.name}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};