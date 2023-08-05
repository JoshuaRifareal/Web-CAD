import { useState } from 'react'
import appIcon from '/app-icon.ico'

export default function MenuBar() {
  return (
    <div className="menubar-wrapper">
      
      <div className="titlebar bar">
        <button className="menu-button">
          <span className="menu-logo">
            <img src={appIcon} alt="Web CAD Logo" />
            Web CAD  /  Untitled
          </span>
        </button>
      </div>

      <div className="toolbar bar">
        <div className="toolbar-group">
          <button className="toolbar-button">
            <span className="tool-icon">
              <svg fill="none" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 24 24" width="24px" height="24px">
                <path stroke="black" strokeWidth="2" d="M8.3,3.213l9.468,8.836c0.475,0.443,0.2,1.24-0.447,1.296L13.2,13.7l2.807,6.21c0.272,0.602,0.006,1.311-0.596,1.585l0,0 c-0.61,0.277-1.33,0-1.596-0.615L11.1,14.6l-2.833,2.695C7.789,17.749,7,17.411,7,16.751V3.778C7,3.102,7.806,2.752,8.3,3.213z"/>
              </svg>
            </span>
          </button>
          <button className="toolbar-button">
            <span className="tool-icon">
              <svg width="800px" height="800px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M15.4998 5.49994L18.3282 8.32837M3 20.9997L3.04745 20.6675C3.21536 19.4922 3.29932 18.9045 3.49029 18.3558C3.65975 17.8689 3.89124 17.4059 4.17906 16.9783C4.50341 16.4963 4.92319 16.0765 5.76274 15.237L17.4107 3.58896C18.1918 2.80791 19.4581 2.80791 20.2392 3.58896C21.0202 4.37001 21.0202 5.63634 20.2392 6.41739L8.37744 18.2791C7.61579 19.0408 7.23497 19.4216 6.8012 19.7244C6.41618 19.9932 6.00093 20.2159 5.56398 20.3879C5.07171 20.5817 4.54375 20.6882 3.48793 20.9012L3 20.9997Z" />
              </svg>
            </span>
          </button>
          <button className="toolbar-button">
            <span className="tool-icon">
              <svg width="800px" height="800px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke='black' fill='white' d="M1 3h22v10h-1V4H2v16h11v1H1zm19 15v-4h-1v4h-4v.999h4V23h1v-4.001h4V18z"/>
              </svg>
            </span>
          </button>
          <button className="toolbar-button">
            <span className="tool-icon">
              <svg width="800px" height="800px" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg">
                <path fill='white' stroke='black' d="M28.857 18c-0.8 5.65-5.227 10.125-10.857 10.997v1.003h-4v-1.003c-5.63-0.871-10.057-5.347-10.858-10.997h-1.142v-4h1.188c0.924-5.493 5.293-9.81 10.812-10.664v-1.336h4v1.336c5.52 0.854 9.887 5.171 10.812 10.664h1.188v4h-1.143zM15 29h2v-2h-2v2zM3 15v2h2v-2h-2zM17 3h-2v2h2v-2zM18 4.852v1.148h-4v-1.148c-4.69 0.824-8.401 4.483-9.292 9.148h1.292v4h-1.346c0.775 4.822 4.545 8.638 9.346 9.481v-1.481h4v1.481c4.801-0.844 8.571-4.659 9.346-9.481h-1.346v-4h1.292c-0.892-4.665-4.602-8.324-9.292-9.148zM29 15h-2v2h2v-2z"></path>
              </svg>
            </span>
          </button>
        </div>
      </div>

      <div className="presencebar bar">
        <button className="presence-button">
          <div className="presence-icon"></div>
        </button>
      </div>
    </div>
  )
}


