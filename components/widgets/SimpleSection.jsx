import { Divider, Stack, Typography } from "@mui/material";

export default function SimpleSection({ title, children }) {
  return (
    <Stack spacing={2}>
      <Typography variant="h5">{title}</Typography>
      <Divider />
      {children}
    </Stack>
  );
}