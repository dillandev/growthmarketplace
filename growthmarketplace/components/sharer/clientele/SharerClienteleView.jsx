import { Divider, Stack, Typography } from "@mui/material";
import { useSharerClientele } from "../../../hooks/sharer/SharerClientele/useSharerClientele";
import AppMessage from "../../widgets/AppMessage";
import ClienteleCard from "./ClienteleCard";

export default function SharerClienteleView() {
  const {
    clientele,
    isLoading,
    error,
    acceptClient,
    declineClient,
    isAccepting,
    isDeclining,
    acceptError,
    declineError,
  } = useSharerClientele();

  const items = clientele?.clientele || clientele || [];

  if (isLoading) {
    return <div>Loading clientele...</div>;
  }

  return (
    <Stack spacing={2}>
      <Typography variant="h4">Clientele</Typography>

      <AppMessage severity="error">{error?.message}</AppMessage>
      <AppMessage severity="error">{acceptError?.message}</AppMessage>
      <AppMessage severity="error">{declineError?.message}</AppMessage>

      {items.length === 0 ? <Typography>No clientele requests.</Typography> : null}

      {items.map((item) => (
        <div key={item.id}>
          <ClienteleCard
            item={item}
            onAccept={acceptClient}
            onDecline={declineClient}
            isAccepting={isAccepting}
            isDeclining={isDeclining}
          />
          <Divider />
        </div>
      ))}
    </Stack>
  );
}