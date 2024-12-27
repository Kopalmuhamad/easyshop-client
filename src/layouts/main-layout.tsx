import { ModeToggle } from "@/components/shared/mode-toggle";
import Navbar from "@/components/shared/navbar";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <div className="relative min-h-screen">
      <ModeToggle className="fixed bottom-2 right-2" />
      <Navbar />
      <Outlet />
    </div>
  );
};

export default MainLayout;
