import React, { useState } from "react";
import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";
import Dashboard from "./Dashboard";
import ReportDashboard from "./ReportDashboard";

export default function App() {
  const [activePage, setActivePage] = useState("dashboard");
  const [search, setSearch] = useState("");

  const renderPage = () => {
    switch (activePage) {
      case "dashboard":
        return <Dashboard />;
      case "reports":
      case "report":
        return <ReportDashboard />;
      default:
        return (
          <div className="flex items-center justify-center h-full text-gray-400 text-sm">
            <div className="text-center">
              <p className="text-4xl mb-3">🚧</p>
              <p className="font-medium text-gray-500 capitalize">{activePage}</p>
              <p className="text-xs mt-1">Esta sección aún no está implementada.</p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden font-sans bg-gray-50">
      <Sidebar active={activePage} onNavigate={setActivePage} />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Topbar searchValue={search} onSearchChange={setSearch} />
        <main className="flex-1 overflow-auto">{renderPage()}</main>
      </div>
    </div>
  );
}