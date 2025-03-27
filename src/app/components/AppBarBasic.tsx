"use client";
import { useTheme } from "./../context/ThemeContext";
import { useRouter } from "next/navigation";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import ArrowBack from "@mui/icons-material/ArrowBack";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";

export default function ButtonAppBar() {
  const router = useRouter();
  const { darkMode, toggleDarkMode } = useTheme();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton size="large" edge="start" color="inherit" sx={{ mr: 2 }} onClick={() => router.push("/")}>
            <ArrowBack />
          </IconButton>

          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            ICS Centralized Resource Repository
          </Typography>

          {/* Dark Mode Toggle */}
          <IconButton size="large" color="inherit" onClick={toggleDarkMode}>
            {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
