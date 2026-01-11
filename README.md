# Prueba de Performance – k6
**Autor:** Pablo Suntaxi  
**Proyecto:** Prueba de Performance

---
## Descripción
Este proyecto contiene una prueba de performance realizada con **k6** sobre el
endpoint de autenticación **POST /auth/login**, con el objetivo de validar el
comportamiento del servicio bajo una carga constante.

La prueba fue ejecutada siguiendo las especificaciones del reto técnico.

---

## Prerequisitos
Antes de ejecutar la prueba, es necesario contar con lo siguiente en la máquina local:

- Sistema operativo Windows / Linux / macOS
- IntelliJ IDEA
- k6 instalado y configurado en la variable de entorno **PATH**

---

## Comandos de instalación
Este proyecto no requiere instalación de dependencias adicionales.
Únicamente es necesario contar con **k6** instalado en el sistema.

### Windows (Chocolatey)
```powershell
choco install k6
```
Para validar la instalación de k6:
```bash
k6 version
```
## Instrucciones para ejecutar la prueba

- Abrir una terminal (CMD) en la raíz del proyecto.
- Ejecutar el siguiente comando:
```bash
k6 run --summary-export=reports/summary.json scripts/login.js
```

## Escenario ejecutado

- **Tipo de carga:** constant-arrival-rate  
- **Carga objetivo:** 20 TPS  
- **Duración:** 3 minutos  


### Validaciones
- Código de respuesta HTTP **201**
- Presencia del **token** en la respuesta

### Thresholds
- **p95** menor a **1500 ms**
- **Error rate** menor al **3%**

---

## Reportes
Al finalizar la ejecución se genera el siguiente reporte:

- `reports/summary.json`

Este archivo contiene métricas de rendimiento como:
- Throughput
- Tiempos de respuesta
- Porcentaje de errores
- Resultado de los thresholds definidos
 
---

## Información adicional
- El script de la prueba se encuentra en la carpeta `scripts/`.
- Los reportes generados se almacenan en la carpeta `reports/`.
- Los parámetros de carga y duración pueden modificarse en el archivo `login.js`.