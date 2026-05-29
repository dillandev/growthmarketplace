import { Button, Stack, Typography } from "@mui/material";
import StatusText from "../../widgets/StatusText";

export default function MyAdCard({ ad, onDelete, isDeleting }) {
  return (
    <Stack spacing={1}>
      <Typography variant="h6">
        {ad.categoryName || ad.hashtagTag || ad.category || ad.hashtag || "Ad"}
      </Typography>
      <Typography>{ad.description || "No description."}</Typography>
      <Typography>Accepted Count: {ad.accepted_count ?? ad.acceptedCount ?? 0}</Typography>
      <StatusText status={ad.status || "active"} />
      <Button onClick={() => onDelete(ad.id)} disabled={isDeleting}>
        Delete
      </Button>
    </Stack>
  );
}