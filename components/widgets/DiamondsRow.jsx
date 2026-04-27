import { Typography } from "@mui/material";

export default function DiamondsRow({ value = 0, total = 5 }) {
  const safeValue = Math.max(0, Math.min(Number(value) || 0, total));
  const text = Array.from({ length: total }, (_, index) =>
    index < safeValue ? "♦" : "♢"
  ).join(" ");

  return <Typography>{text}</Typography>;
}