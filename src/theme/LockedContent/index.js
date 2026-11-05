import React from 'react'

// The legacy site is for coaches, so in-session content is always shown.
// The password prop is kept so existing workshop markdown works unchanged.
export default function LockedContent({ children }) {
  return <div className="locked-content">{children}</div>
}
