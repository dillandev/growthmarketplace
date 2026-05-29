import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

async function getOwnSharerProfile() {
  const response = await fetch("/api/sharer/profile", {
    method: "GET",
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch editable sharer profile.");
  }

  return response.json();
}

async function updateSharerProfileRequest(payload) {
  const response = await fetch("/api/sharer/profile", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error("Failed to update sharer profile.");
  }

  return response.json();
}

export function useEditSharerProfile() {
  const queryClient = useQueryClient();

  const profileQuery = useQuery({
    queryKey: ["sharer", "profile", "me"],
    queryFn: getOwnSharerProfile,
  });

  const updateMutation = useMutation({
    mutationFn: updateSharerProfileRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["sharer", "profile"] });
      queryClient.invalidateQueries({ queryKey: ["sharer", "dashboard"] });
    },
  });

  return {
    profile: profileQuery.data,
    isLoading: profileQuery.isLoading,
    isFetching: profileQuery.isFetching,
    error: profileQuery.error,
    updateProfile: updateMutation.mutateAsync,
    isSaving: updateMutation.isPending,
    saveError: updateMutation.error,
  };
}