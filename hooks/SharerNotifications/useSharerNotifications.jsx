import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

async function getSharerNotifications() {
  const response = await fetch("/api/sharer/notifications", {
    method: "GET",
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch notifications.");
  }

  return response.json();
}

async function markNotificationRead(notificationId) {
  const response = await fetch(`/api/sharer/notifications/${notificationId}/read`, {
    method: "PATCH",
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Failed to mark notification as read.");
  }

  return response.json();
}

async function markAllNotificationsRead() {
  const response = await fetch("/api/sharer/notifications/read-all", {
    method: "PATCH",
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Failed to mark all notifications as read.");
  }

  return response.json();
}

export function useSharerNotifications() {
  const queryClient = useQueryClient();

  const notificationsQuery = useQuery({
    queryKey: ["sharer", "notifications"],
    queryFn: getSharerNotifications,
  });

  const markOneMutation = useMutation({
    mutationFn: markNotificationRead,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["sharer", "notifications"] });
      queryClient.invalidateQueries({ queryKey: ["sharer", "dashboard"] });
    },
  });

  const markAllMutation = useMutation({
    mutationFn: markAllNotificationsRead,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["sharer", "notifications"] });
      queryClient.invalidateQueries({ queryKey: ["sharer", "dashboard"] });
    },
  });

  return {
    notifications: notificationsQuery.data,
    isLoading: notificationsQuery.isLoading,
    isFetching: notificationsQuery.isFetching,
    error: notificationsQuery.error,
    markAsRead: markOneMutation.mutateAsync,
    markAllAsRead: markAllMutation.mutateAsync,
    isMarkingOne: markOneMutation.isPending,
    isMarkingAll: markAllMutation.isPending,
    markOneError: markOneMutation.error,
    markAllError: markAllMutation.error,
  };
}