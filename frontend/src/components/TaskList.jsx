import TaskCard from './TaskCard'

function TaskList({ isLoading, tasks, onDelete, onEdit, onToggle }) {
  if (isLoading) {
    return (
      <div className="panel-state">
        <div className="spinner" aria-label="Loading tasks" />
        <p>Loading tasks...</p>
      </div>
    )
  }

  if (tasks.length === 0) {
    return (
      <div className="panel-state">
        <h2>No tasks found</h2>
        <p>Create a task or change the active filter.</p>
      </div>
    )
  }

  return (
    <div className="task-list">
      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          onDelete={onDelete}
          onEdit={onEdit}
          onToggle={onToggle}
        />
      ))}
    </div>
  )
}

export default TaskList
