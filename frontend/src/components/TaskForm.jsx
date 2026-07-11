import { useState } from 'react'

const defaultValues = {
  title: '',
  description: '',
  completed: false,
}

function TaskForm({ initialTask, isSubmitting, onCancel, onSubmit }) {
  const [formData, setFormData] = useState(() => {
    if (initialTask) {
      return {
        title: initialTask.title || '',
        description: initialTask.description || '',
        completed: Boolean(initialTask.completed),
      }
    }

    return defaultValues
  })

  function handleChange(event) {
    const { name, type, checked, value } = event.target
    setFormData((current) => ({
      ...current,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }

  async function handleSubmit(event) {
    event.preventDefault()
    const didSave = await onSubmit({
      title: formData.title.trim(),
      description: formData.description.trim(),
      completed: formData.completed,
    })

    if (didSave && !isEditing) {
      setFormData(defaultValues)
    }
  }

  const isEditing = Boolean(initialTask)
  const canSubmit = formData.title.trim().length > 0 && !isSubmitting

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="task-title">Title</label>
        <input
          id="task-title"
          name="title"
          type="text"
          value={formData.title}
          onChange={handleChange}
          placeholder="eg:Check Emails"
          maxLength="200"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="task-description">Description</label>
        <textarea
          id="task-description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Add details, notes, or context"
          rows="4"
        />
      </div>

      {isEditing && (
        <label className="checkbox-row" htmlFor="task-completed">
          <input
            id="task-completed"
            name="completed"
            type="checkbox"
            checked={formData.completed}
            onChange={handleChange}
          />
          Completed
        </label>
      )}

      <div className="form-actions">
        {isEditing && (
          <button className="btn btn-secondary" type="button" onClick={onCancel}>
            Cancel
          </button>
        )}
        <button className="btn btn-primary" type="submit" disabled={!canSubmit}>
          {isSubmitting ? 'Saving...' : isEditing ? 'Update Task' : 'Add Task'}
        </button>
      </div>
    </form>
  )
}

export default TaskForm
