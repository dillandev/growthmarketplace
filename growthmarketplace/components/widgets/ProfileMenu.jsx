import { Button, Menu, MenuItem } from "@mui/material";
import { useState } from "react";

export default function ProfileMenu({ onLogout, isLoggingOut }) {
  const [anchorEl, setAnchorEl] = useState(null);

  const openMenu = (event) => setAnchorEl(event.currentTarget);
  const closeMenu = () => setAnchorEl(null);

  const handleLogout = async () => {
    closeMenu();
    if (onLogout) {
      await onLogout();
    }
  };

  return (
    <>
      <Button onClick={openMenu}>Profile</Button>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={closeMenu}>
        <MenuItem onClick={handleLogout} disabled={isLoggingOut}>
          Logout
        </MenuItem>
      </Menu>
    </>
  );
}