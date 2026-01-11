Prueba de Performance – k6
----------------------------------------------------
Descripción
----------------------------------------------------
Este proyecto contiene una prueba de performance realizada con k6 sobre el
endpoint de autenticación POST /auth/login, con el objetivo de validar el
comportamiento del servicio bajo una carga constante.

La prueba fue ejecutada siguiendo las especificaciones del reto técnico.
----------------------------------------------------
Requisitos
----------------------------------------------------
- IntelliJ IDEA
- k6 instalado y configurado en el PATH

----------------------------------------------------
Ejecución de la prueba
----------------------------------------------------
1. Abrir una terminal en la raíz del proyecto.
2. Ejecutar el siguiente comando:

   k6 run --summary-export=reports/summary.json scripts/login.js

----------------------------------------------------
Escenario ejecutado
----------------------------------------------------
- Tipo de carga: constant-arrival-rate
- Carga objetivo: 20 TPS
- Duración: 3 minutos
- Validaciones:
  - Código de respuesta HTTP 201
  - Presencia del token en la respuesta
- Thresholds:
  - p95 < 1500 ms
  - Error rate < 3%

Reportes
Al finalizar la ejecución se genera el siguiente reporte:
- reports/summary.json

Este archivo contiene métricas de rendimiento como throughput, tiempos de
respuesta, porcentaje de errores y resultado de los thresholds definidos.