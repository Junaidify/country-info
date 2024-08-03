import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import ContextApi from "./context/ContextApi.jsx";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <ChakraProvider>
      <ContextApi>
        <App />
      </ContextApi>
    </ChakraProvider>
  </BrowserRouter>
);
