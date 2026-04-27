import { Stack, Typography } from "@mui/material";
import { useHomePage } from "../../../hooks/sharer/HomePage/useHomePage";
import HomeActionButtons from "./HomeActionButtons";

export default function HomePageView() {
  const { goToLogin, goToSharerSignup, goToProviderSignup } = useHomePage();

  return (
    <Stack spacing={3}>
      <Typography variant="h4">Growth Marketplace</Typography>
      <Typography>Choose where you want to go.</Typography>

      <HomeActionButtons
        goToLogin={goToLogin}
        goToSharerSignup={goToSharerSignup}
        goToProviderSignup={goToProviderSignup}
      />
    </Stack>
  );
}