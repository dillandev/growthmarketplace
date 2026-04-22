import { useMutation, useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

async function getTipDetails(sharerId) {
  const response = await fetch(`/api/sharers/${sharerId}/tip-details`, {
    method: "GET",
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch tip details.");
  }

  return response.json();
}

async function createTipRequest(payload) {
  const response = await fetch("/api/tips", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error("Failed to create tip record.");
  }

  return response.json();
}

export function useSharerTipModal() {
  const { sharerId } = useParams();

  const tipDetailsQuery = useQuery({
    queryKey: ["sharer", "tip-details", sharerId],
    queryFn: () => getTipDetails(sharerId),
    enabled: Boolean(sharerId),
  });

  const tipMutation = useMutation({
    mutationFn: createTipRequest,
  });

  return {
    tipDetails: tipDetailsQuery.data,
    isLoading: tipDetailsQuery.isLoading,
    isFetching: tipDetailsQuery.isFetching,
    error: tipDetailsQuery.error,
    createTipRecord: tipMutation.mutateAsync,
    isSubmitting: tipMutation.isPending,
    submitError: tipMutation.error,
  };
}