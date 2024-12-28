import { useCurrentUser } from "@/features/auth/hooks/use-current-user";
import { toast } from "@/hooks/use-toast";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

const ProtectedRoute = () => {
  const navigate = useNavigate();
  const { data: user, isLoading, error } = useCurrentUser();
  useEffect(() => {
    if (!isLoading) {
      if (error || !user) {
        navigate("/login");
        toast({
          title: "Please login or register to continue",
          variant: "destructive",
        })
      }
    }
  }, [isLoading, error, user, navigate]);
  return <Outlet />;
};

export default ProtectedRoute;