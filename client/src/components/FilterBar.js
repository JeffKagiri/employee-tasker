import React, { useState } from 'react'

/*
  FilterBar collects search, status and sort inputs
  Props:
   - onFilter(filters) called when user clicks Apply
*/
const FilterBar = ({ onFilter }) => {
  const [status, setStatus] = useState('')
  const [sortBy, setSortBy] = useState('')
  const [search, setSearch] = useState('')

  const applyFilter = () => {
    onFilter({ status, sortBy, search })
  }

  return (
    <div className="card" style={{ marginBottom: 20 }}>
      <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
        <select className="input" value={status} onChange={e => setStatus(e.target.value)}>
          <option value="">All statuses</option>
          <option value="pending">Pending</option>
          <option value="in progress">In progress</option>
          <option value="completed">Completed</option>
        </select>

        <select className="input" value={sortBy} onChange={e => setSortBy(e.target.value)}>
          <option value="">Sort by</option>
          <option value="deadline">Deadline</option>
          <option value="priority">Priority</option>
        </select>

        <input
          className="input"
          placeholder="Search by title or description..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />

        <button className="btn" onClick={applyFilter}>Apply</button>
      </div>
    </div>
  )
}

export default FilterBar
