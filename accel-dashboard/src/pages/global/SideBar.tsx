import React, { ReactNode, useState } from "react";
import { Sidebar, Menu, MenuItem, useProSidebar } from "react-pro-sidebar";
import {
  Box,
  IconButton,
  Typography,
  useTheme,
  SvgIconProps,
} from "@mui/material";
import { Link } from "react-router-dom";
import { tokens } from "../../theme";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import HelpOutlinedIcon from "@mui/icons-material/HelpOutlined";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import PieChartOutlinedIcon from "@mui/icons-material/PieChartOutlined";
import TimelineOutlinedIcon from "@mui/icons-material/TimelineOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import MapOutlinedIcon from "@mui/icons-material/MapOutlined";
import CloseIcon from "@mui/icons-material/Close";

type MenuItemProps = {
  title: string;
  to: string;
  icon: ReactNode;
  selected: string;
  setSelected: (dest: string) => void;
};

const SideBar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { collapsed, collapseSidebar } = useProSidebar();
  const [selectedPage, setSelectedPage] = useState("Dashboard");

  const ItemRow = ({
    title,
    to,
    icon,
    selected,
    setSelected,
  }: MenuItemProps) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    return (
      <MenuItem
        active={selected === title}
        style={{ color: colors.grey[100] }}
        onClick={() => setSelected(title)}
        icon={icon}
      >
        <Typography>{title}</Typography>
        <Link to={to} className=""></Link>
      </MenuItem>
    );
  };

  return (
    <>
      <Sidebar>
        <Box
          display="flex"
          position="relative"
          flexDirection="column"
          alignItems="center"
        >
          <Box display="flex"
          alignItems="center"
          justifyContent="space-between"
          paddingX='1.5rem'
          paddingY='15px'
          width="100%">

            <Typography variant="h2">Accel</Typography>

 <IconButton onClick={() => collapseSidebar()}>
                <CloseIcon />
              </IconButton>

          </Box>
          {!collapsed ? (
            <>
             
              <img
                src="https://i.picsum.photos/id/916/200/300.jpg?hmac=AlGE1xEsSBVvJKbHoDnjf9v5TRINh8LNMN6xwzQieO0"
                alt="Profile Picture"
                style={{ width: 100, height: 100, borderRadius: "50%" }}
              />

              <Typography
                color={colors.grey[100]}
                fontWeight="bold"
                variant="h2"
                align="center"
                mt={3}
              >
                Kobe Bryant
              </Typography>
              <Typography
                variant="h5"
                color={colors.greenAccent[500]}
                align="center"
                mt={1}
              >
                Big Business
              </Typography>
            </>
          ) : null}
        </Box>
        <Box pt={3}>
          <Menu>
            <ItemRow
              title="Dashboard"
              to={"/"}
              icon={<HomeOutlinedIcon />}
              selected={selectedPage}
              setSelected={setSelectedPage}
            />
            <ItemRow
              title="Manage Team"
              to={"/team"}
              icon={<PeopleOutlinedIcon />}
              selected={selectedPage}
              setSelected={setSelectedPage}
            />
            <ItemRow
              title="Contacts"
              to={"/contacts"}
              icon={<ContactsOutlinedIcon />}
              selected={selectedPage}
              setSelected={setSelectedPage}
            />
            <ItemRow
              title="Invoices"
              to={"/invoices"}
              icon={<ReceiptOutlinedIcon />}
              selected={selectedPage}
              setSelected={setSelectedPage}
            />
            <ItemRow
              title="Profile form"
              to={"/profile"}
              icon={<PersonOutlinedIcon />}
              selected={selectedPage}
              setSelected={setSelectedPage}
            />
            <ItemRow
              title="Calendar"
              to={"/calendar"}
              icon={<CalendarTodayOutlinedIcon />}
              selected={selectedPage}
              setSelected={setSelectedPage}
            />
            <ItemRow
              title="FAQ"
              to={"/faq"}
              icon={<HelpOutlinedIcon />}
              selected={selectedPage}
              setSelected={setSelectedPage}
            />
            <ItemRow
              title="Bar Chart"
              to={"/"}
              icon={<BarChartOutlinedIcon />}
              selected={selectedPage}
              setSelected={setSelectedPage}
            />
            <ItemRow
              title="Pie Chart"
              to={"/"}
              icon={<PieChartOutlinedIcon />}
              selected={selectedPage}
              setSelected={setSelectedPage}
            />
            <ItemRow
              title="Line Chart"
              to={"/"}
              icon={<TimelineOutlinedIcon />}
              selected={selectedPage}
              setSelected={setSelectedPage}
            />
            <ItemRow
              title="Geography Chart"
              to={"/geography"}
              icon={<MapOutlinedIcon />}
              selected={selectedPage}
              setSelected={setSelectedPage}
            />
          </Menu>
        </Box>
      </Sidebar>
    </>
  );
};

export default SideBar;
