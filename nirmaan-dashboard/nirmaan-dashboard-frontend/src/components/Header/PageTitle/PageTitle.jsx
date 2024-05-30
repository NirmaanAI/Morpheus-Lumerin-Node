import React from 'react'
import './pageTitle.css'

function PageTitle({ page }) {
  return (
      <div className="pagetitle">
          <h1>{page}</h1>
          <nav>
              <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                      <a href="#">
                          <i className="bi bi-speedometer icon-style"></i>
                      </a>
                  </li>
                  <li className="breadcrumb-item active">{"/ " + "Stats"}</li>
              </ol>
          </nav>
      </div>
  );
}

export default PageTitle;