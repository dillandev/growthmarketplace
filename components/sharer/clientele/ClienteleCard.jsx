import { Button, Stack, Typography } from "@mui/material";
import StatusText from "../../widgets/StatusText";

export default function ClienteleCard({
  item,
  onAccept,
  onDecline,
  isAccepting,
  isDeclining,
}) {
  return (
    <Stack spacing={1}>
      <Typography variant="h6">
        {item.providerUsername || item.provider_name || "Provider"}
      </Typography>
      <Typography>{item.message || item.description || "Client request"}</Typography>
      <StatusText status={item.status} />
      <Button onClick={() => onAccept(item.id)} disabled={isAccepting}>
        Accept
      </Button>
      <Button onClick={() => onDecline(item.id)} disabled={isDeclining}>
        Decline
      </Button>
    </Stack>
  );
}