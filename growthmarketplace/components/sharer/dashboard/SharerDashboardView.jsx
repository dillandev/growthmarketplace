import { Stack } from "@mui/material";
import { useSharerDashboard } from "../../../hooks/sharer/SharerDashboard/useSharerDashboard";
import AppMessage from "../../widgets/AppMessage";
import SimpleSection from "../../widgets/SimpleSection";
import DashboardActions from "./DashboardActions";
import DashboardHeader from "./DashboardHeader";

export default function SharerDashboardView() {
  const {
    dashboard,
    isLoading,
    error,
    logout,
    isLoggingOut,
    logoutError,
    goToNotifications,
    goToCreateAd,
    goToMyAds,
    goToClientele,
    goToReview,
  } = useSharerDashboard();

  if (isLoading) {
    return <div>Loading dashboard...</div>;
  }

  const sharer = dashboard?.sharer || dashboard?.user || {};
  const credits = dashboard?.credits?.amount ?? dashboard?.credits ?? 0;
  const notificationCount =
    dashboard?.unreadNotificationsCount ?? dashboard?.notificationCount ?? 0;

  return (
    <Stack spacing={3}>
      <AppMessage severity="error">{error?.message}</AppMessage>
      <AppMessage severity="error">{logoutError?.message}</AppMessage>

      <SimpleSection title="Dashboard">
        <DashboardHeader
          username={sharer.username}
          credits={credits}
          notificationCount={notificationCount}
          onLogout={logout}
          isLoggingOut={isLoggingOut}
        />

        <DashboardActions
          goToCreateAd={goToCreateAd}
          goToMyAds={goToMyAds}
          goToClientele={goToClientele}
          goToReview={goToReview}
          goToNotifications={goToNotifications}
        />
      </SimpleSection>
    </Stack>
  );
}