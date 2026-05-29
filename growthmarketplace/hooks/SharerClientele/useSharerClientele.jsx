import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

async function getSharerClientele() {
  const response = await fetch("/api/sharer/clientele", {
    method: "GET",
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch clientele.");
  }

  return response.json();
}

async function acceptClienteleRequest(clienteleId) {
  const response = await fetch(`/api/sharer/clientele/${clienteleId}/accept`, {
    method: "PATCH",
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Failed to accept clientele request.");
  }

  return response.json();
}

async function declineClienteleRequest(clienteleId) {
  const response = await fetch(`/api/sharer/clientele/${clienteleId}/decline`, {
    method: "PATCH",
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Failed to decline clientele request.");
  }

  return response.json();
}

export function useSharerClientele() {
  const queryClient = useQueryClient();

  const clienteleQuery = useQuery({
    queryKey: ["sharer", "clientele"],
    queryFn: getSharerClientele,
  });

  const acceptMutation = useMutation({
    mutationFn: acceptClienteleRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["sharer", "clientele"] });
      queryClient.invalidateQueries({ queryKey: ["sharer", "ads"] });
      queryClient.invalidateQueries({ queryKey: ["provider", "bookings"] });
      queryClient.invalidateQueries({ queryKey: ["sharer", "notifications"] });
      queryClient.invalidateQueries({ queryKey: ["sharer", "reviews", "pending"] });
    },
  });

  const declineMutation = useMutation({
    mutationFn: declineClienteleRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["sharer", "clientele"] });
      queryClient.invalidateQueries({ queryKey: ["provider", "bookings"] });
      queryClient.invalidateQueries({ queryKey: ["sharer", "notifications"] });
    },
  });

  return {
    clientele: clienteleQuery.data,
    isLoading: clienteleQuery.isLoading,
    isFetching: clienteleQuery.isFetching,
    error: clienteleQuery.error,
    acceptClient: acceptMutation.mutateAsync,
    declineClient: declineMutation.mutateAsync,
    isAccepting: acceptMutation.isPending,
    isDeclining: declineMutation.isPending,
    acceptError: acceptMutation.error,
    declineError: declineMutation.error,
  };
}