# TDR-004: CRUD Completo — Editar y Eliminar en Todas las Tablas

## Estado
Pendiente de implementación

## Contexto
El sistema actualmente solo permite crear registros. Falta editar y eliminar en todos los módulos.
La eliminación usa modal de confirmación. La edición usa modales pre-llenados con datos actuales.

---

## Endpoints por módulo

### ✅ Ya existen en backend — solo falta frontend

| Módulo | PATCH | DELETE |
|--------|-------|--------|
| `GET/PATCH/DELETE /alquileres/:id` | ✅ | ✅ |
| `GET/PATCH/DELETE /nominas/empleados/:id` | ✅ | ✅ |
| `GET/PATCH/DELETE /proveedores/:id` | ✅ | ✅ |
| `PATCH /tesoreria/cuentas/:id` | ✅ | — |
| `PATCH /transferencias/:id` | ✅ | — |

### ❌ Faltan en backend — requieren implementación Go

| Módulo | Endpoint a agregar | Campos |
|--------|-------------------|--------|
| Servicios | `PATCH /servicios/:id` | nombre, proveedor, costoMensual, estado, categoria, extra, vtoFactura, vigencia, renovacion |
| Servicios | `DELETE /servicios/:id` | — |
| Alquileres Contratos | `PATCH /alquileres/contratos/:id` | vigenciaDesde, vigenciaHasta, ajusteFrecuencia, montoMensual, estado |
| Alquileres Contratos | `DELETE /alquileres/contratos/:id` | — |
| Alquileres Pagos | `PATCH /alquileres/pagos/:id` | estado, fechaPago, monto, comprobante |
| Nóminas Guardias | `PATCH /nominas/guardias/:id` | empleadoId, fecha, horas, monto, notas |
| Nóminas Guardias | `DELETE /nominas/guardias/:id` | — |
| Nóminas Compensaciones | `PATCH /nominas/compensaciones/:id` | tipo, monto, fecha, descripcion, estado |
| Nóminas Compensaciones | `DELETE /nominas/compensaciones/:id` | — |
| Transferencias | `DELETE /transferencias/:id` | — |

---

## Contratos de request/response

### PATCH genérico
- Request: `{ campo: valor, ... }` (solo campos a modificar)
- Response: `{ "data": <entidad completa actualizada> }`
- Error 404: `{ "error": { "code": "NOT_FOUND", "message": "..." } }`

### DELETE genérico
- Request: vacío
- Response: `{ "data": { "message": "eliminado correctamente" } }`
- Error 404: `{ "error": { "code": "NOT_FOUND", "message": "..." } }`

### PATCH /servicios/:id
```json
{
  "nombre": "string",
  "proveedor": "string",
  "costoMensual": 12000.00,
  "estado": "activo | proximo_vencer | vencido",
  "categoria": "internet | energia | seguridad | software",
  "extra": "string",
  "vtoFactura": "2026-04-01",
  "vigencia": "string",
  "renovacion": "2026-12-31"
}
```

### PATCH /alquileres/contratos/:id
```json
{
  "vigenciaDesde": "2026-01-01",
  "vigenciaHasta": "2026-12-31",
  "ajusteFrecuencia": "trimestral",
  "montoMensual": 95000.00,
  "estado": "vigente | por_vencer | vencido"
}
```

### PATCH /alquileres/pagos/:id
```json
{
  "estado": "pagado | pendiente",
  "fechaPago": "2026-03-15",
  "monto": 95000.00,
  "comprobante": "string"
}
```

### PATCH /nominas/guardias/:id
```json
{
  "empleadoId": "uuid",
  "fecha": "2026-03-15",
  "horas": 8,
  "monto": 5000.00,
  "notas": "string"
}
```

### PATCH /nominas/compensaciones/:id
```json
{
  "tipo": "bono | adelanto | extra | otro",
  "monto": 10000.00,
  "fecha": "2026-03-15",
  "descripcion": "string",
  "estado": "aprobado | pendiente | rechazado"
}
```

---

## UX — Modal de confirmación de eliminación

```
┌─────────────────────────────────────┐
│  ⚠️  Confirmar eliminación           │
│                                     │
│  ¿Eliminás [nombre del item]?       │
│  Esta acción no se puede deshacer.  │
│                                     │
│  [Cancelar]         [Eliminar]      │
└─────────────────────────────────────┘
```

- Botón "Eliminar" en rojo
- Loading state durante la mutación
- Toast de éxito/error post-eliminación
- Invalidar queryKey del módulo correspondiente

---

## Notas de implementación backend (Go + Gin)

Para los endpoints faltantes, seguir el patrón existente en el backend:
1. Agregar handler en `internal/handlers/`
2. Registrar ruta en `internal/routes/`
3. Agregar migración si hay cambios de schema
4. Responder siempre con `{ "data": payload }` o `{ "error": { "code": "...", "message": "..." } }`
