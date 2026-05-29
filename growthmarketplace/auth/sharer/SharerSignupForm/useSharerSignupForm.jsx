import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

async function signupSharerRequest(payload) {
  const response = await fetch("/api/auth/signup/sharer", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error("Sharer signup failed.");
  }

  return response.json();
}

export function useSharerSignupForm() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const signupMutation = useMutation({
    mutationFn: signupSharerRequest,
    onSuccess: (data) => {
      queryClient.setQueryData(["auth", "session"], data);
      queryClient.invalidateQueries({ queryKey: ["auth"] });
      navigate("/sharer/dashboard");
    },
  });

  return {
    signup: signupMutation.mutateAsync,
    isLoading: signupMutation.isPending,
    error: signupMutation.error,
  };
}