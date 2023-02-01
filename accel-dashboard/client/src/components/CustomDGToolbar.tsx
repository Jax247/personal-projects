import React from "react";
import { Search } from "@mui/icons-material";
import { IconButton, TextField, InputAdornment } from "@mui/material";
import {
  GridToolbarDensitySelector,
  GridToolbarContainer,
  GridToolbarExport,
  GridToolbarColumnsButton,
} from "@mui/x-data-grid";
import FlexBetween from "./FlexBetween";

interface Iprops {
  searchInput: string;
  setSearchInput: React.Dispatch<React.SetStateAction<string>>;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
}

const CustomDGToolbar: React.FC<Iprops> = ({
  searchInput,
  setSearchInput,
  setSearchQuery,
}) => {
  return (
    <GridToolbarContainer>
      <FlexBetween width={"100%"}>
        <FlexBetween maxWidth={"max-content"}>
          <GridToolbarColumnsButton />
          <GridToolbarDensitySelector />
          <GridToolbarExport />
        </FlexBetween>
        <TextField
          variant="standard"
          label="Search..."
          value={searchInput}
          sx={{ marginBottom: "0.5rem", width: "15rem" }}
          onChange={(e) => setSearchInput(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={(e) => {
                    setSearchQuery(searchInput);
                    setSearchInput("");
                  }}
                >
                  <Search />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </FlexBetween>
    </GridToolbarContainer>
  );
};

export default CustomDGToolbar;
