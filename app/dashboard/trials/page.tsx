'use client'

import { useState } from 'react'
import { CrudPageTemplate } from '@/components/crud-page-template'

export default function TrialsPage() {
  const [trials, setTrials] = useState([
    { id: 1, name: 'Trial 1' },
    { id: 2, name: 'Trial 2' },
  ])

  const handleAdd = (newTrial: { name: string }) => {
    setTrials([...trials, { ...newTrial, id: trials.length + 1 }])
  }

  const handleEdit = (editedTrial: { id: number; name: string }) => {
    setTrials(trials.map(trial => trial.id === editedTrial.id ? editedTrial : trial))
  }

  const handleDelete = (id: number) => {
    setTrials(trials.filter(trial => trial.id !== id))
  }

  return (
    <CrudPageTemplate
      title="Trials"
      items={trials}
      onAdd={handleAdd}
      onEdit={handleEdit}
      onDelete={handleDelete}
    />
  )
}

