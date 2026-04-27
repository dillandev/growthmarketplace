import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import { useSharerNotifications } from "../../hooks/sharer/SharerNotifications/useSharerNotifications";
import AppMessage from "./AppMessage";
import StatusText from "./StatusText";

export default function NotificationModal({ open, onClose }) {
  const {
    notifications,
    isLoading,
    error,
    markAsRead,
    markAllAsRead,
    isMarkingOne,
    isMarkingAll,
  } = useSharerNotifications();

  const items = notifications?.notifications || notifications || [];

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>Notifications</DialogTitle>
      <DialogContent>
        {isLoading ? <Typography>Loading notifications...</Typography> : null}
        <AppMessage severity="error">{error?.message}</AppMessage>

        {!isLoading && items.length === 0 ? (
          <Typography>No notifications yet.</Typography>
        ) : null}

        <List>
          {items.map((item) => (
            <ListItem
              key={item.id}
              secondaryAction={
                <Button
                  onClick={() => markAsRead(item.id)}
                  disabled={isMarkingOne || item.is_read}
                >
                  Mark Read
                </Button>
              }
            >
              <ListItemText
                primary={item.message || item.type || "Notification"}
                secondary={
                  <>
                    <StatusText status={item.is_read ? "read" : "unread"} />
                    <Typography>{item.created_at}</Typography>
                  </>
                }
              />
            </ListItem>
          ))}
        </List>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => markAllAsRead()} disabled={isMarkingAll}>
          Mark All Read
        </Button>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
}