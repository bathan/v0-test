'use client'

import { useParams } from 'next/navigation'

export default function WizardIframePage() {
  const params = useParams()
  const wizardName = params['wizard-name'] as string

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-4">{wizardName}</h1>
      <div className="w-full h-[calc(100vh-200px)]">
        <iframe
          src={`https://www.google.com/search?q=${encodeURIComponent(wizardName)}&igu=1`}
          className="w-full h-full border-0"
          title={`Search results for ${wizardName}`}
        />
      </div>
    </div>
  )
}
