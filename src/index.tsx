import App from "app/App";
import {BrowserRouter} from "react-router-dom";
import {ThemeProvider} from "app/providers/ThemeProvider";
import {createRoot} from "react-dom/client";
import 'app/styles/index.scss'
import {StoreProvider} from "app/providers/StoreProvider";

const rootElement = document.getElementById("root");

const root = createRoot(rootElement);

root.render(
    <StoreProvider>
        <BrowserRouter>
            <ThemeProvider>
                <App />
            </ThemeProvider>
        </BrowserRouter>
    </StoreProvider>
);