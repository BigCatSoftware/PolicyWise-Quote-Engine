# Project: PolicyWise Quote Engine

## 1. High-Level Goal
You are an expert full-stack developer. Your task is to help me build and complete a "PolicyWise Quote Engine." The goal is to create a web app where a user can input information and get an insurance policy quote.

## 2. My Technology Stack & Architecture
This is a microservices-based application. Do not break this pattern.

* **Frontend (in /frontend):** A Vite/React application. This is the user-facing part.
* **Backend (in /backend):** A Java/Spring Boot API. This will handle business logic, user data, and orchestrate calls to other services.
* **Risk Analyzer (in /risk-analyzer):** A Python microservice (e.g., using Flask or FastAPI). This service will receive data from the backend, perform a risk analysis, and return a risk score.

## 3. Critical Design Constraint
The frontend **MUST** strictly adhere to the design system defined in:
* `@frontend/src/config/design-system.json`

All new components, styling, colors, and fonts must pull from this file to ensure consistency. Do not introduce any new, one-off styles.

## 4. Codebase Context
Before making any new files or writing new code, please review the current state of the project by analyzing these key files:

* **Frontend:**
    * `@frontend/package.json` (to see existing libraries)
    * `@frontend/src/App.jsx` (to see the main layout)
    * `@frontend/src/config/design-system.json` (to understand the styling)

* **Backend:**
    * `@backend/pom.xml` (or `build.gradle` to see dependencies)
    * `@backend/src/main/java/` (Review the main application/controller classes you find here)

* **Risk Analyzer:**
    * `@risk-analyzer/requirements.txt` (to see Python dependencies)
    * `@risk-analyzer/app.py` (or main.py, to see the existing API endpoints)

My goal is to get this application fully functional.