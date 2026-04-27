import { Stack } from "@mui/material";
import SimpleField from "../../widgets/SimpleField";

export default function SharerContactInfo({ profile }) {
  return (
    <Stack spacing={2}>
      <SimpleField label="Contact Method" value={profile?.contact_method} />
      <SimpleField label="Contact Info" value={profile?.contact_info} />
      <SimpleField
        label="Social Media Method"
        value={profile?.social_media_method}
      />
      <SimpleField
        label="Social Media Username"
        value={profile?.social_media_username}
      />
      <SimpleField label="PayPal Email" value={profile?.paypal_email} />
      <SimpleField label="Rating" value={profile?.rating} />
      <SimpleField label="Review Count" value={profile?.review_count} />
    </Stack>
  );
}