import { Box } from "@mui/material";
import { useState, type ReactNode } from "react";
import { Sidebar } from "../components/Sidebar.tsx";
import TopHeader from "../components/layout/TopHeader";

const DRAWER_WIDTH = 256;
const GAP = 8; // Gap between sidebar and top header

const DefaultLayout = ({ children }: { children: ReactNode }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        bgcolor: "background.default",
      }}
    >
      {/* Top Header */}
      <Box sx={{ ml: { sm: sidebarOpen ? `${DRAWER_WIDTH + GAP}px` : 0 } }}>
        <TopHeader />
      </Box>

      {/* Sidebar + main content row */}
      <Box sx={{ display: "flex", flex: 1, overflow: "hidden" }}>
        <Box sx={{ mt: 2 }}>
          <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
        </Box>
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: { xs: 2.5, md: 3.5 },
            overflow: "auto",
            width: { sm: `calc(100% - ${sidebarOpen ? DRAWER_WIDTH + GAP : 0}px)` },
            transition: "width 225ms cubic-bezier(0.4, 0, 0.6, 1) 0ms",
            bgcolor: "background.default",
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
};

export default DefaultLayout;