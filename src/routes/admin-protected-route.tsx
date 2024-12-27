import { useCurrentUser } from "@/features/auth/hooks/use-current-user";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

const AdminProtectedRoute = () => {
  const navigate = useNavigate();
  const { data: user, isLoading, error } = useCurrentUser();

  useEffect(() => {
    if (!isLoading) {
      if (error || !user) {
        navigate("/login");
      }
      if (user && user.role !== "admin") {
        navigate("/");
      }
    }
  }, [isLoading, error, user, navigate]);

  return <Outlet />;
};

export default AdminProtectedRoute;
