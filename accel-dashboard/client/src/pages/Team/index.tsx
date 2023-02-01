import React from "react";
import { Box, Typography, useTheme } from "@mui/material";
// import { tokens } from "../../theme";
import { DataGrid, GridColDef, GridCellParams, GridToolbar } from "@mui/x-data-grid";
import { mockDataTeam } from "../../data/mockData";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import Header from "../../components/Header";

const Team = () => {
  // const theme = useTheme();
  // const colors = tokens(theme.palette.mode);
  const columns: GridColDef[] = [
    { field: "id", headerName: "ID" },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "age",
      headerName: "Age",
      type: "number",
      headerAlign: "left",
      align: "left",
    },
    {
      field: "phone",
      headerName: "Phone",
      flex: 1,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
    },
    {
      field: "access",
      headerName: "Access",
      flex: 1,
      renderCell: (params: GridCellParams) => {
        return (
          <Box
            width="60%"
            p="5px"
            m="0 auto"
            display="flex"
            justifyContent="center"
            // bgcolor={
              // params.value === "admin"
                // ? colors.greenAccent[600]
                // : colors.greenAccent[700]
            // }
            borderRadius="4px"
          >
            {params.value === "admin" && <AdminPanelSettingsOutlinedIcon />}
            {params.value === "manager" && <SecurityOutlinedIcon />}
            {params.value === "user" && <LockOpenOutlinedIcon />}
            <Typography ml={1} 
            // color={colors.grey[100]}
            >
              {params.value}
            </Typography>
          </Box>
        );
      },
    },
  ];

  return (
    <div className="main-content-wrapper">
      <Box>
        <Header title="Team" subtitle="Managing the Team Members" />
        <Box
          mt={5}
          height="75vh"
          sx={{
            "& .MuiDataGrid-root": {
              border: "none",
            },
            "& .MuiDataGrid-cell": {
              borderBottom: "none",
            },
            "& .name-column--cell": {
              // color: colors.greenAccent[300],
            },
            "& .MuiDataGrid-columnHeaders": {
              // backgroundColor: colors.blueAccent[700],
              borderBottom: "none",
            },
            "& .MuiDataGrid-virtualScroller": {
              // backgroundColor: colors.primary[400],
            },
            "& .MuiDataGrid-footerContainer": {
              borderTop: "none",
              // backgroundColor: colors.blueAccent[700],
            },
            "& .MuiCheckbox-root": {
              // color: `${colors.greenAccent[200]} !important`,
            },
            "& .MuiDataGrid-toolbarContainer button": {
                // color: `${colors.blueAccent[300]} !important`
            }
          }}
        >
          <DataGrid rows={mockDataTeam} columns={columns} components={{Toolbar: GridToolbar}} />
        </Box>
      </Box>
    </div>
  );
};

export default Team;
