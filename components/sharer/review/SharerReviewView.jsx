import { Divider, Stack, Typography } from "@mui/material";
import { useSharerReview } from "../../../hooks/sharer/SharerReview/useSharerReview";
import AppMessage from "../../widgets/AppMessage";
import ReviewCard from "./ReviewCard";

export default function SharerReviewView() {
  const {
    pendingReviews,
    isLoading,
    error,
    submitReview,
    isSubmitting,
    submitError,
  } = useSharerReview();

  const items = pendingReviews?.pendingReviews || pendingReviews || [];

  if (isLoading) {
    return <div>Loading reviews...</div>;
  }

  return (
    <Stack spacing={2}>
      <Typography variant="h4">Review</Typography>

      <AppMessage severity="error">{error?.message}</AppMessage>
      <AppMessage severity="error">{submitError?.message}</AppMessage>

      {items.length === 0 ? <Typography>No pending reviews.</Typography> : null}

      {items.map((item) => (
        <div key={item.id || item.bookingId || item.booking_id}>
          <ReviewCard
            item={item}
            onSubmit={submitReview}
            isSubmitting={isSubmitting}
          />
          <Divider />
        </div>
      ))}
    </Stack>
  );
}