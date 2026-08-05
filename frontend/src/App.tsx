import React, { useEffect, useState } from "react";
import Sidebar from "./components/Sidebar";
import HistoryPage from "./pages/HistoryPage";
import Categories from "./pages/Categories";
import { COLORS } from "./constants/colors";

const getInitialPage = () => {
  const path = window.location.pathname.slice(1);
  return path || "history";
}; 

function App() {
  const [currentPage, setCurrentPage] = useState(getInitialPage());
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const appStyle: React.CSSProperties = {
    display: "flex",
    minHeight: "100vh",
    background: COLORS.secondary.s01,
  };

  const mainStyle: React.CSSProperties = {
    flex: 1,
    marginLeft: isSidebarCollapsed ? "80px" : "360px",
    transition: "margin-left 0.3s ease",
  };

  const handleToggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  useEffect(() => {
    if(currentPage !== window.location.pathname.slice(1)) {
      window.history.pushState({}, "", currentPage);
    }
  }, [currentPage]);

  return (
    <div style={appStyle}>
      <Sidebar
        currentPage={currentPage}
        onNavigate={setCurrentPage}
        isCollapsed={isSidebarCollapsed}
        onToggleCollapse={handleToggleSidebar}
      />
      <main style={mainStyle}>
        {currentPage === "history" && <HistoryPage />}
        {currentPage === "categories" && <Categories />}
      </main>
    </div>
  );
}

export default App;
