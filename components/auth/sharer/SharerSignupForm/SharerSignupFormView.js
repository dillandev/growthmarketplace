import { Button, Stack, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useSharerSignupForm } from "../../../hooks/sharer/SharerSignupForm/useSharerSignupForm";
import AppMessage from "../../widgets/AppMessage";

export default function SharerSignupFormView() {
  const { signup, isLoading, error } = useSharerSignupForm();

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    setForm((current) => ({
      ...current,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await signup(form);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Stack spacing={2}>
        <Typography variant="h4">Sharer Sign Up</Typography>
        <TextField
          label="Username"
          name="username"
          value={form.username}
          onChange={handleChange}
        />
        <TextField
          label="Email"
          name="email"
          value={form.email}
          onChange={handleChange}
        />
        <TextField
          label="Password"
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
        />
        <Button type="submit" disabled={isLoading}>
          Create Account
        </Button>
        <AppMessage severity="error">{error?.message}</AppMessage>
      </Stack>
    </form>
  );
}