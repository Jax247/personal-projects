import { useState, useContext, lazy } from "react";
import styled from "styled-components";
// import reactLogo from "./assets/react.svg";
import "./App.css";
import {
  ThemeContext,
  ThemePalette,
  ThemeProvider,
  useToggleTheme,
} from "./ThemeProvider";
import useTheme from "./hooks/useTheme";
import { Routes, Route, useLocation } from "react-router-dom";
// import { Home } from "./pages";
import { Navbar } from "./components";
import { AnimatePresence } from "framer-motion";
// import { Projects } from "./pages/";

const Home = lazy(() => import("./pages/Home"));
const Projects = lazy(() => import("./pages/Projects"));
const About = lazy(() => import("./pages/About"));

function App() {
  // const { theme, toggleTheme } = useContext(ThemeContext);
  const { theme, toggleTheme } = useToggleTheme();
  const location = useLocation()

  console.log(theme, toggleTheme);

  return (
    <ThemeProvider>
      <div className="App">
        <Navbar />
        <AnimatePresence  mode="wait">
          <Routes location={location} key={location.pathname} >
            <Route path="/" element={<Home />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </AnimatePresence>
      </div>
    </ThemeProvider>
  );
}

export default App;
