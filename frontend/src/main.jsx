import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme } from "./theme/theme";
import { UIProvider, useUI } from "./context/UIContext.jsx";
import { GlobalStyles } from "./styles/globalStyles";

// ThemeWrapper to use UIContext for theme switching
function ThemeWrapper({ children }) {
  const { theme } = useUI();
  return (
    <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
      <GlobalStyles />
      {children}
    </ThemeProvider>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <UIProvider>
      <ThemeWrapper>
        <App />
      </ThemeWrapper>
    </UIProvider>
  </React.StrictMode>
);
