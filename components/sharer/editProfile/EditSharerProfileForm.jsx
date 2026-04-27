import { Button, Stack, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useEditSharerProfile } from "../../../hooks/sharer/EditSharerProfile/useEditSharerProfile";
import AppMessage from "../../widgets/AppMessage";

export default function EditSharerProfileForm() {
  const { profile, isLoading, error, updateProfile, isSaving, saveError } =
    useEditSharerProfile();

  const [form, setForm] = useState({
    contact_method: "",
    contact_info: "",
    social_media_method: "",
    social_media_username: "",
    paypal_email: "",
    bio: "",
    profile_image: "",
  });

  useEffect(() => {
    if (profile) {
      setForm({
        contact_method: profile.contact_method || "",
        contact_info: profile.contact_info || "",
        social_media_method: profile.social_media_method || "",
        social_media_username: profile.social_media_username || "",
        paypal_email: profile.paypal_email || "",
        bio: profile.bio || "",
        profile_image: profile.profile_image || "",
      });
    }
  }, [profile]);

  const handleChange = (event) => {
    setForm((current) => ({
      ...current,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await updateProfile(form);
  };

  if (isLoading) {
    return <div>Loading editable profile...</div>;
  }

  return (
    <form onSubmit={handleSubmit}>
      <Stack spacing={2}>
        <Typography variant="h4">Edit Sharer Profile</Typography>

        <TextField
          label="Contact Method"
          name="contact_method"
          value={form.contact_method}
          onChange={handleChange}
        />
        <TextField
          label="Contact Info"
          name="contact_info"
          value={form.contact_info}
          onChange={handleChange}
        />
        <TextField
          label="Social Media Method"
          name="social_media_method"
          value={form.social_media_method}
          onChange={handleChange}
        />
        <TextField
          label="Social Media Username"
          name="social_media_username"
          value={form.social_media_username}
          onChange={handleChange}
        />
        <TextField
          label="PayPal Email"
          name="paypal_email"
          value={form.paypal_email}
          onChange={handleChange}
        />
        <TextField
          label="Bio"
          name="bio"
          value={form.bio}
          onChange={handleChange}
          multiline
          minRows={4}
        />
        <TextField
          label="Profile Image"
          name="profile_image"
          value={form.profile_image}
          onChange={handleChange}
        />

        <Button type="submit" disabled={isSaving}>
          Save
        </Button>

        <AppMessage severity="error">{error?.message}</AppMessage>
        <AppMessage severity="error">{saveError?.message}</AppMessage>
      </Stack>
    </form>
  );
}