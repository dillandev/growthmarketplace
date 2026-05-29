import {
  Button,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";

export default function ReviewCard({ item, onSubmit, isSubmitting }) {
  const [form, setForm] = useState({
    rating: "",
    comment: "",
  });

  const handleChange = (event) => {
    setForm((current) => ({
      ...current,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    await onSubmit({
      bookingId: item.booking_id || item.bookingId,
      revieweeId: item.reviewee_id || item.revieweeId,
      rating: Number(form.rating),
      comment: form.comment,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <Stack spacing={2}>
        <Typography variant="h6">
          {item.revieweeUsername || item.reviewee_name || "Review User"}
        </Typography>

        <TextField
          select
          label="Rating"
          name="rating"
          value={form.rating}
          onChange={handleChange}
        >
          <MenuItem value="">Select</MenuItem>
          <MenuItem value={1}>1</MenuItem>
          <MenuItem value={2}>2</MenuItem>
          <MenuItem value={3}>3</MenuItem>
          <MenuItem value={4}>4</MenuItem>
          <MenuItem value={5}>5</MenuItem>
        </TextField>

        <TextField
          label="Comment"
          name="comment"
          value={form.comment}
          onChange={handleChange}
          multiline
          minRows={3}
        />

        <Button type="submit" disabled={isSubmitting}>
          Submit Review
        </Button>
      </Stack>
    </form>
  );
}