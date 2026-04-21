import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

const rootElement = document.getElementById("root");
if (rootElement) {
  const root = createRoot(rootElement);
  try {
    root.render(<App />);
  } catch (error) {
    console.error("React Render Error:", error);
    rootElement.innerHTML = `<div style="padding: 20px; color: red;"><h1>App Crash</h1><pre>${error}</pre></div>`;
  }
}
