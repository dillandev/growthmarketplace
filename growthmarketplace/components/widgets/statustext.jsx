// client/src/components/widgets/StatusText.jsx
import { Typography } from "@mui/material";
import "../../styles/widgets/widgets.css";

export default function StatusText({ status }) {
  const normalized = String(status || "pending").toUpperCase();
  const statusClass = `status-${String(status || "pending").toLowerCase()}`;

  return <Typography className={`status-text ${statusClass}`}>{normalized}</Typography>;
}