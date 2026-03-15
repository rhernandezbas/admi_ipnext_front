# IPNEXT — Sistema de Administración Empresarial

## Descripción General

IPNEXT Admin es una plataforma web de administración financiera y operativa pensada para empresas que necesitan centralizar y controlar sus egresos, personal, proveedores, servicios, inmuebles y liquidez desde un único panel.

## Problema que Resuelve

Las empresas medianas gestionan sus pagos y obligaciones en planillas dispersas, sin visibilidad consolidada del flujo de caja, vencimientos ni estado de pagos. IPNEXT centraliza todo en una interfaz clara que permite actuar antes de que los problemas sucedan.

## Usuarios

| Rol | Descripción |
|-----|-------------|
| **Admin** | Acceso total: puede ver, crear, editar y aprobar cualquier operación en todos los módulos |
| **Sub-usuario** | Acceso parcial configurado por el Admin: puede tener permisos de solo lectura o escritura en módulos específicos |

## Módulos del Sistema

| Módulo | Propósito |
|--------|-----------|
| **Dashboard** | Vista ejecutiva consolidada: KPIs financieros, pagos urgentes, distribución de egresos y actividad reciente |
| **Transferencias & Pagos** | Registro y seguimiento de todos los pagos de la empresa, con calendario y recurrencias |
| **Nóminas & RRHH** | Gestión de empleados, liquidaciones, guardias y compensaciones adicionales |
| **Proveedores & Contratos** | Directorio de proveedores, contratos asociados y ranking de pagos |
| **Servicios & Utilities** | Control de servicios externos (internet, energía, seguridad, software, obra social) |
| **Alquileres & Inmuebles** | Gestión de inmuebles alquilados, contratos, pagos y vencimientos |
| **Tesorería & Bancos** | Flujo de caja proyectado, cuentas bancarias, conciliación y proyecciones |
| **Reportes & Analytics** | Informes exportables por categoría: financiero, nómina, proveedores, inmuebles |

## Stack Técnico

| Capa | Tecnología |
|------|-----------|
| Frontend | React (SPA) |
| Backend | API REST propia (desarrollo posterior al frontend) |
| Autenticación | JWT — roles Admin / Sub-usuario |

## Design System

| Token | Valor |
|-------|-------|
| Color primario | `#E42313` (rojo) |
| Color texto principal | `#0D0D0D` |
| Color texto secundario | `#7A7A7A` |
| Color fondo app | `#FAFAFA` |
| Color fondo card | `#FFFFFF` |
| Color borde | `#E8E8E8` |
| Color éxito | `#22C55E` |
| Color error/alerta | `#E42313` |
| Fuente headings / labels | Space Grotesk |
| Fuente body | Inter |
| Iconos | Lucide React |

## Flujo General de la App

```
Login
  └── Dashboard (home)
        ├── Transferencias
        │     ├── Lista
        │     ├── Calendario
        │     ├── Recurrentes
        │     └── Nueva Carga
        ├── Nóminas & RRHH
        │     ├── Empleados
        │     ├── Liquidación
        │     ├── Guardias
        │     └── Compensaciones Adicionales
        ├── Proveedores
        │     ├── Directorio
        │     ├── Contratos
        │     └── Ranking de Pagos
        ├── Servicios & Utilities
        │     ├── Resumen General
        │     ├── Internet & Telefonía
        │     ├── Energía
        │     ├── Seguridad
        │     └── Software
        ├── Alquileres & Inmuebles
        │     ├── Inmuebles
        │     ├── Pagos & Recibos
        │     └── Vencimientos
        ├── Tesorería & Bancos
        │     ├── Flujo de Caja
        │     ├── Cuentas Bancarias
        │     ├── Conciliación
        │     └── Proyecciones
        └── Reportes & Analytics
              ├── Financiero
              ├── Nómina
              ├── Proveedores
              ├── Inmuebles
              └── Exportar
```
