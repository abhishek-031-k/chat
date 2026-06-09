import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router";

// ==========================================
// RADICAL MONITORING RADAR (React Pipeline Ke Bahar Check)
// ==========================================
window.globalCrashTracker = [];

window.addEventListener("error", (event) => {
  const errorInfo = {
    message: event.message,
    filename: event.filename,
    lineno: event.lineno,
    colno: event.colno,
    stack: event.error?.stack || "No stack trace available"
  };
  window.globalCrashTracker.push(errorInfo);
  console.log("🚨 [GLOBAL TRACKER CAUGHT ERROR]:", errorInfo);
  
  // Force injection of explicit error text layout over document surface
  const fallbackDiv = document.createElement("div");
  fallbackDiv.style.cssText = "position:fixed;top:0;left:0;width:100%;height:100%;background:#0a0505;color:#f87171;padding:24px;font-family:monospace;z-index:999999;overflow:auto;font-size:12px;";
  fallbackDiv.innerHTML = `
    <h1 style="color:#ef4444;font-size:20px;font-weight:900;">🚨 GLOBAL COMPLIANCE MONITOR FAILURE</h1>
    <p style="color:#facc15;font-weight:bold;margin:10px 0;">Captured: ${errorInfo.message}</p>
    <p><b>File:</b> ${errorInfo.filename} | <b>Line:</b> ${errorInfo.lineno}:${errorInfo.colno}</p>
    <hr style="border-color:#27272a;margin:15px 0;" />
    <pre style="background:#18181b;padding:12px;border-radius:6px;color:#d4d4d8;white-space:pre-wrap;">${errorInfo.stack}</pre>
  `;
  document.body.appendChild(fallbackDiv);
});

const rootElement = document.getElementById("root");
createRoot(rootElement).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);
