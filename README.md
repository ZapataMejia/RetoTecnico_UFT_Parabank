# Solución de Automatización de Pruebas: Parabank - UFT One & Jenkins

## Resumen Ejecutivo

Este repositorio contiene la solución completa al Reto Técnico, enfocada en la implementación de una estrategia de **Integración Continua y Entrega Continua (CI/CD)** para la aplicación Parabank.

El objetivo principal es demostrar la **trazabilidad de la calidad** desde la planificación en Jira hasta la ejecución automatizada en un entorno de CI/CD.

## Flujo de Trabajo y Metodología

| Herramienta | Función en el Proyecto |
| :--- | :--- |
| **Jira (Scrum)** | Gestión completa del proyecto, planificación de Historias de Usuario (US) y seguimiento de las Tareas y Evidencias. |
| **Git/GitHub** | Control de versiones de todo el código (scripts de UFT y archivos de infraestructura). |
| **UFT One** | Desarrollo de los tres escenarios funcionales con un **Framework Modular** (Acciones Reutilizables) y **Data-Driven Testing** (Data Table). |
| **Jenkins/Docker** | Orquestación del pipeline de CI/CD para la ejecución desatendida de las pruebas en Windows. |

---

## 1. Requisitos del Entorno de Ejecución

Para replicar este proyecto o ejecutar el pipeline en una nueva máquina, se requieren los siguientes componentes en el host de Windows:

* **Sistema Operativo:** Windows 10/11 (Requerido por UFT One).
* **Herramientas de Automatización:** OpenText UFT One (para el desarrollo y la ejecución).
* **Contenerización y CI:** Docker Desktop (para levantar el servidor Jenkins) y Java JDK.

## 2. Estructura del Framework UFT

El proyecto sigue un enfoque modular, similar al **Page Object Model (POM)**:

* **Test Principal (`Parabank_Test.usr`):** Orquesta el flujo de ejecución.
* **Acciones Reutilizables:** Cada acción (Registro, Creación de Cuenta, Transferencia) actúa como una función, promoviendo la reutilización del código.
* **Repositorio de Objetos Compartido (`.tsr`):** Centraliza todos los objetos de la aplicación para un mantenimiento eficiente.
* **Data Table Global:** Todos los datos de prueba son parametrizados y manejados a nivel global para facilitar el Data-Driven Testing.

## 3. Configuración de CI/CD

La integración se realiza mediante Jenkins, utilizando un agente Windows para invocar el ejecutable de UFT.

* **Dockerfile:** Define la imagen ligera de Jenkins que incluye Git para el 'Checkout Code'.
* **Jenkinsfile (Pipeline):** Script de orquestación que define las etapas: **Checkout**, **Ejecución de UFT** (vía CLI) y **Publicación de Reportes** (para generar evidencias en el servidor).