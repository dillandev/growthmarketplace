import { Button, Stack } from "@mui/material";

export default function HomeActionButtons({
  goToLogin,
  goToSharerSignup,
  goToProviderSignup,
}) {
  return (
    <Stack spacing={2}>
      <Button onClick={goToLogin}>Login</Button>
      <Button onClick={goToSharerSignup}>Sharer Sign Up</Button>
      <Button onClick={goToProviderSignup}>Provider Sign Up</Button>
    </Stack>
  );
}