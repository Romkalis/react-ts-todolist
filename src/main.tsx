import React from "react"

import {createRoot} from 'react-dom/client'
// import App from './App.tsx'
import './index.css'
import AppWithReducers from "./AppWithReducers.tsx";

const root = document.getElementById('root')


createRoot(root!).render(
  <React.StrictMode>
    <AppWithReducers />
  </React.StrictMode>,
)
