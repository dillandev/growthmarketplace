import { Badge, Button } from "@mui/material";
import { useState } from "react";
import NotificationModal from "./NotificationModal";

export default function NotificationBell({ count = 0 }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>
        <Badge badgeContent={count}>Notifications</Badge>
      </Button>
      <NotificationModal open={open} onClose={() => setOpen(false)} />
    </>
  );
}