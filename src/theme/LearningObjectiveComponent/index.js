import React from 'react'
import Admonition from '@theme/Admonition'
import { useDoc } from '@docusaurus/plugin-content-docs/client'

// Read-only replacement for the live site's Airtable-backed confidence sliders.
export default function LearningObjectiveComponent() {
  const { frontMatter } = useDoc()
  const objectives = frontMatter.objectives || []

  if (objectives.length === 0) {
    return null
  }

  return (
    <Admonition type="tip" title="Learning Objectives">
      <ul>
        {objectives.map((objective) => (
          <li key={objective}>{objective}</li>
        ))}
      </ul>
    </Admonition>
  )
}
