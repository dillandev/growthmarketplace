import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

async function loginRequest(payload) {
  const response = await fetch("/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error("Login failed.");
  }

  return response.json();
}

export function useLoginForm() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const loginMutation = useMutation({
    mutationFn: loginRequest,
    onSuccess: (data) => {
      queryClient.setQueryData(["auth", "session"], data);
      queryClient.invalidateQueries({ queryKey: ["auth"] });
      navigate("/sharer/dashboard");
    },
  });

  return {
    login: loginMutation.mutateAsync,
    isLoading: loginMutation.isPending,
    error: loginMutation.error,
  };
}