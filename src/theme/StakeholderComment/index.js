import React from 'react'
import './index.css'

export default function StakeholderComment({ name, imageFilename, children }) {
  // Generates a profile image from the options in the static folder
  const profileImage = require(`@site/static/img/profileImg/${
    imageFilename ?? "mystery"
  }.png`).default

  return (
    <div className="stakeholder-container border">
      <div className="stakeholder-header">
        <img src={profileImage} />
        <h2 className="stakeholder-name">{name}</h2>
      </div>
      <div className="stakeholder-content left" style={{ whiteSpace: 'pre-wrap' }}>{children}</div>
    </div>
  )
}
