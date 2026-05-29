import { Divider, Stack, Typography } from "@mui/material";
import { useSharerMyAds } from "../../../hooks/sharer/SharerMyAds/useSharerMyAds";
import AppMessage from "../../widgets/AppMessage";
import MyAdCard from "./MyAdCard";

export default function SharerMyAdsView() {
  const { ads, isLoading, error, deleteAd, isDeleting, deleteError } =
    useSharerMyAds();

  const items = ads?.ads || ads || [];

  if (isLoading) {
    return <div>Loading ads...</div>;
  }

  return (
    <Stack spacing={2}>
      <Typography variant="h4">My Ads</Typography>
      <AppMessage severity="error">{error?.message}</AppMessage>
      <AppMessage severity="error">{deleteError?.message}</AppMessage>

      {items.length === 0 ? <Typography>No ads yet.</Typography> : null}

      {items.map((ad) => (
        <div key={ad.id}>
          <MyAdCard ad={ad} onDelete={deleteAd} isDeleting={isDeleting} />
          <Divider />
        </div>
      ))}
    </Stack>
  );
}