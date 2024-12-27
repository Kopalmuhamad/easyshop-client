import { SidebarProvider, SidebarTrigger } from "@/components/atoms/sidebar";
import { AppSidebar } from "@/components/organisme/app-sidebar";
import { Outlet } from "react-router-dom";

const DashboardLayout = () => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="pl-2 w-full">
        <SidebarTrigger />
        <Outlet />
      </main>
    </SidebarProvider>
  );
};

export default DashboardLayout;
