import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

async function getCreateAdMeta() {
  const response = await fetch("/api/sharer/ads/create-meta", {
    method: "GET",
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch ad creation data.");
  }

  return response.json();
}

async function createAdRequest(payload) {
  const response = await fetch("/api/sharer/ads", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error("Failed to create ad.");
  }

  return response.json();
}

export function useSharerCreateAd() {
  const queryClient = useQueryClient();

  const metaQuery = useQuery({
    queryKey: ["sharer", "ads", "create-meta"],
    queryFn: getCreateAdMeta,
  });

  const createMutation = useMutation({
    mutationFn: createAdRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["sharer", "ads"] });
      queryClient.invalidateQueries({ queryKey: ["sharer", "dashboard"] });
    },
  });

  return {
    meta: metaQuery.data,
    isLoadingMeta: metaQuery.isLoading,
    isFetchingMeta: metaQuery.isFetching,
    metaError: metaQuery.error,
    createAd: createMutation.mutateAsync,
    isCreating: createMutation.isPending,
    createError: createMutation.error,
  };
}