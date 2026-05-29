import { Stack } from "@mui/material";
import { useState } from "react";
import { useSharerProfile } from "../../../hooks/sharer/SharerProfile/useSharerProfile";
import AppMessage from "../../widgets/AppMessage";
import SimpleSection from "../../widgets/SimpleSection";
import TipModal from "../../widgets/TipModal";
import SharerContactInfo from "./SharerContactInfo";
import SharerFeedbackList from "./SharerFeedbackList";
import SharerProfileHeader from "./SharerProfileHeader";

export default function SharerProfileView() {
  const {
    profile,
    isLoading,
    error,
    goToEditProfile,
    goToTipModal,
  } = useSharerProfile();

  const [tipOpen, setTipOpen] = useState(false);

  if (isLoading) {
    return <div>Loading profile...</div>;
  }

  const feedback = profile?.feedback || profile?.reviews || [];

  return (
    <Stack spacing={3}>
      <AppMessage severity="error">{error?.message}</AppMessage>

      <SimpleSection title="Sharer Profile">
        <SharerProfileHeader
          profile={profile}
          onEditProfile={goToEditProfile}
          onOpenTip={() => {
            if (goToTipModal) {
              goToTipModal();
            }
            setTipOpen(true);
          }}
        />
        <SharerContactInfo profile={profile} />
        <SharerFeedbackList feedback={feedback} />
      </SimpleSection>

      <TipModal open={tipOpen} onClose={() => setTipOpen(false)} />
    </Stack>
  );
}