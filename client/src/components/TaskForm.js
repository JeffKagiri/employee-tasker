import React, { useState, useEffect } from 'react'
import api from '../api/api'

/*
  TaskForm handles both creating a new task and editing an existing task
  Props:
   - onTaskChange(result) called after create or update to refresh list
   - editTask optional task object to edit
   - clearEdit clears edit mode
*/
const TaskForm = ({ onTaskChange, editTask, clearEdit }) => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [deadline, setDeadline] = useState('')
  const [priority, setPriority] = useState('medium')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  // Populate form when editTask changes
  useEffect(() => {
    if (editTask) {
      setTitle(editTask.title || '')
      setDescription(editTask.description || '')
      setDeadline(editTask.deadline ? editTask.deadline.split('T')[0] : '')
      setPriority(editTask.priority || 'medium')
    }
  }, [editTask])

  const submit = async (e) => {
    e.preventDefault()
    setError('')
    if (!title.trim()) {
      setError('Title is required')
      return
    }
    setLoading(true)
    try {
      let res
      const body = { title, description, deadline: deadline || undefined, priority }
      if (editTask) {
        // Update existing task
        res = await api.put(`/tasks/${editTask._id}`, body)
      } else {
        // Create new task
        res = await api.post('/tasks', body)
      }
      if (onTaskChange) onTaskChange(res.data)
      // Reset form only after create. For edit we call clearEdit
      setTitle('')
      setDescription('')
      setDeadline('')
      setPriority('medium')
      clearEdit && clearEdit()
    } catch (err) {
      console.error(err)
      setError(err.response?.data?.msg || 'Failed to save task')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="card task-form">
      <h3>{editTask ? 'Edit Task' : 'Create Task'}</h3>

      <form onSubmit={submit}>
        <input
          className="input"
          placeholder="Title"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />

        <textarea
          className="input"
          rows={4}
          placeholder="Description"
          value={description}
          onChange={e => setDescription(e.target.value)}
        />

        <input
          className="input"
          type="date"
          value={deadline}
          onChange={e => setDeadline(e.target.value)}
        />

        <select className="input" value={priority} onChange={e => setPriority(e.target.value)}>
          <option value="low">Low priority</option>
          <option value="medium">Medium priority</option>
          <option value="high">High priority</option>
        </select>

        {error && <div style={{ color: '#c53030', marginBottom: 8 }}>{error}</div>}

        <div style={{ display: 'flex', gap: 8 }}>
          <button className="btn" type="submit" disabled={loading}>
            {loading ? (editTask ? 'Updating...' : 'Creating...') : (editTask ? 'Update Task' : 'Create Task')}
          </button>

          {editTask && (
            <button type="button" className="btn ghost" onClick={clearEdit}>
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  )
}

export default TaskForm
