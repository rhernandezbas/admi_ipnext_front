---
active: true
iteration: 1
session_id:
max_iterations: 30
completion_promise: "INTERACTION LAYER COMPLETE"
started_at: "2026-03-15T00:00:00Z"
---

Implementa el interaction-layer de ipnext-admin/ usando TDD, fase por fase según spec/interaction-layer-tracker.md y spec/interaction-layer-spec.md.

## Reglas de operación

1. Lee spec/interaction-layer-tracker.md para ver el estado actual de cada fase.
2. Identifica la PRIMERA fase con estado Pendiente o En progreso.
3. Implementa ESA fase completa con TDD:
   - Escribe primero los tests (red)
   - Luego implementa el código (green)
   - Corre: cd ipnext-admin && npm run test -- --run
   - Corre: cd ipnext-admin && npx tsc -p tsconfig.app.json --noEmit
4. Actualiza el tracker:
   - Marca cada sub-tarea completada con [x]
   - Cambia el estado de la fase en la tabla de Estado a COMPLETADO
5. Cuando TODAS las fases estén COMPLETADO, output la completion promise.
6. Cuando TODAS las fases estén completadas, output exactamente: <promise>INTERACTION LAYER COMPLETE</promise>

## Contexto del proyecto
- Directorio del frontend: ipnext-admin/
- Framework: React + TypeScript + Vite + TanStack Query + Zustand + Tailwind
- Tests: Vitest + Testing Library
- El backend ya existe (Go + Gin), solo implementar frontend

## Importante
- Sigue el spec EXACTAMENTE como está definido en spec/interaction-layer-spec.md
- No inventes ni agregues funcionalidad extra
- Si un test falla por razón externa, arréglalo sin cambiar el comportamiento esperado
- Actualiza el tracker después de cada fase completada
