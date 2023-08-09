import { useState } from 'react'
import appIcon from '/app-icon.ico'

export default function TitleBar() {
  return (
    <div className="titlebar">
      
      <div className="menu">
        <button className="menu-button">
          <img src={appIcon} alt="Web CAD Logo" />
        </button>
        {/* <span className="menu-logo">
          <input type="text" placeholder="Untitled Project" />
          <div className="select-dir">
            <span>Drafts</span>
            <ul>
              <li>Drafts</li>
              <li>Personal</li>
              <li>Team</li>
            </ul>
          </div>
        </span> */}
      </div>

    </div>
  )
}


