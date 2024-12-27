import { useCurrentUser } from "@/features/auth/hooks/use-current-user";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

const ProtectedRoute = () => {
  const navigate = useNavigate();
  const { data: user, isLoading, error } = useCurrentUser();
  useEffect(() => {
    if (!isLoading) {
      if (error || !user) {
        navigate("/login");
      }
    }
  }, [isLoading, error, user, navigate]);
  return <Outlet />;
};

export default ProtectedRoute;