import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { ConfirmDeleteModal } from '../ConfirmDeleteModal'

describe('ConfirmDeleteModal', () => {
  const baseProps = {
    open: true,
    onClose: vi.fn(),
    onConfirm: vi.fn(),
    title: 'Eliminar inmueble',
    description: '¿Eliminás "Casa Norte"? Esta acción no se puede deshacer.',
    loading: false,
  }

  it('renders when open=true', () => {
    render(<ConfirmDeleteModal {...baseProps} />)
    expect(screen.getByText('Eliminar inmueble')).toBeTruthy()
    expect(screen.getByText(/Casa Norte/)).toBeTruthy()
  })

  it('does not render when open=false', () => {
    render(<ConfirmDeleteModal {...baseProps} open={false} />)
    expect(screen.queryByText('Eliminar inmueble')).toBeNull()
  })

  it('click Eliminar calls onConfirm', () => {
    render(<ConfirmDeleteModal {...baseProps} />)
    fireEvent.click(screen.getByRole('button', { name: /eliminar/i }))
    expect(baseProps.onConfirm).toHaveBeenCalled()
  })

  it('click Cancelar calls onClose', () => {
    render(<ConfirmDeleteModal {...baseProps} />)
    fireEvent.click(screen.getByRole('button', { name: /cancelar/i }))
    expect(baseProps.onClose).toHaveBeenCalled()
  })

  it('Escape key calls onClose', () => {
    render(<ConfirmDeleteModal {...baseProps} />)
    fireEvent.keyDown(document, { key: 'Escape' })
    expect(baseProps.onClose).toHaveBeenCalled()
  })

  it('Eliminar button is disabled when loading=true', () => {
    render(<ConfirmDeleteModal {...baseProps} loading={true} />)
    const btn = screen.getByRole('button', { name: /eliminando/i })
    expect(btn).toBeDefined()
    expect((btn as HTMLButtonElement).disabled).toBe(true)
  })
})
