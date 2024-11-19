import reactDom from "react-dom/client";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter } from "react-router-dom";
import Store from "./context/Store";

const root = reactDom.createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter>
    <Store />
  </BrowserRouter>
);
