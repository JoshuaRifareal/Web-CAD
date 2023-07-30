import { useState } from 'react'
import reactLogo from '/src/assets/react.svg'
import viteLogo from '/vite.svg'
import appIcon from '/app-icon.ico'

function MenuBar() {
  return (
    <>
      <div>
        <a target="_blank">
          <img src={appIcon} className="menu-logo" alt="Web CAD Logo" />
        </a>
      </div>
    </>
  )
}

export default MenuBar
