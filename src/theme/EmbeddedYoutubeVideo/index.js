import React from 'react'

export default function EmbeddedYoutubeVideo({ id }) {
  return (
    <iframe
      width="100%"
      height="315"
      id="border"
      src={`https://www.youtube-nocookie.com/embed/${id}`}
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen;"
      referrerPolicy="strict-origin-when-cross-origin"
      allowFullScreen
    ></iframe>
  )
}
