import { Divider, List, ListItem, ListItemText, Stack, Typography } from "@mui/material";
import DiamondsRow from "../../widgets/DiamondsRow";

export default function SharerFeedbackList({ feedback = [] }) {
  return (
    <Stack spacing={2}>
      <Typography variant="h5">Feedback</Typography>
      {feedback.length === 0 ? <Typography>No feedback yet.</Typography> : null}

      <List>
        {feedback.map((item) => (
          <ListItem key={item.id}>
            <ListItemText
              primary={item.reviewerUsername || item.reviewer_name || "Reviewer"}
              secondary={
                <Stack spacing={1}>
                  <DiamondsRow value={item.rating} />
                  <Typography>{item.comment || "No comment."}</Typography>
                </Stack>
              }
            />
          </ListItem>
        ))}
      </List>
      <Divider />
    </Stack>
  );
}