import { useEffect, useMemo, useState } from 'react'
import { createTask, deleteTask, fetchTasks, updateTask } from '../api/tasks'
import TaskForm from '../components/TaskForm'
import TaskList from '../components/TaskList'
import { getErrorMessage } from '../utils/apiError'

const filters = ['all', 'completed', 'pending']

function Dashboard() {
  const [tasks, setTasks] = useState([])
  const [activeFilter, setActiveFilter] = useState('all')
  const [editingTask, setEditingTask] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    let ignore = false

    fetchTasks()
      .then((response) => {
        if (!ignore) {
          setTasks(response.data)
        }
      })
      .catch((err) => {
        if (!ignore) {
          setError(getErrorMessage(err, 'Could not load tasks. Please try again.'))
        }
      })
      .finally(() => {
        if (!ignore) {
          setIsLoading(false)
        }
      })

    return () => {
      ignore = true
    }
  }, [])

  const filteredTasks = useMemo(() => {
    if (activeFilter === 'completed') {
      return tasks.filter((task) => task.completed)
    }

    if (activeFilter === 'pending') {
      return tasks.filter((task) => !task.completed)
    }

    return tasks
  }, [activeFilter, tasks])

  const taskCounts = useMemo(
    () => ({
      all: tasks.length,
      completed: tasks.filter((task) => task.completed).length,
      pending: tasks.filter((task) => !task.completed).length,
    }),
    [tasks],
  )

  async function handleSubmit(taskData) {
    setError('')
    setIsSubmitting(true)

    try {
      if (editingTask) {
        const response = await updateTask(editingTask.id, taskData)
        setTasks((current) =>
          current.map((task) => (task.id === editingTask.id ? response.data : task)),
        )
        setEditingTask(null)
      } else {
        const response = await createTask(taskData)
        setTasks((current) => [response.data, ...current])
      }
      return true
    } catch (err) {
      setError(getErrorMessage(err, 'Could not save the task. Please try again.'))
      return false
    } finally {
      setIsSubmitting(false)
    }
  }

  async function handleDelete(taskId) {
    const shouldDelete = window.confirm('Delete this task?')

    if (!shouldDelete) {
      return
    }

    setError('')

    try {
      await deleteTask(taskId)
      setTasks((current) => current.filter((task) => task.id !== taskId))
      if (editingTask?.id === taskId) {
        setEditingTask(null)
      }
    } catch (err) {
      setError(getErrorMessage(err, 'Could not delete the task. Please try again.'))
    }
  }

  async function handleToggle(task) {
    setError('')

    try {
      const response = await updateTask(task.id, { completed: !task.completed })
      setTasks((current) =>
        current.map((currentTask) => (currentTask.id === task.id ? response.data : currentTask)),
      )
      if (editingTask?.id === task.id) {
        setEditingTask(response.data)
      }
    } catch (err) {
      setError(getErrorMessage(err, 'Could not update the task status. Please try again.'))
    }
  }

  return (
    <main className="dashboard-page">
      <section className="dashboard-hero">
        <div>
          <p className="eyebrow">Dashboard</p>
          <h1>Your tasks</h1>
        </div>
        <div className="stats">
          <span>{taskCounts.all} total</span>
          <span>{taskCounts.completed} completed</span>
          <span>{taskCounts.pending} pending</span>
        </div>
      </section>

      {error && <div className="alert alert-error">{error}</div>}

      <section className="dashboard-layout">
        <aside className="task-editor">
          <h2>{editingTask ? 'Edit task' : 'Add task'}</h2>
          <TaskForm
            key={editingTask ? `edit-${editingTask.id}` : 'new-task'}
            initialTask={editingTask}
            isSubmitting={isSubmitting}
            onCancel={() => setEditingTask(null)}
            onSubmit={handleSubmit}
          />
        </aside>

        <section className="tasks-panel">
          <div className="panel-header">
            <h2>Task list</h2>
            <div className="filter-group" aria-label="Task filters">
              {filters.map((filter) => (
                <button
                  className={`filter-button ${activeFilter === filter ? 'active' : ''}`}
                  key={filter}
                  type="button"
                  onClick={() => setActiveFilter(filter)}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>

          <TaskList
            isLoading={isLoading}
            tasks={filteredTasks}
            onDelete={handleDelete}
            onEdit={setEditingTask}
            onToggle={handleToggle}
          />
        </section>
      </section>
    </main>
  )
}

export default Dashboard
