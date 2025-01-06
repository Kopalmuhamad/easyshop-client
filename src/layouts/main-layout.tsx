import Footer from "@/components/shared/footer";
import Navbar from "@/components/shared/navbar";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <>
      <Navbar />
      <main className="relative h-full min-h-[calc(100vh-64px)]">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default MainLayout;
