import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";

async function getSharerProfile(sharerId) {
  const response = await fetch(`/api/sharers/${sharerId}/profile`, {
    method: "GET",
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch sharer profile.");
  }

  return response.json();
}

async function createBookingRequest(sharerId) {
  const response = await fetch(`/api/sharers/${sharerId}/bookings`, {
    method: "POST",
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Failed to create booking.");
  }

  return response.json();
}

export function useSharerProfile() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { sharerId } = useParams();

  const profileQuery = useQuery({
    queryKey: ["sharer", "profile", sharerId],
    queryFn: () => getSharerProfile(sharerId),
    enabled: Boolean(sharerId),
  });

  const bookingMutation = useMutation({
    mutationFn: () => createBookingRequest(sharerId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["provider", "bookings"] });
      queryClient.invalidateQueries({ queryKey: ["sharer", "clientele"] });
      queryClient.invalidateQueries({ queryKey: ["sharer", "profile", sharerId] });
      queryClient.invalidateQueries({ queryKey: ["sharer", "notifications"] });
    },
  });

  return {
    profile: profileQuery.data,
    isLoading: profileQuery.isLoading,
    isFetching: profileQuery.isFetching,
    error: profileQuery.error,
    bookSharer: bookingMutation.mutateAsync,
    isBooking: bookingMutation.isPending,
    bookingError: bookingMutation.error,
    goToEditProfile: () => navigate("/sharer/profile/edit"),
    goToTipModal: () => navigate(`/sharer/${sharerId}/tip`),
  };
}