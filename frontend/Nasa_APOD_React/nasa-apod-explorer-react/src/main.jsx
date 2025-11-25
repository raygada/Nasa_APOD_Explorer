import { React } from 'react'
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client'
import './index.css'
import "react-datepicker/dist/react-datepicker.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App.jsx'
import { ThemeProvider } from "./context/ThemeContext.jsx";

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
  <StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </StrictMode>
);
