export function getErrorMessage(error, fallback = 'Something went wrong. Please try again.') {
  const data = error?.response?.data

  if (!data) {
    return error?.message || fallback
  }

  if (typeof data === 'string') {
    return data
  }

  if (data.detail) {
    return data.detail
  }

  const fieldErrors = Object.entries(data)
    .map(([field, messages]) => {
      const text = Array.isArray(messages) ? messages.join(' ') : String(messages)
      return `${field}: ${text}`
    })
    .join(' ')

  return fieldErrors || fallback
}
