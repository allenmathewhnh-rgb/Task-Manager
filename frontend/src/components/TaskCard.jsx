function formatDate(value) {
  if (!value) {
    return 'No date'
  }

  return new Intl.DateTimeFormat('en', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(value))
}

function TaskCard({ task, onDelete, onEdit, onToggle }) {
  return (
    <article className={`task-card ${task.completed ? 'is-completed' : ''}`}>
      <div className="task-card-header">
        <div>
          <h3>{task.title}</h3>
          <p className="task-date">Created {formatDate(task.created_at)}</p>
        </div>
        <span className={`status-pill ${task.completed ? 'completed' : 'pending'}`}>
          {task.completed ? 'Completed' : 'Pending'}
        </span>
      </div>

      {task.description && <p className="task-description">{task.description}</p>}

      <div className="task-actions">
        <button className="btn btn-soft" type="button" onClick={() => onToggle(task)}>
          {task.completed ? 'Mark Pending' : 'Mark Completed'}
        </button>
        <button className="btn btn-secondary" type="button" onClick={() => onEdit(task)}>
          Edit
        </button>
        <button className="btn btn-danger" type="button" onClick={() => onDelete(task.id)}>
          Delete
        </button>
      </div>
    </article>
  )
}

export default TaskCard
