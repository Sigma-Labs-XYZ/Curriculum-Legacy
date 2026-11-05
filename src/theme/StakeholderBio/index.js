import React from 'react'
import './index.css'

export default function StakeholderBio({ name, role, imageFilename, children }) {
  // Generates a profile image from the options in the static folder
  const profileImage =
    require(`@site/static/img/profileImg/${
      imageFilename ?? "mystery"
    }.png`).default

  return (
    <div className="border">
      <div className="bio-header">
        <img src={profileImage} className="stakeholder-image" />
        <div>
          <h2>{name}</h2>
          <hr />
          <h3>
            <i>{role}</i>
          </h3>
        </div>
      </div>
      <div className="bio-content">{children}</div>
    </div>
  )
}
