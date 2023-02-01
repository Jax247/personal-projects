import React, { useState } from "react";
import { useAppSelector, useAppDispatch } from "../../hooks";
import { setMode } from "../../state";
import ProfilePic from "../../assets/kobe.png";
import FlexBetween from "../FlexBetween";
import {
  Box,
  IconButton,
  useTheme,
  AppBar,
  Toolbar,
  InputBase,
  Typography,
  Menu,
  MenuItem,
  Button,
} from "@mui/material";

import {
  LightModeOutlined,
  SettingsOutlined,
  DarkModeOutlined,
  Menu as MenuIcon,
  ArrowDropDown,
  Search,
} from "@mui/icons-material";
import { useGetUserQuery } from "../../state/api";
import { UserType } from "../../state/types";

interface Iprops {
  isSidebarOpen: boolean;
  isNonMobile: boolean;
  toggleSidebar: React.Dispatch<React.SetStateAction<boolean>>;
  user: UserType;
}
const NavBar = ({
  isSidebarOpen,
  toggleSidebar,
  user,
  isNonMobile,
}: Iprops) => {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const [anchorEl, setAnchorEl] = useState(null);
  const isOpen = Boolean(anchorEl);
  const handleClick = (e: any) => setAnchorEl(e.currentTarget);
  const handleClose = () => setAnchorEl(null);

  return (
    <AppBar sx={{ position: "static", background: "none", boxShadow: "none" }}>
      <Toolbar sx={{ justifyContent: "space-between" }}>
        {/* Menu */}
        <IconButton
          onClick={() => toggleSidebar(!isSidebarOpen)}
          type="button"
          sx={{ p: 1, mr: 1 }}
        >
          <MenuIcon />
        </IconButton>
        <FlexBetween>
          <Box display="flex" mt=".65rem">
            {/* SearchBar */}
            <Box
              display="flex"
              bgcolor={theme.palette.primary.main}
              borderRadius="3px"
            >
              <InputBase
                sx={{ ml: 3, flex: 1 }}
                placeholder="Search"
              ></InputBase>
              <IconButton type="button" sx={{ p: 1 }}>
                <Search />
              </IconButton>
            </Box>
          </Box>
          <Box display="flex" pr={4}>
            <FlexBetween
              textTransform="none"
              gap=".8rem"
              m=".65rem 2rem 0 2rem"
            >
              <IconButton
                onClick={() =>
                  dispatch(
                    setMode.setMode(
                      `${theme.palette.mode === "dark" ? "light" : "dark"}`
                    )
                  )
                }
              >
                {theme.palette.mode === "dark" ? (
                  <DarkModeOutlined sx={{ fontSize: 26 }} />
                ) : (
                  <LightModeOutlined sx={{ fontSize: 26 }} />
                )}
              </IconButton>
              <IconButton>
                <SettingsOutlined sx={{ fontSize: 26 }} />
              </IconButton>
              <Button
                onClick={handleClick}
                sx={{
                  display: isNonMobile? "flex" : "none",
                  justifyContent: "space-between",
                  alignItems: "center",
                  textTransform: "none",
                  gap: "1rem",
                }}
              >
                <Box
                  component="img"
                  alt="profile"
                  src={ProfilePic}
                  height="32px"
                  width="32px"
                  borderRadius="50%"
                  sx={{ objectFit: "cover" }}
                />
                <Box textAlign="left">
                  <Typography
                    fontWeight="bold"
                    fontSize="0.85rem"
                    sx={{ color: theme.palette.secondary.light }}
                  >
                    {user.name}
                  </Typography>
                  <Typography
                    fontSize="0.75rem"
                    sx={{ color: theme.palette.secondary.light }}
                  >
                    {user.occupation}
                  </Typography>
                </Box>
                <ArrowDropDown
                  sx={{
                    color: theme.palette.secondary.light,
                    fontSize: "25px ",
                  }}
                />
              </Button>
            </FlexBetween>
            <Menu
              anchorEl={anchorEl}
              open={isOpen}
              onClose={handleClose}
              anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            >
              <MenuItem onClick={handleClose}>Log Out</MenuItem>
            </Menu>
          </Box>
        </FlexBetween>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
