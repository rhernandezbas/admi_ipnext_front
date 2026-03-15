import { describe, it, expect, beforeEach } from 'vitest'
import { useUIStore } from '../uiStore'

describe('uiStore', () => {
  beforeEach(() => {
    useUIStore.setState({ sidebarCollapsed: false })
  })

  it('initial state: sidebarCollapsed=false', () => {
    const state = useUIStore.getState()
    expect(state.sidebarCollapsed).toBe(false)
  })

  it('toggleSidebar changes to true', () => {
    useUIStore.getState().toggleSidebar()
    expect(useUIStore.getState().sidebarCollapsed).toBe(true)
  })

  it('toggleSidebar twice returns to false', () => {
    useUIStore.getState().toggleSidebar()
    useUIStore.getState().toggleSidebar()
    expect(useUIStore.getState().sidebarCollapsed).toBe(false)
  })
})
