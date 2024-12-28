import Footer from "@/components/shared/footer";
import { ModeToggle } from "@/components/shared/mode-toggle";
import Navbar from "@/components/shared/navbar";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <main className="relative h-full min-h-screen">
      <Navbar />
      <ModeToggle className="fixed bottom-2 right-2 z-[999]" />
      <Outlet />
      <Footer />
    </main>
  );
};

export default MainLayout;
