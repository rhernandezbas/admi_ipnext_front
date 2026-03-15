// Simple toast utility (no external dependency)
export const toast = {
  success: (msg: string) => console.info('[toast:success]', msg),
  error: (msg: string) => console.error('[toast:error]', msg),
}
