import { useState, useMemo } from "react";
import "./App.css";
import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider, Theme } from "@mui/material";
import { Routes, Route } from "react-router-dom";
import { Dashboard, TopBar, SideBar } from "./pages/";

function App() {
  const { Theme: theme, Toggle: toggleColorMode } = useMode();

  return (
    <ColorModeContext.Provider value={toggleColorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="App">
          <SideBar />
          <main className="content">
            <TopBar />
            <Routes>
              <Route path="/" element={<Dashboard />} />
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
