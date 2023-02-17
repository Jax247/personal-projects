import React from "react";
import {
  Box,
  Typography,
  Button,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import {
  DownloadOutlined,
  Email,
  PointOfSale,
  PersonAdd,
  Traffic,
} from "@mui/icons-material";

import { DataGrid, GridCellParams, GridColDef } from "@mui/x-data-grid";
import {
  Header,
  OverviewLineChart,
  BreakdownPieChart,
  FlexBetween,
  Statbox,
} from "../../components";
import { useGetDashboardDataQuery } from "../../state/api";

const Dashboard = () => {
  const { data, isLoading } = useGetDashboardDataQuery("Dashboard");
  const theme = useTheme();
  const breakpoint = useMediaQuery("(min-width: 1200px)");
  console.log(data);

  const columns: GridColDef[] = [
    { field: "_id", headerName: "ID" },
    {
      field: "userId",
      headerName: "User ID",
      flex: 1,
      cellClassName: "uid-column--cell",
    },
    {
      field: "createdAt",
      headerName: "CreatedAt",
      flex: 1,
    },

    {
      field: "products",
      headerName: "# of Products",
      flex: 0.4,
      sortable: false,
      renderCell: (params: GridCellParams) => {
        return (
          <Typography
          // color={colors.greenAccent[400]}
          >
            {params.value.length}
          </Typography>
        );
      },
    },
    {
      field: "cost",
      headerName: "Cost",
      flex: 1,
      renderCell: (params: GridCellParams) => {
        return (
          <Typography
          // color={colors.greenAccent[400]}
          >
            ${Number(params.value).toFixed(2)}
          </Typography>
        );
      },
    },
  ];

  return (
    <div className="main-content-wrapper">
      <FlexBetween sx={{flexWrap: 'wrap', alignItems: 'baseline'}}>
        <Header isDashboard title="DASHBOARD" subtitle="Welcome to your Dashboard" />
        <Box>
          <Button
            sx={{
              backgroundColor: theme.palette.secondary.light,
              color: theme.palette.background.paper,
              padding: "10px 20px",
              width: "max-content",
              border: `2px solid ${theme.palette.secondary.light}`,
              "&:hover": {
                webkitTextDecoration: "none",
                textDecoration: "none",
                backgroundColor: "rgba(77, 84, 125, 0.08)",
                color: theme.palette.secondary.light,
              },
            }}
          >
            <DownloadOutlined sx={{ mr: "10px" }} />
            <Typography fontWeight={"bold"} fontSize={"14px"}>
              Download Reports
            </Typography>
          </Button>
        </Box>
      </FlexBetween>

      {/* Row 1  */}
      <Box
        mt="20px"
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="160px"
        gap="20px"
        sx={{
          "& > div": { gridColumn: breakpoint ? undefined : "span 12" },
        }}
      >
        {/* Stat Boxes */}
        <Statbox
          icon={
            <Email
              sx={{ color: theme.palette.secondary.light, fontSize: "26px" }}
            />
          }
          title="Total Customers"
          value={data ? data.totalCustomers : 0}
          percent={14}
          description="Since Last Month"
        />
        <Statbox
          icon={
            <PointOfSale
              sx={{ color: theme.palette.secondary.light, fontSize: "26px" }}
            />
          }
          title="Sales Today"
          value={data ? data.todaysStats.totalSales : 0}
          percent={24}
          description="Since Last Month"
        />
        <Box
          gridColumn="span 8"
          gridRow="span 2"
          sx={{ backgroundColor: theme.palette.background.paper }}
          p="1rem"
          borderRadius="0.55rem"
        >
          <OverviewLineChart mode="sales" isDashboard />
        </Box>
        <Statbox
          icon={
            <PersonAdd
              sx={{ color: theme.palette.secondary.light, fontSize: "26px" }}
            />
          }
          title="Sales today"
          value={data ? data.todaysStats.totalSales : 0}
          percent={32}
          description="Since Last Month"
        />
        <Statbox
          icon={
            <Traffic
              sx={{ color: theme.palette.secondary.light, fontSize: "26px" }}
            />
          }
          title="Total Customer"
          value={data ? data.yearlySalesTotal : 0}
          percent={17}
          description="Since Last Month"
        />
        {/* Row 2 */}
        <Box
          gridColumn={"span 8"}
          gridRow={"span 3"}
          borderRadius="0.55rem"
          sx={{
            "& .MuiDataGrid-root": {
              border: "none",
            },
            "& .MuiDataGrid-cell": {
              borderBottom: "none",
            },
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: theme.palette.background.paper,
              color: theme.palette.secondary.light,
              borderBottom: "none",
            },
            "& .MuiDataGrid-virtualScroller": {
              backgroundColor: theme.palette.primary.light,
            },
            "& .MuiDataGrid-footerContainer": {
              backgroundColor: theme.palette.background.paper,
              color: theme.palette.secondary.light,
              borderTop: "none",
            },
            "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
              color: `${theme.palette.secondary.light} !important`,
            },
          }}
        >
          <DataGrid
            loading={isLoading || !data}
            getRowId={(row) => row._id}
            rows={data?.transactions || []}
            columns={columns}
          />
        </Box>
        <Box
          gridColumn={`span 4`}
          gridRow={`span 3`}
          sx={{
            backgroundColor: theme.palette.background.paper,
            color: theme.palette.secondary.main,
          }}
          p="20px"
          borderRadius="0.55rem"
        >
          <Typography variant="h4">Sales By Category</Typography>
          <BreakdownPieChart isDashboard />
          <Typography>
            Breakdown of real states and information via category for revenue
            made for this year and total sales.
          </Typography>
        </Box>
      </Box>
    </div>
  );
};

export default Dashboard;
