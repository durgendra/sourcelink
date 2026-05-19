import { Outlet } from "react-router-dom";
import { useState } from "react";
import { Sidebar } from "./Sidebar";
import { Topbar } from "./Topbar";
import { Drawer } from "../ui/Drawer";

export function AppShell() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <div className="flex min-h-screen">
        <Sidebar />
        <Drawer open={sidebarOpen} onClose={() => setSidebarOpen(false)}>
          <Sidebar mobile />
        </Drawer>
        <main className="min-w-0 flex-1">
          <Topbar onOpenSidebar={() => setSidebarOpen(true)} />
          <div className="p-5 sm:p-6 lg:p-8">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
