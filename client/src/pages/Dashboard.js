import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import TaskForm from '../components/TaskForm'
import TaskList from '../components/TaskList'
import FilterBar from '../components/FilterBar'
import api from '../api/api'
import '../styles/main.css'

/*
  Dashboard ties all components together
  - loads profile to get user name
  - fetches tasks with optional filters
  - handles edit mode and clear
*/
const Dashboard = () => {
  const [tasks, setTasks] = useState([])
  const [editTask, setEditTask] = useState(null)
  const [userName, setUserName] = useState('')

  // Load profile name for navbar
  const loadProfile = async () => {
    try {
      const res = await api.get('/auth/me')
      setUserName(res.data.name)
    } catch (err) {
      // ignore errors here
    }
  }

  // Fetch tasks with optional filters
  const fetchTasks = async (filters = {}) => {
    try {
      const params = new URLSearchParams(filters).toString()
      const res = await api.get(`/tasks${params ? '?' + params : ''}`)
      setTasks(res.data)
    } catch (err) {
      console.error('Failed to fetch tasks', err)
    }
  }

  useEffect(() => {
    loadProfile()
    fetchTasks()
  }, [])

  const onTaskChange = () => fetchTasks()
  const onTaskUpdated = () => fetchTasks()
  const handleFilter = (filters) => fetchTasks(filters)
  const clearEdit = () => setEditTask(null)

  const handleLogout = () => {
    localStorage.removeItem('token')
    window.location.href = '/login'
  }

  return (
    <>
      <Navbar onLogout={handleLogout} userName={userName} />
      <div className="container">
        <FilterBar onFilter={handleFilter} />
        <div className="grid">
          <div>
            <TaskForm onTaskChange={onTaskChange} editTask={editTask} clearEdit={clearEdit} />
          </div>
          <div>
            <TaskList tasks={tasks} onTaskUpdated={onTaskUpdated} onEdit={setEditTask} />
          </div>
        </div>
      </div>
    </>
  )
}

export default Dashboard
