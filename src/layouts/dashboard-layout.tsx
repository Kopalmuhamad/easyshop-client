import { SidebarProvider, SidebarTrigger } from "@/components/atoms/sidebar";
import { AppSidebar } from "@/components/organisme/app-sidebar";
import { Outlet } from "react-router-dom";

const DashboardLayout = () => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="relative pl-2 w-full">
        <SidebarTrigger className="md:static fixed top-2 left-2 z-50 bg-secondary" />
        <div className="pt-10 md:pt-2">
          <Outlet />
        </div>
      </main>
    </SidebarProvider>
  );
};

export default DashboardLayout;
