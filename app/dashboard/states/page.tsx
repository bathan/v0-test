'use client'

import { useState } from 'react'
import { CrudPageTemplate } from '@/components/crud-page-template'

export default function StatesPage() {
  const [states, setStates] = useState([
    { id: 1, name: 'State 1' },
    { id: 2, name: 'State 2' },
  ])

  const handleAdd = (newState: { name: string }) => {
    setStates([...states, { ...newState, id: states.length + 1 }])
  }

  const handleEdit = (editedState: { id: number; name: string }) => {
    setStates(states.map(state => state.id === editedState.id ? editedState : state))
  }

  const handleDelete = (id: number) => {
    setStates(states.filter(state => state.id !== id))
  }

  return (
    <CrudPageTemplate
      title="States"
      items={states}
      onAdd={handleAdd}
      onEdit={handleEdit}
      onDelete={handleDelete}
    />
  )
}

