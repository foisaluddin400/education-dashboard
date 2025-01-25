import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";


import { RouterProvider } from "react-router-dom";
import { router } from "./routes/Router";
import { store } from "./redux/store";
import { Provider } from "react-redux";
import { Toaster } from "sonner";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
      <Toaster richColors position="top-right"  />
    </Provider>
  </StrictMode>
);
