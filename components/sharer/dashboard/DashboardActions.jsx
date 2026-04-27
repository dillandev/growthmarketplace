import { Button, Stack } from "@mui/material";

export default function DashboardActions({
  goToCreateAd,
  goToMyAds,
  goToClientele,
  goToReview,
  goToNotifications,
}) {
  return (
    <Stack spacing={2}>
      <Button onClick={goToCreateAd}>Create Ad</Button>
      <Button onClick={goToMyAds}>My Ads</Button>
      <Button onClick={goToClientele}>Clientele</Button>
      <Button onClick={goToReview}>Review</Button>
      <Button onClick={goToNotifications}>Open Notifications Page</Button>
    </Stack>
  );
}