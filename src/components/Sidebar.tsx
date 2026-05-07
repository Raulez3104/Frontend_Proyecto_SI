import React from "react";

type NavItem = {
  label: string;
  icon: React.ReactNode;
  id: string;
};

type SidebarProps = {
  active?: string;
  onNavigate?: (id: string) => void;
};

const LayoutDashboardIcon = () => (
  <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <rect x="3" y="3" width="7" height="7" rx="1" />
    <rect x="14" y="3" width="7" height="7" rx="1" />
    <rect x="3" y="14" width="7" height="7" rx="1" />
    <rect x="14" y="14" width="7" height="7" rx="1" />
  </svg>
);

const EducationIcon = () => (
  <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path d="M22 10v6M2 10l10-5 10 5-10 5-10-5z" />
    <path d="M6 12v5c0 1.657 2.686 3 6 3s6-1.343 6-3v-5" />
  </svg>
);

const SimulatorIcon = () => (
  <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="3" />
    <path d="M19.07 4.93a10 10 0 0 1 0 14.14M4.93 4.93a10 10 0 0 0 0 14.14" />
  </svg>
);

const AnalysisIcon = () => (
  <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.35-4.35" />
    <path d="M11 8v3h3" />
  </svg>
);

const ReportsIcon = () => (
  <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <path d="M3 9h18M9 21V9" />
  </svg>
);

const ShieldIcon = () => (
  <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
);

const SupportIcon = () => (
  <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="10" />
    <path d="M12 8v4M12 16h.01" />
  </svg>
);

const AlertTriangleIcon = () => (
  <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
    <line x1="12" y1="9" x2="12" y2="13" />
    <line x1="12" y1="17" x2="12.01" y2="17" />
  </svg>
);

const navItems: NavItem[] = [
  { label: "Panel Principal", icon: <LayoutDashboardIcon />, id: "dashboard" },
  { label: "Educación", icon: <EducationIcon />, id: "education" },
  { label: "Simulador", icon: <SimulatorIcon />, id: "simulator" },
  { label: "Análisis", icon: <AnalysisIcon />, id: "analysis" },
  { label: "Reportes", icon: <ReportsIcon />, id: "reports" },
];

const bottomItems: NavItem[] = [
  { label: "Consejos de Seguridad", icon: <ShieldIcon />, id: "security-tips" },
  { label: "Soporte", icon: <SupportIcon />, id: "support" },
];

export default function Sidebar({ active = "reports", onNavigate }: SidebarProps) {
  return (
    <aside className="w-56 min-h-screen bg-white border-r border-gray-200 flex flex-col shrink-0">
      <div className="px-5 pt-6 pb-5 border-b border-gray-100">
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-0.5">
          TVU UMSS
        </p>
        <p className="text-xs text-gray-400">Prevención de Phishing</p>
      </div>

      <div className="px-4 pt-4">
        <button
          onClick={() => onNavigate?.("report")}
          className="w-full flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white text-sm font-semibold py-2.5 px-4 rounded-md transition-colors"
        >
          <AlertTriangleIcon />
          Reportar Phishing
        </button>
      </div>

      <nav className="flex-1 px-3 pt-5 space-y-0.5">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onNavigate?.(item.id)}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-colors ${
              active === item.id
                ? "bg-[#1a2c5b] text-white"
                : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
            }`}
          >
            {item.icon}
            {item.label}
          </button>
        ))}
      </nav>

      <div className="px-3 pb-6 space-y-0.5 border-t border-gray-100 pt-4">
        {bottomItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onNavigate?.(item.id)}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-colors ${
              active === item.id
                ? "bg-[#1a2c5b] text-white"
                : "text-gray-500 hover:bg-gray-100 hover:text-gray-900"
            }`}
          >
            {item.icon}
            {item.label}
          </button>
        ))}
      </div>
    </aside>
  );
}