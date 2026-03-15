import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { Modal } from '../Modal'

describe('Modal', () => {
  it('renders title when open=true', () => {
    render(
      <Modal open={true} onClose={() => {}} title="Test Modal">
        <p>Content</p>
      </Modal>,
    )
    expect(screen.getByText('Test Modal')).toBeDefined()
  })

  it('does not render when open=false', () => {
    render(
      <Modal open={false} onClose={() => {}} title="Test Modal">
        <p>Content</p>
      </Modal>,
    )
    expect(screen.queryByText('Test Modal')).toBeNull()
  })

  it('calls onClose when overlay is clicked', () => {
    const onClose = vi.fn()
    render(
      <Modal open={true} onClose={onClose} title="Test Modal">
        <p>Content</p>
      </Modal>,
    )
    const overlay = screen.getByTestId('modal-overlay')
    fireEvent.click(overlay)
    expect(onClose).toHaveBeenCalledOnce()
  })

  it('calls onClose when Escape key is pressed', () => {
    const onClose = vi.fn()
    render(
      <Modal open={true} onClose={onClose} title="Test Modal">
        <p>Content</p>
      </Modal>,
    )
    fireEvent.keyDown(document, { key: 'Escape' })
    expect(onClose).toHaveBeenCalledOnce()
  })

  it('renders children content', () => {
    render(
      <Modal open={true} onClose={() => {}} title="Test Modal">
        <p>Child content here</p>
      </Modal>,
    )
    expect(screen.getByText('Child content here')).toBeDefined()
  })
})
