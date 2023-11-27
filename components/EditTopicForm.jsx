'use client'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

export default function EditTopicForm({ id, title, description }) {
  const [newTitle, setNewTitle] = useState(title)
  const [newDescription, setNewDescription] = useState(description)

  const router = useRouter
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await fetch('/api/topics/${id}', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ newTitle, newDescription }),
      })
      if (!res.ok) {
        throw new Error('Failed to update')
      }
      router.push('/')
      router.refresh()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <form className="flex flex-col gap-3">
      <input
        value={newTitle}
        onChange={(e) => setNewTitle(e.target.value)}
        type="text"
        placeholder="Topic Title"
        className=" border border-slate-500 p-4"
      />
      <textarea
        type="text"
        placeholder="Topic description"
        className="border border-slate-500 p-4 h-32"
      />
      <button className="bg-green-800 text-white font-bold px-6 py-3 w-fit rounded-md">
        Update Topic
      </button>
    </form>
  )
}
