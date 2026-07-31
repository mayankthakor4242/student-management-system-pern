import { GraduationCap, LogOut } from "lucide-react";

const Navbar = ({ onLogout, userName = "Admin" }) => {
  const initial = userName.trim().charAt(0).toUpperCase();

  return (
    <nav
      className="relative w-full text-white"
      style={{
        background: "linear-gradient(135deg, #14213D 0%, #1F2F52 100%)",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Left: Seal + title */}
        <div className="flex items-center gap-3">
          <div
            className="flex items-center justify-center w-10 h-10 rounded-full border"
            style={{ borderColor: "#C89B3C", backgroundColor: "rgba(200,155,60,0.12)" }}
          >
            <GraduationCap size={20} color="#C89B3C" strokeWidth={2} />
          </div>
          <div className="leading-tight">
            <p
              className="text-[10px] uppercase tracking-[0.2em] font-medium"
              style={{ color: "#8894B0" }}
            >
              Academic Portal
            </p>
            <h1
              className="text-xl font-semibold tracking-tight"
              style={{ fontFamily: "'Playfair Display', 'Georgia', serif" }}
            >
              Student Management System
            </h1>
          </div>
        </div>

        {/* Right: user badge + logout */}
        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-2">
            <div
              className="flex items-center justify-center w-8 h-8 rounded-full text-sm font-semibold"
              style={{ backgroundColor: "#C89B3C", color: "#14213D" }}
            >
              {initial}
            </div>
            <span className="text-sm" style={{ color: "#C7CEDD" }}>
              {userName}
            </span>
          </div>

          <button
            onClick={onLogout}
            className="group flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 border"
            style={{
              borderColor: "rgba(255,255,255,0.15)",
              backgroundColor: "rgba(255,255,255,0.04)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#C0392B";
              e.currentTarget.style.borderColor = "#C0392B";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.04)";
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)";
            }}
          >
            <LogOut size={16} className="transition-transform duration-200 group-hover:translate-x-0.5" />
            Logout
          </button>
        </div>
      </div>

      {/* Diploma-ribbon accent strip */}
      <div
        className="h-[3px] w-full"
        style={{
          background: "linear-gradient(90deg, #C89B3C 0%, #E4C97A 50%, #C89B3C 100%)",
        }}
      />
    </nav>
  );
};

export default Navbar;