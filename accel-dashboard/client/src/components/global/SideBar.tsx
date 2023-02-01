import React, { useState, useEffect } from "react";
import UserImg from "../../assets/kobe.png";
import {
  Box,
  IconButton,
  Typography,
  useTheme,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  SvgIconProps,
  useMediaQuery,
  SvgIconTypeMap,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import FlexBetween from "../FlexBetween";
import {
  SettingsOutlined,
  ChevronLeft,
  ChevronRightOutlined,
  HomeOutlined,
  ShoppingCartOutlined,
  Groups2Outlined,
  ReceiptLongOutlined,
  PublicOutlined,
  PointOfSaleOutlined,
  TodayOutlined,
  CalendarMonthOutlined,
  AdminPanelSettingsOutlined,
  TrendingUpOutlined,
  PieChartOutlined,
  Home,
} from "@mui/icons-material";
import { UserType } from "../../state/types";

interface Iprops {
  isNonMobile: boolean;
  isSidebarOpen: boolean;
  toggleSidebar: React.Dispatch<React.SetStateAction<boolean>>;
  width: number;
  user: UserType;
}

interface NavItem {
  title: string;
  icon: JSX.Element | null;
}

const SideNavItems: NavItem[] = [
  { title: "Dashboard", icon: <HomeOutlined /> },
  { title: "Client Facing", icon: null },
  { title: "Products", icon: <ShoppingCartOutlined /> },
  { title: "Customers", icon: <Groups2Outlined /> },
  { title: "Transactions", icon: <ReceiptLongOutlined /> },
  { title: "Geography", icon: <PublicOutlined /> },
  { title: "Sales", icon: null },
  { title: "Overview", icon: <PointOfSaleOutlined /> },
  { title: "Daily", icon: <TodayOutlined /> },
  { title: "Monthly", icon: <CalendarMonthOutlined /> },
  { title: "Breakdown", icon: <PieChartOutlined /> },
  { title: "Management", icon: null },
  { title: "Admin", icon: <AdminPanelSettingsOutlined /> },
  { title: "Performance", icon: <TrendingUpOutlined /> },
];

const SideBar = ({
  isNonMobile,
  isSidebarOpen: isOpen,
  toggleSidebar: toggleCollapse,
  width,
  user,
}: Iprops) => {
  const theme = useTheme();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [activePage, setActive] = useState("Dashboard");

  useEffect(() => {
    setActive(pathname.substring(1));
    console.log(user);
  }, [pathname]);

  return (
    <Box component="nav">
      {isOpen && (
        <Drawer
          variant="persistent"
          anchor="left"
          open={isOpen}
          onClose={() => toggleCollapse(!isOpen)}
          sx={{
            width: isOpen ? width : "0px",
            // position: "absolute",
            "& .MuiDrawer-paper": {
              color: theme.palette.secondary.light,
              paddingRight: 0,
              backgroundColor: theme.palette.background.paper,
              boxSizing: "border-box",
              overflowY: "scroll",
              borderWidth: isNonMobile ? 0 : "2px",
              width: isOpen ? width : "0px",
            },
          }}
        >
          <Box width="100%" position="relative" sx={{ paddingBottom: "100px" }}>
            <Box m="1.5rem 2rem 2rem 3rem">
              <FlexBetween color={theme.palette.secondary.main}>
                <Box display="flex" alignItems="center" gap="0.5rem">
                  <Typography variant="h4" fontWeight="bold">
                    Accel
                  </Typography>
                </Box>
                {/* {!isNonMobile && ( */}
                <IconButton onClick={() => toggleCollapse(!isOpen)}>
                  <ChevronLeft />
                </IconButton>
                {/* )} */}
              </FlexBetween>
            </Box>
            <List>
              {SideNavItems.map(({ title, icon }) => {
                if (!icon) {
                  return (
                    <Typography
                      key={title}
                      sx={{ m: "2.25rem 0rem 1rem 3rem" }}
                    >
                      {title}
                    </Typography>
                  );
                }

                const lc: string = title.toLowerCase();

                return (
                  <ListItem disablePadding={true} key={lc}>
                    <ListItemButton
                      onClick={() => {
                        navigate(`/${lc}`);
                        setActive(lc);
                      }}
                      sx={{
                        backgroundColor:
                          activePage === lc
                            ? `${theme.palette.secondary.light}!important`
                            : "transparent",
                        color:
                          activePage === lc
                            ? theme.palette.primary.dark
                            : theme.palette.secondary.light,
                        "&:hover": {
                          backgroundColor: `${theme.palette.secondary.light}!important`,
                          color: `${theme.palette.primary.dark}!important`,
                        },
                        "&:hover svg": {
                          color: `${theme.palette.primary.dark}!important`,
                        },
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          ml: "2rem",
                          color:
                            activePage === lc
                              ? theme.palette.primary.dark
                              : theme.palette.secondary.light,
                        }}
                      >
                        {icon}
                      </ListItemIcon>
                      <ListItemText primary={title} />
                      {activePage === lc && <ChevronRightOutlined />}
                    </ListItemButton>
                  </ListItem>
                );
              })}
            </List>
          </Box>
            <Box bottom="0px" position="fixed" width="250px" bgcolor={theme.palette.background.paper}>
              <Divider />
              <FlexBetween textTransform="none" gap="1rem" p="1.5rem 1rem">
                <Box
                  component="img"
                  alt="profile"
                  src={UserImg}
                  height="40px"
                  width="40px"
                  borderRadius="50%"
                  sx={{ objectFit: "cover" }}
                />
                <Box textAlign="left">
                  <Typography
                    fontWeight="bold"
                    fontSize="0.8rem"
                    sx={{ color: theme.palette.secondary.light }}
                  >
                    {user.name}
                  </Typography>
                  <Typography
                    fontWeight="bold"
                    fontSize="0.75rem"
                    sx={{ color: theme.palette.secondary.light }}
                  >
                    {user.occupation}
                  </Typography>
                </Box>
                <SettingsOutlined />
              </FlexBetween>
            </Box>
        </Drawer>
      )}
    </Box>
  );
};

export default SideBar;
