import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import { useSharerTipModal } from "../../hooks/sharer/SharerTipModal/useSharerTipModal";
import AppMessage from "./AppMessage";

export default function TipModal({ open, onClose, bookingId }) {
  const {
    tipDetails,
    isLoading,
    error,
    createTipRecord,
    isSubmitting,
    submitError,
  } = useSharerTipModal();

  const paypalEmail = tipDetails?.paypal_email || tipDetails?.paypalEmail;

  const handleConfirm = async () => {
    await createTipRecord({
      bookingId,
      paypalEmail,
    });
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>Tip Sharer</DialogTitle>
      <DialogContent>
        {isLoading ? <Typography>Loading tip details...</Typography> : null}
        <AppMessage severity="error">{error?.message}</AppMessage>
        <AppMessage severity="error">{submitError?.message}</AppMessage>
        {!isLoading ? (
          <>
            <Typography>PayPal Email</Typography>
            <Typography>{paypalEmail || "No PayPal email available."}</Typography>
          </>
        ) : null}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleConfirm} disabled={isSubmitting || !paypalEmail}>
          Confirm
        </Button>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
}