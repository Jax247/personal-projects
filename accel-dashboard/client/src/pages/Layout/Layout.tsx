import React, { useState } from "react";
import { Box, useMediaQuery } from "@mui/material";
import { Outlet } from "react-router-dom";
import SideBar from "../../components/global/SideBar";
import NavBar from "../../components/global/NavBar";
import { useGetUserQuery } from "../../state/api";
import { RootState } from "../../state";
import { useAppSelector } from "../../hooks";

const Layout = () => {
  const isNonMobile = useMediaQuery("(min-width: 600px)");
  const [isSidebarOpen, toggleSidebar] = useState(isNonMobile);
  const user: string = useAppSelector((state: RootState) => state.global.user);
  const { data, error, isLoading } = useGetUserQuery(user);

  return (
    <Box
      display={"flex"}
      sx={{ height: "100%", width: "100%", flexWrap: "wrap" }}
    >
      <SideBar
        user={data || {}}
        isNonMobile={isNonMobile}
        isSidebarOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
        width={250}
      />
      <Box width={isSidebarOpen ? "calc(100% - 250px)" : "100%"}>
        <NavBar
          user={data || {}}
          isNonMobile={isNonMobile}
          isSidebarOpen={isSidebarOpen}
          toggleSidebar={toggleSidebar}
        />
        {/* <Box height={'100%'}> */}
          <Outlet />
        {/* </Box> */}
      </Box>
    </Box>
  );
};

export default Layout;
