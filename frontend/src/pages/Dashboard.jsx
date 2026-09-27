import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { createTask, deleteTask, getTasks, logoutUser, updateTask } from '../api/api'
import Navbar from '../components/Navbar'
import TaskCard from '../components/TaskCard'
import TaskForm from '../components/TaskForm'
import timephoto from '../assets/time.png'
import taskphoto from '../assets/task.png'
import checklist from '../assets/checklist.png'
export default function Dashboard() {
  const navigate = useNavigate()
  const [tasks, setTasks] = useState([])
  const [editingTask, setEditingTask] = useState(null)
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const user = JSON.parse(localStorage.getItem('taskflowUser') || '{}')

  const loadTasks = async () => {
    setLoading(true)
    setError('')
    try {
      const res = await getTasks()
      setTasks(res.data?.data || [])
    } catch (err) {
      if (err.response?.status === 401) navigate('/login')
      else setError(err.response?.data?.message || 'Could not load tasks.')
    } finally { setLoading(false) }
  }

  useEffect(() => { loadTasks() }, [])

  const filteredTasks = useMemo(() => {
    const q = search.trim().toLowerCase()
    return q ? tasks.filter((t) => `${t.name} ${t.work}`.toLowerCase().includes(q)) : tasks
  }, [tasks, search])

  const handleSubmit = async (payload) => {
    setSaving(true)
    try {
      if (editingTask) await updateTask(editingTask._id, payload)
      else await createTask(payload)
      setEditingTask(null)
      await loadTasks()
    } catch (err) {
      setError(err.response?.data?.message || 'Could not save the task.')
    } finally { setSaving(false) }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this task?')) return
    try { await deleteTask(id); await loadTasks() }
    catch (err) { setError(err.response?.data?.message || 'Could not delete the task.') }
  }

  const handleLogout = async () => {
    try { await logoutUser() } finally {
      localStorage.removeItem('taskflowUser')
      navigate('/login')
    }
  }

  const totalMinutes = tasks.reduce((sum, t) => sum + Number(t.duration || 0), 0)

  return (
    <div className="app-shell">
      <Navbar username={user.username || user.name} onLogout={handleLogout} />
      <main className="dashboard">
        <section className="hero">
          <div>
            <p className="eyebrow">YOUR WORKSPACE</p>
            <h1>Good to see you, {user.name?.split(' ')[0] || 'there'}.</h1>
            <p>Plan the work. Track the time. Get it done.</p>
          </div>
          <div className="hero-stat"><strong>{tasks.length}</strong><span>total tasks</span></div>
        </section>

        <section className="stats-grid">
          <div className="stat-card"><span className="stat-icon"><img src={taskphoto} alt="Tasks" /></span><div><strong>{tasks.length}</strong><span>Tasks</span></div></div>
          <div className="stat-card"><span className="stat-icon"><img src={timephoto} alt="Minutes planned" /></span><div><strong>{totalMinutes}</strong><span>Minutes planned</span></div></div>
          <div className="stat-card"><span className="stat-icon"><img src={timephoto} alt="Average task time" /></span><div><strong>{tasks.length ? Math.round(totalMinutes / tasks.length) : 0}</strong><span>Avg. task time</span></div></div>
        </section>

        {error && <div className="error-box page-error">{error}<button onClick={() => setError('')}>×</button></div>}

        <div className="workspace-grid">
          <aside className="form-panel">
            <TaskForm editingTask={editingTask} onSubmit={handleSubmit} onCancel={() => setEditingTask(null)} submitting={saving} />
          </aside>

          <section className="tasks-panel">
            <div className="tasks-header">
              <div><p className="eyebrow">TASKS</p><h2>All tasks</h2></div>
              <input className="search" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search tasks..." />
            </div>

            {loading ? <div className="empty-state"><div className="spinner" /><p>Loading tasks...</p></div> : filteredTasks.length === 0 ? (
              <div className="empty-state"><div className="empty-icon"><img src= {checklist} alt="" /></div><h3>{search ? 'No matching tasks' : 'No tasks yet'}</h3><p>{search ? 'Try another search.' : 'Use the form to create your first task.'}</p></div>
            ) : (
              <div className="task-list">{filteredTasks.map((task) => <TaskCard key={task._id} task={task} onEdit={setEditingTask} onDelete={handleDelete} />)}</div>
            )}
          </section>
        </div>
      </main>
    </div>
  )
}
