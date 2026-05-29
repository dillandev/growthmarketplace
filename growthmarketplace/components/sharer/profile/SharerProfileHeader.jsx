import { Button, Stack, Typography } from "@mui/material";

export default function SharerProfileHeader({
  profile,
  onEditProfile,
  onOpenTip,
}) {
  return (
    <Stack spacing={2}>
      <Typography variant="h4">{profile?.username || "Sharer Profile"}</Typography>
      <Typography>{profile?.bio || "No bio yet."}</Typography>
      <Typography>{profile?.profile_image || "No image yet."}</Typography>
      <Button onClick={onEditProfile}>Edit Profile</Button>
      <Button onClick={onOpenTip}>Tip</Button>
    </Stack>
  );
}