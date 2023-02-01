import { useState, useMemo } from "react";
import "./App.css";
import { RootState } from "./state";
import { themeSettings } from "./theme";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { Routes, Route, Navigate } from "react-router-dom";
import {
  Dashboard,
  Products,
  Customers,
  AddContact,
  FAQ,
  Layout,
  Transactions,
  Geography,
  Overview,
  Daily,
  Monthly,
} from "./pages/";
import { useAppDispatch, useAppSelector } from "./hooks";

function App() {
  const mode = useAppSelector((state: RootState) => state.global.mode);
  const dispatch = useAppDispatch()
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);


  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="App">
        <main className="content">
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Dashboard />} /> {/*<Navigate to="/dashboard" replace /> */}
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/products" element={<Products />} />
              <Route path="/customers" element={<Customers />} />
              <Route path="/transactions" element={<Transactions />} />
              <Route path="/daily" element={<Daily />} />
              <Route path="/monthly" element={<Monthly />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/overview" element={<Overview />} />
              <Route path="/geography" element={<Geography />} />
              <Route path="/form" element={<AddContact />} />
            </Route>
          </Routes>
        </main>
      </div>
    </ThemeProvider>
  );
}

export default App;
