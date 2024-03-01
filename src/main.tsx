import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import "@fontsource/inter";
import { CssVarsProvider } from "@mui/joy/styles";
import { Analytics } from "@vercel/analytics/react";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <CssVarsProvider>
    <Analytics />
    <App />
  </CssVarsProvider>,
);
