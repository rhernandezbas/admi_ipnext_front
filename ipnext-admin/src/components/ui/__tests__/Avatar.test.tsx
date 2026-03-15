import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Avatar } from '../Avatar'

describe('Avatar', () => {
  it('renders initials for normal name', () => {
    render(<Avatar name="Juan Perez" />)
    expect(screen.getByText('JP')).toBeDefined()
  })

  it('renders single initial for single word name', () => {
    render(<Avatar name="Ana" />)
    expect(screen.getByText('A')).toBeDefined()
  })

  it('does not crash with undefined name', () => {
    expect(() => render(<Avatar name={undefined} />)).not.toThrow()
  })

  it('does not crash with null name', () => {
    expect(() => render(<Avatar name={null} />)).not.toThrow()
  })

  it('does not crash with empty string', () => {
    expect(() => render(<Avatar name="" />)).not.toThrow()
  })

  it('shows fallback ? for undefined name', () => {
    const { container } = render(<Avatar name={undefined} />)
    expect(container.textContent).toBe('?')
  })
})
