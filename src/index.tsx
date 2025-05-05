import React from "react";
import ReactDOM from "react-dom/client";
import "app/index.css";
import App from "app/App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import { createReduxStore } from "app/providers";
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement,
);

const store = createReduxStore();

root.render(
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>,
);

reportWebVitals();
