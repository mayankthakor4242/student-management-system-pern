import { Link, useLocation } from "react-router-dom";
import { LayoutDashboard, Users, UserCircle } from "lucide-react";

const links = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/students", label: "Students", icon: Users },
  { to: "/profile", label: "Profile", icon: UserCircle },
];

const Sidebar = () => {
  const location = useLocation();

  return (
    <div
      className="w-64 min-h-screen text-white flex flex-col"
      style={{
        background: "linear-gradient(180deg, #14213D 0%, #1A2A4D 100%)",
        borderRight: "1px solid rgba(200,155,60,0.15)",
      }}
    >
      {/* Brand mark */}
      <div className="px-6 pt-7 pb-6" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <p
          className="text-[10px] uppercase tracking-[0.2em] font-medium mb-1"
          style={{ color: "#8894B0" }}
        >
          Menu
        </p>
        <h2
          className="text-xl font-semibold tracking-tight"
          style={{ fontFamily: "'Playfair Display', 'Georgia', serif" }}
        >
          Dashboard
        </h2>
      </div>

      {/* Nav links */}
      <ul className="flex-1 px-3 py-6 space-y-1">
        {links.map(({ to, label, icon: Icon }) => {
          const isActive = location.pathname === to;
          return (
            <li key={to}>
              <Link
                to={to}
                className="group relative flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-colors duration-150"
                style={{
                  color: isActive ? "#F5F5F0" : "#B9C1D6",
                  backgroundColor: isActive ? "rgba(200,155,60,0.12)" : "transparent",
                }}
                onMouseEnter={(e) => {
                  if (!isActive) e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.05)";
                }}
                onMouseLeave={(e) => {
                  if (!isActive) e.currentTarget.style.backgroundColor = "transparent";
                }}
              >
                {/* active indicator */}
                <span
                  className="absolute left-0 top-1/2 -translate-y-1/2 h-5 w-[3px] rounded-full transition-opacity duration-150"
                  style={{
                    backgroundColor: "#C89B3C",
                    opacity: isActive ? 1 : 0,
                  }}
                />
                <Icon
                  size={18}
                  strokeWidth={2}
                  color={isActive ? "#C89B3C" : "#8894B0"}
                  className="transition-colors duration-150"
                />
                {label}
              </Link>
            </li>
          );
        })}
      </ul>

      {/* Footer accent */}
      <div
        className="px-6 py-4 text-[11px]"
        style={{ borderTop: "1px solid rgba(255,255,255,0.06)", color: "#5C6787" }}
      >
        Student Management System
      </div>
    </div>
  );
};

export default Sidebar;