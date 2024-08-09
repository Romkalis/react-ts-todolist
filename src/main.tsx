import React from "react"

import {createRoot} from 'react-dom/client'
// import App from './App.tsx'
import './index.css'
// import AppWithReducers from "./AppWithReducers.tsx";
import AppWithRedux from "./AppWithRedux.tsx";
import {Provider} from 'react-redux'
import {store} from "./state/store.ts";

const root = document.getElementById('root')


createRoot(root!).render(
  // <React.StrictMode>
    <Provider store={store}>
      <AppWithRedux />
    </Provider>
  // </React.StrictMode>,
)
