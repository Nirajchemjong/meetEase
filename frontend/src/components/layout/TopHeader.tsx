import { useEffect, useState } from "react";
import {
  AppBar,
  Toolbar,
  Box,
  Typography,
  Avatar,
  Menu,
  MenuItem,
} from "@mui/material";
import { useNavigate } from "@tanstack/react-router";
import { getUser, type User } from "../../lib/api";

export default function TopHeader() {
  const [user, setUser] = useState<User | null>(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    let cancelled = false;

    async function fetchUser() {
      try {
        const userData = await getUser();
        if (!cancelled) {
          setUser(userData);
        }
      } catch {
        // Silently fail - user might not be authenticated yet
        if (!cancelled) {
          setUser(null);
        }
      }
    }

    fetchUser();

    return () => {
      cancelled = true;
    };
  }, []);

  const handleProfileClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleProfileNavigate = () => {
    handleClose();
    navigate({ to: "/profile" });
  };

  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{
        bgcolor: "background.paper",
        border: "none",
        color: "text.primary",
        borderRadius: "16px",
        boxShadow: "none",
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between", px: 3 }}>
        {/* Left side - Search bar placeholder (can be added later) */}
        <Box sx={{ flex: 1 }} />

        {/* Right side - Icons and Profile */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>

          {/* Profile Section */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1.5,
              cursor: "pointer",
              px: 1.5,
              py: 0.75,
              borderRadius: 2,
              "&:hover": {
                bgcolor: "action.hover",
              },
            }}
            onClick={handleProfileClick}
          >
            <Avatar
              src={user?.picture || undefined}
              alt={user?.name || user?.email || "User"}
              sx={{
                width: 32,
                height: 32,
                fontSize: "0.875rem",
                bgcolor: "primary.main",
              }}
            >
              {(user?.name || user?.email || "U")[0].toUpperCase()}
            </Avatar>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Typography
                variant="body2"
                sx={{
                  fontWeight: 600,
                  fontSize: "0.875rem",
                  lineHeight: 1.2,
                }}
              >
                {user?.name || "User"}
              </Typography>
              <Typography
                variant="caption"
                sx={{
                  color: "text.secondary",
                  fontSize: "0.75rem",
                  lineHeight: 1.2,
                }}
              >
                {user?.email || ""}
              </Typography>
            </Box>
          </Box>

          {/* Profile Menu */}
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
          >
            <MenuItem onClick={handleProfileNavigate}>Profile</MenuItem>
            <MenuItem
              onClick={() => {
                handleClose();
                // Settings route can be added later
              }}
            >
              Settings
            </MenuItem>
            <MenuItem
              onClick={() => {
                handleClose();
                navigate({ to: "/logout" });
              }}
            >
              Logout
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

