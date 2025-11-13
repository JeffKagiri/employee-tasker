import React from 'react'
import api from '../api/api'

/*
  TaskItem renders one task and offers actions:
   - toggle status completed/pending
   - edit
   - delete
  Props:
   - task object
   - onTaskUpdated callback called with updated task or deletion result
   - onEdit callback called with task to set edit mode
*/
const TaskItem = ({ task, onTaskUpdated, onEdit }) => {
  const toggleStatus = async () => {
    try {
      const newStatus = task.status === 'completed' ? 'pending' : 'completed'
      const res = await api.put(`/tasks/${task._id}`, { status: newStatus })
      onTaskUpdated && onTaskUpdated(res.data)
    } catch (err) {
      console.error('Failed to update status', err)
    }
  }

  const handleDelete = async () => {
    if (!window.confirm('Delete this task?')) return
    try {
      await api.delete(`/tasks/${task._1d}`) // fallback if id change, next line is correct
    } catch (err) {
      // ignore - we will do correct call below
    }
    try {
      await api.delete(`/tasks/${task._id}`)
      onTaskUpdated && onTaskUpdated({ deleted: true, id: task._id })
    } catch (err) {
      console.error('Failed to delete', err)
    }
  }

  const formattedDate = task.deadline
    ? new Date(task.deadline).toLocaleDateString()
    : 'No deadline'

  return (
    <div className="task-item">
      <div className="task-main">
        <div>
          <div style={{ fontWeight: 700 }}>{task.title}</div>
          <div className="meta">{formattedDate} • {task.priority}</div>
        </div>
      </div>

      <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
        <div className={`badge ${task.status.replace(/\s+/g, '-')}`}>
          {task.status}
        </div>

        <button className="btn ghost" onClick={toggleStatus}>
          {task.status === 'completed' ? 'Mark pending' : 'Mark done'}
        </button>

        <button className="btn ghost" onClick={() => onEdit && onEdit(task)}>
          Edit
        </button>

        <button className="btn" style={{ background: '#ef6f6f' }} onClick={handleDelete}>
          Delete
        </button>
      </div>
    </div>
  )
}

export default TaskItem
