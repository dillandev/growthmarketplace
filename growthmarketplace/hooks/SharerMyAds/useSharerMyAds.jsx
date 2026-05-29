import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

async function getMyAds() {
  const response = await fetch("/api/sharer/ads", {
    method: "GET",
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch sharer ads.");
  }

  return response.json();
}

async function deleteAdRequest(adId) {
  const response = await fetch(`/api/sharer/ads/${adId}`, {
    method: "DELETE",
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Failed to delete ad.");
  }

  return response.json();
}

export function useSharerMyAds() {
  const queryClient = useQueryClient();

  const adsQuery = useQuery({
    queryKey: ["sharer", "ads", "me"],
    queryFn: getMyAds,
  });

  const deleteMutation = useMutation({
    mutationFn: deleteAdRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["sharer", "ads"] });
      queryClient.invalidateQueries({ queryKey: ["sharer", "dashboard"] });
    },
  });

  return {
    ads: adsQuery.data,
    isLoading: adsQuery.isLoading,
    isFetching: adsQuery.isFetching,
    error: adsQuery.error,
    deleteAd: deleteMutation.mutateAsync,
    isDeleting: deleteMutation.isPending,
    deleteError: deleteMutation.error,
  };
}