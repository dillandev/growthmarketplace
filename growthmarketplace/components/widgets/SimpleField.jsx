import { Stack, Typography } from "@mui/material";

export default function SimpleField({ label, value }) {
  return (
    <Stack>
      <Typography variant="subtitle2">{label}</Typography>
      <Typography>{value || "—"}</Typography>
    </Stack>
  );
}