import { useState } from 'react'
import reactLogo from '/src/assets/react.svg'
import viteLogo from '/vite.svg'
import appIcon from '/app-icon.ico'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <a target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a target="_blank">
          <img src={appIcon} className="logo react" alt="React logo" />
        </a>
      </div>

      <h1>Vite + React</h1>
    </>
  )
}

export default App
