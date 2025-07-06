import { tokenValidation, userLogin, userRegister } from "@/api/auth";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

//Login POST request
export const useAuthentication = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: userLogin,
    onSuccess: (data: { token: string }) => {
      localStorage.setItem("token", data.token);
      navigate("/dashboard");
    },
  });
};

//Login POST request
export const useUserRegister = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: userRegister,
    onSuccess: () => {
      navigate("/login");
    },
  });
};

// Validate token GET request
export const useValidateToken = () => {
  return useQuery({
    queryKey: ["validateToken"],
    queryFn: tokenValidation,
  });
};
