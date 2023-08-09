import React from 'react'
import ReactDOM from 'react-dom/client'
import TitleBar from './TitleBar.jsx';
import CommandBar from './CommandBar.jsx';
import ToolBar from './ToolBar.jsx';

ReactDOM.createRoot(document.getElementById('titlebar-container')).render(
  <React.StrictMode>
    <TitleBar />
  </React.StrictMode>,
);

ReactDOM.createRoot(document.getElementById('commandbar-container')).render(
  <React.StrictMode>
    <CommandBar />
  </React.StrictMode>,
);

ReactDOM.createRoot(document.getElementById('toolbar-container')).render(
  <React.StrictMode>
    <ToolBar />
  </React.StrictMode>,
);

