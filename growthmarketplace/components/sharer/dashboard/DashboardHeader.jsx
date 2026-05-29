import { Stack, Typography } from "@mui/material";
import NavigationBar from "../../widgets/NavigationBar";

export default function DashboardHeader({
  username,
  credits,
  notificationCount,
  onLogout,
  isLoggingOut,
}) {
  return (
    <Stack spacing={2}>
      <NavigationBar
        notificationCount={notificationCount}
        onLogout={onLogout}
        isLoggingOut={isLoggingOut}
      />
      <Typography variant="h4">Sharer Dashboard</Typography>
      <Typography>{username || "Sharer"}</Typography>
      <Typography>Credits: {credits ?? 0}</Typography>
    </Stack>
  );
}