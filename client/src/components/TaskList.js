import React from 'react'
import TaskItem from './TaskItem'

/*
  TaskList renders a list of tasks.
  Props:
   - tasks array
   - onTaskUpdated called when a task is updated or deleted
   - onEdit called to enter edit mode for a task
*/
const TaskList = ({ tasks, onTaskUpdated, onEdit }) => {
  if (!tasks || tasks.length === 0) {
    return <div className="card">No tasks yet. Create your first task.</div>
  }

  return (
    <div className="card">
      <div className="task-list-header">
        <h3 style={{ margin: 0 }}>Tasks</h3>
        <div className="meta">{tasks.length} items</div>
      </div>

      <div className="task-list">
        {tasks.map(t => (
          <TaskItem key={t._id} task={t} onTaskUpdated={onTaskUpdated} onEdit={onEdit} />
        ))}
      </div>
    </div>
  )
}

export default TaskList
