import React from 'react'
import ReactDOM from 'react-dom/client'
import MenuBar from './MenuBar.jsx'
import { CommandBar } from './CommandBar.jsx';

ReactDOM.createRoot(document.getElementById('menubar-container')).render(
  <React.StrictMode>
    <MenuBar />
  </React.StrictMode>,
);

ReactDOM.createRoot(document.getElementById('commandbar-container')).render(
  <React.StrictMode>
    <CommandBar />
  </React.StrictMode>,
);