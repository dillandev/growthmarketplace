import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

async function getSharerDashboard() {
  const response = await fetch("/api/sharer/dashboard", {
    method: "GET",
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch sharer dashboard.");
  }

  return response.json();
}

async function logoutRequest() {
  const response = await fetch("/api/auth/logout", {
    method: "POST",
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Failed to logout.");
  }

  return response.json();
}

export function useSharerDashboard() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const dashboardQuery = useQuery({
    queryKey: ["sharer", "dashboard"],
    queryFn: getSharerDashboard,
  });

  const logoutMutation = useMutation({
    mutationFn: logoutRequest,
    onSuccess: () => {
      queryClient.clear();
      navigate("/login");
    },
  });

  return {
    dashboard: dashboardQuery.data,
    isLoading: dashboardQuery.isLoading,
    isFetching: dashboardQuery.isFetching,
    error: dashboardQuery.error,

    logout: logoutMutation.mutateAsync,
    isLoggingOut: logoutMutation.isPending,
    logoutError: logoutMutation.error,

    goToNotifications: () => navigate("/sharer/notifications"),
    goToCreateAd: () => navigate("/sharer/create-ad"),
    goToMyAds: () => navigate("/sharer/my-ads"),
    goToClientele: () => navigate("/sharer/clientele"),
    goToReview: () => navigate("/sharer/review"),
  };
}