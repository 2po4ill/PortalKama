import App from "app/App";
import {BrowserRouter} from "react-router-dom";
import {ThemeProvider} from "app/providers/ThemeProvider";
import {createRoot} from "react-dom/client";

const rootElement = document.getElementById("root");

const root = createRoot(rootElement);

root.render(
    <BrowserRouter>
        <ThemeProvider>
            <App />
        </ThemeProvider>
    </BrowserRouter>
);