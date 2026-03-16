# TDR-005: Cargas Sociales por Empleado

## Estado
Pendiente de implementación

## Contexto
Actualmente el frontend calcula las cargas sociales como un 30% fijo global del sueldo bruto total.
Se requiere que cada empleado tenga su propia configuración: porcentaje y/o monto fijo.

---

## Modelo de datos

### Cambio en tabla `empleados` (backend)

```sql
ALTER TABLE empleados
  ADD COLUMN cargas_sociales_pct  DECIMAL(5,2) DEFAULT 30.00 COMMENT 'Porcentaje de cargas sociales (ej: 30.00 = 30%)',
  ADD COLUMN cargas_sociales_monto DECIMAL(15,2) DEFAULT NULL  COMMENT 'Monto fijo de cargas sociales. Si se especifica, tiene precedencia sobre el porcentaje.';
```

**Regla de cálculo:**
- Si `cargas_sociales_monto` no es NULL → usar ese valor fijo
- Si `cargas_sociales_monto` es NULL → calcular como `sueldo_bruto * cargas_sociales_pct / 100`

---

## Contrato API

### GET /nominas/empleados — campos adicionales en response
```json
{
  "ID": "uuid",
  "Nombre": "Juan Perez",
  "SueldoBruto": 150000,
  "CargasSocialesPct": 30.00,
  "CargasSocialesMonto": null,
  "CargasSocialesCalculado": 45000
}
```

`CargasSocialesCalculado` es un campo calculado por el backend (no persistido), útil para el frontend.

### PATCH /nominas/empleados/:id — campos adicionales en request
```json
{
  "cargasSocialesPct": 35.5,
  "cargasSocialesMonto": null
}
```
O con monto fijo:
```json
{
  "cargasSocialesPct": 30.0,
  "cargasSocialesMonto": 50000
}
```

### POST /nominas/empleados — campos adicionales en request
```json
{
  "nombre": "...",
  "sueldoBruto": 150000,
  "cargasSocialesPct": 30.0,
  "cargasSocialesMonto": null
}
```

---

## Impacto en frontend

### Tipo `Empleado` — agregar campos
```typescript
interface Empleado {
  // ... campos existentes ...
  cargasSocialesPct: number        // default: 30
  cargasSocialesMonto?: number     // null = usar porcentaje
  cargasSocialesCalculado?: number // calculado por backend
}
```

### Lógica de cálculo en `NominasPage`
```typescript
// Reemplazar el 0.30 hardcodeado:
const cargasSociales = empleados.reduce((acc, e) => {
  const cs = e.cargasSocialesMonto != null
    ? e.cargasSocialesMonto
    : e.sueldoBruto * (e.cargasSocialesPct ?? 30) / 100
  return acc + cs
}, 0)
```

### Formulario `NuevoEmpleadoModal` y `EditarEmpleadoModal`
Agregar sección "Cargas Sociales":
- Radio: `% del sueldo` / `Monto fijo`
- Si `%`: input numérico (default 30)
- Si monto: input numérico en ARS

### `EmpleadosTable` — columna nueva
Mostrar en la fila de cada empleado:
- "30%" o "$50.000" según configuración
- Monto calculado: "$45.000"

---

## Notas de implementación backend (Go + Gin)

1. Agregar migración: `ALTER TABLE empleados ADD COLUMN cargas_sociales_pct ...`
2. Actualizar struct `Empleado` en `internal/models/`
3. Actualizar handlers de GET (incluir campos), POST y PATCH (aceptar campos)
4. Calcular `CargasSocialesCalculado` en el handler GET antes de serializar
