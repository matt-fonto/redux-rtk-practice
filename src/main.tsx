import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { apiSlice } from "./features/api/apiSlice.ts";
import { ApiProvider } from "@reduxjs/toolkit/query/react";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ApiProvider api={apiSlice}>
      <App />
    </ApiProvider>
  </StrictMode>
);
