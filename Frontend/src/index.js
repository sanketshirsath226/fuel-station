import "./index.css";
import React from "react";
import ReactDom from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const el = document.getElementById("root");
const root = ReactDom.createRoot(el);

root.render(
    <BrowserRouter>
    <ToastContainer
        autoClose={1200}
    />
    <App/>
    </BrowserRouter>

)