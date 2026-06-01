import { createRoot } from "react-dom/client";
import App from "./App";
import "../theme/organic-1.0.0/style.css";
import "../styles/globals.css";

const root = createRoot(document.getElementById("root")!);
root.render(<App />);
