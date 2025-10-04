# 🚀 Reto Técnico de Automatización: Playwright + Jenkins Contenerizado + Jira

## 🎯 Objetivo del Proyecto
Este proyecto demuestra la implementación completa de un flujo de automatización de pruebas End-to-End para la aplicación **Parabank**. El objetivo es validar competencias en arquitectura de pruebas, integración continua, contenerización y trazabilidad ágil.

> **Nota:** Aunque el reto original se centró en UFT One, se migró la solución a **Playwright + TypeScript**, permitiendo mantener modularidad, calidad y compatibilidad con CI/CD (Docker y Jenkins).

---

## 🛠️ Tecnologías y Arquitectura

| Categoría | Herramienta | Rol en el Proyecto |
| :--- | :--- | :--- |
| **Automatización** | **Playwright** | Motor principal para la ejecución de pruebas E2E en TypeScript. |
| **Arquitectura** | **Page Object Model (POM)** | Estructuración modular del código en `AccountServicesPage.ts`, clave para **reutilización** y mantenimiento. |
| **Integración Continua** | **Jenkins Contenerizado** | Orquestación del pipeline desde el `Jenkinsfile`. |
| **Contenerización** | **Docker** | Ambiente aislado y reproducible para pruebas en CI. |
| **Gestión Ágil** | **Jira (Scrum)** | Administración del *backlog* y trazabilidad de pruebas. |

---

## 📋 Escenarios Automatizados Cubiertos

| Escenario | Historia de Usuario (US) | Archivo de Prueba | Estrategia Destacada |
| :--- | :--- | :--- | :--- |
| **Registro de Usuario** | US-1 | `01_register.spec.ts` | Uso de **Faker** para datos dinámicos, validando el flujo inicial. |
| **Creación de Cuenta** | US-2 | `02_open_account.spec.ts` | Reutilización de la función `login()` desde POM, validando mensaje de éxito. |
| **Transferencia de Fondos** | US-3 | `03_transfer_funds.spec.ts` | Reutilización de `login()` y validación de transacción exitosa. |

---

## 🐳 Flujo de Integración Continua (CI/CD)

El flujo se ejecuta mediante un pipeline declarativo en **`Jenkinsfile`**, asegurando un proceso automático y reproducible.

### Pasos del Pipeline
1. **Build Docker Image:** Construye la imagen basada en Playwright/Node.js para un entorno consistente.
2. **Run Playwright Tests:** Ejecuta pruebas en modo *headless* dentro del contenedor, generando reporte **JUnit** (`junit.xml`).
3. **Publish Test Results:** Jenkins procesa el reporte y muestra los resultados en el dashboard del *build*.

---

## 🔗 Trazabilidad y Gestión con Jira

La gestión se realiza bajo metodología Scrum, manteniendo trazabilidad completa entre código y requisitos.

- **Vínculos Clave:** Cada Historia de Usuario se desglosa en tareas de automatización vinculadas al código fuente.
- **Evidencia (DoD):** Link directo al build de Jenkins y reporte JUnit, adjunto a las tareas en Jira para certificar cumplimiento del **Criterio de Aceptación**.

[Proyecto Jira](https://zapatamejia2308.atlassian.net/jira/software/projects/SCRUM/boards/1)

---

## 🚀 Ejecución Local y CI (Modo Headless)

Para replicar el entorno de CI y validar pruebas antes de Jenkins, sigue los pasos:

### ⚠️ Preparación del Entorno
- **Docker Desktop** debe estar abierto y funcionando.
- Conexión al *daemon* de Docker requerida para ejecutar contenedores.

### 1. Construcción de la Imagen de Pruebas

Primero se construye la imagen de Docker que contiene todas las dependencias necesarias (Node.js, Playwright y navegadores). Esto se realiza ejecutando el comando `docker build -t playwright-parabank-ci .` en la terminal.  

Una vez generada la imagen, para ejecutar los tests dentro del contenedor se usa el comando `docker run --rm -v $(pwd):/tests playwright-parabank-ci npx playwright test --reporter=dot,junit`.  

---

## 📊 Flujo de Ejecución (Diagrama Mermaid)
```mermaid
graph TD
    subgraph "Control de Versiones (Git)"
        A[Desarrollador_hace_Push] --> B(Activa_Webhook_de_Jenkins);
    end

    subgraph "Pipeline de Integracion Continua (Jenkins)"
        B --> C{Inicia_la_Construccion};
        C --> D[Etapa_1: Crear_Imagen_Docker];
        D --> E(Etapa_2: Ejecutar_Pruebas_Playwright);
        E -- Genera_Reporte_JUnit --> F[Etapa_3: Publicar_Resultados];
        F -- Resultado_Exito_Fallo --> G(Build_Finalizado);
    end

    subgraph "Gestion de Calidad (Jira)"
        G --> H[Vincular_Build_a_Ejecucion_de_Prueba];
        H --> I[Adjuntar_Evidencia_Link_Jenkins];
        I --> J{Validacion_de_DoD};
    end

    E -- Ejecuta_Playwright_Headless --> K(Contenedor_de_Pruebas);
    K -- Interactua_con_la_Aplicacion --> L(Aplicacion_Parabank);

    style E fill:#f9f,stroke:#333
    style C fill:#ccf,stroke:#333
    style F fill:#9f9,stroke:#333
    style H fill:#fcc,stroke:#333
    style J fill:#ddf,stroke:#333
