# 🚀 Reto Técnico Final: Framework de Automatización Parabank

## Introducción

Este documento presenta el **Framework de Automatización** desarrollado con **Playwright** y **TypeScript**, diseñado para validar los procesos clave de la aplicación **Parabank**. El proyecto cumple con los requisitos funcionales (Registro, Creación de Cuenta, Transferencia de Fondos) y los criterios técnicos de **modularidad (POM)**, **estabilidad** y **Continuous Integration (CI)**.

---

## 1. Arquitectura y Estructura del Framework

El framework está construido bajo el patrón de diseño **Page Object Model (POM)** para lograr una separación clara entre la lógica de prueba y los localizadores/métodos de interacción.

### Estructura Lógica de Archivos

| Componente | Archivo(s) | Responsabilidad Clave |
| :--- | :--- | :--- |
| **Test Specs** | `tests/01_register.spec.ts`, `tests/02_open_account.spec.ts`, `tests/03_transfer_funds.spec.ts` | Define los *flujos de negocio* (historias de usuario). Cada archivo es un escenario independiente. |
| **Page Object Model (POM)** | `tests/pages/AccountServicesPage.ts` | **Centraliza todos los selectores, datos fijos de login**, y métodos de interacción (`login()`, `openNewSavingsAccount()`, etc.). **Máxima Reutilización.** |
| **Configuración** | `playwright.config.ts` | Configuración de entorno: Navegador (Chromium), **Timeouts**, *baseURL* y definición del reportero JUnit. |
| **Integración Continua** | `Dockerfile`, `Jenkinsfile` | Define el entorno de ejecución (Docker) y la *pipeline* para la automatización en Jenkins. |

### Diagrama de Flujo del Test

Este diagrama visualiza cómo los diferentes archivos del proyecto interactúan con el Page Object Model, demostrando la **modularidad**:

```mermaid
graph TD
    A[Inicio Ejecución Tests] --> B{tests/01_register.spec.ts<br>(US-1: Registro)};

    subgraph Page Object Model (tests/pages/AccountServicesPage.ts)
        F[Método: login()] --> G{Interactúa con Campos de Login<br>(Usuario Fijo: QASanti)};
        G --> H[Valida Acceso al Dashboard];
        I[Método: openNewSavingsAccount()] --> J{Lógica US-2};
        O[Método: transferFunds()] --> P{Lógica US-3};
    end

    B --> C[Usa Faker.js para Datos Dinámicos];
    C --> D[Aplica Estrategia Clic + Fill];
    D --> E[Validación de Bienvenida];

    T{tests/02_open_account.spec.ts<br>(US-2: Crear Cuenta)} --> F;
    F --> I;
    I --> U[Valida Éxito de Creación];

    V{tests/03_transfer_funds.spec.ts<br>(US-3: Transferir Fondos)} --> F;
    F --> O;
    O --> W[Valida Éxito de Transferencia];

    E & U & W --> X[Reporte JUnit generado (test-results/junit.xml)];
    X --> Y[Fin Ejecución Tests];