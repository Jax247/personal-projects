import React, { useState } from "react";
import { Box, Typography, useTheme } from "@mui/material";
import {
  DataGrid,
  GridColDef,
  GridToolbar,
  GridCellParams,
} from "@mui/x-data-grid";
// import { mockDataInvoices } from "../../data/mockData";

import Header from "../../components/Header";
import { useGetTransactionsQuery } from "../../state/api";
import { TransactionApiRes } from "../../state/types";
import { CustomDGToolbar } from "../../components";

const Transactions = () => {
  const theme = useTheme();

  // State Values to send to the Backend via API

  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(20);
  const [sort, setSort] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const { data, isLoading, isError } = useGetTransactionsQuery({
    page,
    pageSize,
    sort: JSON.stringify(sort),
    search: searchQuery,
  });

  // console.log("Transactions", data as TransactionApiRes);

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
            ${params.value}
          </Typography>
        );
      },
    },
  ];

  return (
    <div className="main-content-wrapper">
      <Box>
        <Header
          title="Transactions"
          subtitle="List of Transactions for Records"
        />
        <Box
          height="80vh"
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
            rows={data?.tList || []}
            columns={columns}
            components={{ Toolbar: CustomDGToolbar }}
            rowCount={(data && data.total) || 0}
            rowsPerPageOptions={[20, 50, 100]}
            pagination
            paginationMode="server"
            page={page}
            pageSize={pageSize}
            sortingMode="server"
            onPageChange={(nextPage) => setPage(nextPage)}
            onPageSizeChange={(PS) => setPageSize(PS)}
            onSortModelChange={(Nsort) => setSort(Nsort)}
            componentsProps={{
              toolbar: { searchInput, setSearchInput, setSearchQuery },
            }}
          />
        </Box>
      </Box>
    </div>
  );
};

export default Transactions;
