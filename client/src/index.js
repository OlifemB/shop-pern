import React, {createContext} from "react";
import ReactDom from 'react-dom'
import App from "./App";
import UserStore from "./store/UserStore";
import DeviceStore from "./store/DeviceStore";
import {Context} from "./store/Context";


ReactDom.render(
    <Context.Provider value={{
        user: new UserStore(),
        device: new DeviceStore()
    }}>
        <App/>
    </Context.Provider>,
    document.getElementById('root')
)