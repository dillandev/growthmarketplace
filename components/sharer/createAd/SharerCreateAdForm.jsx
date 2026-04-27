import {
  Button,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useSharerCreateAd } from "../../../hooks/sharer/SharerCreateAd/useSharerCreateAd";
import AppMessage from "../../widgets/AppMessage";

export default function SharerCreateAdForm() {
  const {
    meta,
    isLoadingMeta,
    metaError,
    createAd,
    isCreating,
    createError,
  } = useSharerCreateAd();

  const [form, setForm] = useState({
    categoryId: "",
    hashtagId: "",
    description: "",
  });

  const categories = meta?.categories || [];
  const hashtags = meta?.hashtags || [];

  const handleChange = (event) => {
    const { name, value } = event.target.value ? event.target : event.target;
    setForm((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const payload = {
      description: form.description,
      categoryId: form.categoryId || null,
      hashtagId: form.hashtagId || null,
    };

    await createAd(payload);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Stack spacing={2}>
        <Typography variant="h4">Create Ad</Typography>

        {isLoadingMeta ? <Typography>Loading ad options...</Typography> : null}

        <TextField
          select
          label="Category"
          name="categoryId"
          value={form.categoryId}
          onChange={(event) => {
            setForm((current) => ({
              ...current,
              categoryId: event.target.value,
              hashtagId: "",
            }));
          }}
        >
          <MenuItem value="">None</MenuItem>
          {categories.map((item) => (
            <MenuItem key={item.id} value={item.id}>
              {item.name}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          select
          label="Hashtag"
          name="hashtagId"
          value={form.hashtagId}
          onChange={(event) => {
            setForm((current) => ({
              ...current,
              hashtagId: event.target.value,
              categoryId: "",
            }));
          }}
        >
          <MenuItem value="">None</MenuItem>
          {hashtags.map((item) => (
            <MenuItem key={item.id} value={item.id}>
              {item.tag}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          label="Description"
          name="description"
          value={form.description}
          onChange={handleChange}
          multiline
          minRows={4}
        />

        <Button type="submit" disabled={isCreating}>
          Create
        </Button>

        <AppMessage severity="error">{metaError?.message}</AppMessage>
        <AppMessage severity="error">{createError?.message}</AppMessage>
      </Stack>
    </form>
  );
}