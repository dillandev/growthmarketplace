import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

async function getSharerReviewQueue() {
  const response = await fetch("/api/sharer/reviews/pending", {
    method: "GET",
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch review queue.");
  }

  return response.json();
}

async function submitReviewRequest(payload) {
  const response = await fetch("/api/sharer/reviews", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error("Failed to submit review.");
  }

  return response.json();
}

export function useSharerReview() {
  const queryClient = useQueryClient();

  const reviewQueueQuery = useQuery({
    queryKey: ["sharer", "reviews", "pending"],
    queryFn: getSharerReviewQueue,
  });

  const submitMutation = useMutation({
    mutationFn: submitReviewRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["sharer", "reviews"] });
      queryClient.invalidateQueries({ queryKey: ["sharer", "profile"] });
      queryClient.invalidateQueries({ queryKey: ["provider", "profile"] });
      queryClient.invalidateQueries({ queryKey: ["sharer", "notifications"] });
    },
  });

  return {
    pendingReviews: reviewQueueQuery.data,
    isLoading: reviewQueueQuery.isLoading,
    isFetching: reviewQueueQuery.isFetching,
    error: reviewQueueQuery.error,
    submitReview: submitMutation.mutateAsync,
    isSubmitting: submitMutation.isPending,
    submitError: submitMutation.error,
  };
}