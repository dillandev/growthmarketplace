import { Stack } from "@mui/material";
import NotificationBell from "./NotificationBell";
import ProfileMenu from "./ProfileMenu";

export default function NavigationBar({
  notificationCount,
  onLogout,
  isLoggingOut,
}) {
  return (
    <Stack direction="row" spacing={2}>
      <ProfileMenu onLogout={onLogout} isLoggingOut={isLoggingOut} />
      <NotificationBell count={notificationCount} />
    </Stack>
  );
}