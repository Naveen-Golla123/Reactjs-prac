import React from "react";
import ReactDOM from "react-dom";
import './index.css'

import { BrowserRouter as Router } from "react-router-dom"

import App from './App'
import { StateProvider } from "./context/StateProvider";
import { initialState } from "./context/initialState";
import reducer from "./context/reducer";
import { GoogleOAuthProvider } from '@react-oauth/google';


ReactDOM.render(
    <Router>
        <GoogleOAuthProvider clientId="799703796881-viuck8e37p71a5bim88of6gppvj166vt.apps.googleusercontent.com">
            <StateProvider initialState={initialState} reducer={reducer}>
                <App />
            </StateProvider>
        </GoogleOAuthProvider>;
    </Router>, document.getElementById("root")
)