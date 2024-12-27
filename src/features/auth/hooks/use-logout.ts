import { axiosWithConfig } from "@/services/api/axios-with-config";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

export const useLogout = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: async () => {
      await axiosWithConfig.post("/auth/logout");
    },
    onSuccess: () => {
      navigate("/login");
    },
  });
};
