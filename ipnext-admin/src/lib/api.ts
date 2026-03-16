import axios from 'axios'

function toCamel(s: string): string {
  // Full uppercase (e.g. "ID", "URL") → all lowercase
  if (s === s.toUpperCase()) return s.toLowerCase()
  return s.charAt(0).toLowerCase() + s.slice(1)
}

function deepCamel(obj: unknown): unknown {
  if (Array.isArray(obj)) return obj.map(deepCamel)
  if (obj !== null && typeof obj === 'object') {
    return Object.fromEntries(
      Object.entries(obj as Record<string, unknown>).map(([k, v]) => [toCamel(k), deepCamel(v)])
    )
  }
  return obj
}

export const api = axios.create({
  baseURL: '/api/v1',
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
})

api.interceptors.response.use(
  (response) => {
    if (
      response.data !== null &&
      typeof response.data === 'object' &&
      'data' in response.data &&
      Object.keys(response.data).length === 1
    ) {
      response.data = response.data.data
    }
    response.data = deepCamel(response.data)
    return response
  },
  (error) => {
    if (error.response?.status === 401 && window.location.pathname !== '/login') {
      window.location.href = '/login'
    }
    return Promise.reject(error)
  },
)
