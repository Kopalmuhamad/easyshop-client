import { MonitorIcon } from "lucide-react";

const AdminHomeView = () => {
  return (
    <main className="w-full h-full flex items-center justify-center flex-col">
      <MonitorIcon size={140} />
      <h1 className="text-4xl font-bold mt-4 text-center">
        Welcome to Admin Dashboard
      </h1>
    </main>
  );
};

export default AdminHomeView;
