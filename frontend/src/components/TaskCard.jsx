export default function TaskCard({ task, onEdit, onDelete }) {
  return (
    <article className="task-card">
      <div className="task-accent" />
      <div className="task-content">
        <div className="task-topline">
          <span className="task-badge">TASK</span>
          <span className="duration">{task.duration} min</span>
        </div>
        <h3>{task.name}</h3>
        <p>{task.work}</p>
        <div className="task-actions">
          <button className="btn small secondary" onClick={() => onEdit(task)}>Edit</button>
          <button className="btn small danger" onClick={() => onDelete(task._id)}>Delete</button>
        </div>
      </div>
    </article>
  )
}
