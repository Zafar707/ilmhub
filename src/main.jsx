import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { I18nextProvider } from "react-i18next";
import i18n from "./i18n";
import { Provider } from "react-redux";
import store from "./store";
import AOS from "aos";
import "aos/dist/aos.css";
import { ThemeProvider } from "./context/ThemeContext"; // qo‘shing

AOS.init({ duration: 800, once: true });

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <I18nextProvider i18n={i18n}>
      <Provider store={store}>
        <BrowserRouter>
          <ThemeProvider> {/* SHU YERGA O‘RAB OLSANG */}
            <App />
          </ThemeProvider>
        </BrowserRouter>
      </Provider>
    </I18nextProvider>
  </React.StrictMode>
);
