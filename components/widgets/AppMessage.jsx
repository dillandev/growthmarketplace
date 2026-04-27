import { Alert } from "@mui/material";

export default function AppMessage({ severity = "info", children }) {
  if (!children) return null;

  return <Alert severity={severity}>{children}</Alert>;
}