import { useEffect, useState } from 'react'

const emptyTask = { name: '', duration: '', work: '' }

export default function TaskForm({ editingTask, onSubmit, onCancel, submitting }) {
  const [form, setForm] = useState(emptyTask)

  useEffect(() => {
    if (editingTask) {
      setForm({
        name: editingTask.name ?? '',
        duration: editingTask.duration ?? '',
        work: editingTask.work ?? ''
      })
    } else {
      setForm(emptyTask)
    }
  }, [editingTask])

  const handleChange = (e) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))

  const submit = (e) => {
    e.preventDefault()
    onSubmit({ ...form, duration: Number(form.duration) })
  }

  return (
    <form className="task-form" onSubmit={submit}>
      <div className="form-head">
        <div>
          <p className="eyebrow">{editingTask ? 'EDIT TASK' : 'NEW TASK'}</p>
          <h2>{editingTask ? 'Update your task' : 'Create a task'}</h2>
        </div>
        {editingTask && <button type="button" className="icon-btn" onClick={onCancel}>×</button>}
      </div>

      <label>
        Task name
        <input name="name" value={form.name} onChange={handleChange} placeholder="e.g. Complete React project" maxLength={20} required />
      </label>

      <label>
        Duration (minutes)
        <input name="duration" type="number" min="1" value={form.duration} onChange={handleChange} placeholder="60" required />
      </label>

      <label>
        Work / description
        <textarea name="work" value={form.work} onChange={handleChange} placeholder="What needs to be done?" maxLength={50} required />
      </label>

      <div className="form-actions">
        {editingTask && <button type="button" className="btn secondary" onClick={onCancel}>Cancel</button>}
        <button className="btn-sec" disabled={submitting} type="submit">
          {submitting ? 'Saving...' : editingTask ? 'Save changes' : 'Add task'}
        </button>
      </div>
    </form>
  )
}
