import { useCurrentUser } from "@/features/auth/hooks/use-current-user";
import { toast } from "@/hooks/use-toast";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

const AdminProtectedRoute = () => {
  const navigate = useNavigate();
  const { data: user, isLoading, error } = useCurrentUser();

  useEffect(() => {
    if (!isLoading) {
      if (error || !user) {
        navigate("/login");
        toast({
          title: "Please login or register to continue",
          variant: "destructive",
        });
      }
      if (user && user.role !== "admin") {
        navigate("/");
        toast({
          title: "You are not have access to this page",
          variant: "destructive",
        });
      }
    }
  }, [isLoading, error, user, navigate]);

  return <Outlet />;
};

export default AdminProtectedRoute;
