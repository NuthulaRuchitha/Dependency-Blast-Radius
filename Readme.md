# Dependency Blast Radius Analyzer

## Overview

Dependency Blast Radius Analyzer is a web application that helps visualize service dependencies, simulate service failures, and analyze the resulting impact across a distributed system.

## Features

### Service Management

* Create Service
* Update Service
* Delete Service
* Status Toggle

### Dependency Management

* Create Dependencies
* Circular Dependency Detection

### Visualization

* React Flow Graph
* Dagre Auto Layout

### Failure Analysis

* Blast Radius Calculation
* Impact Severity Scoring
* Dependency Path Exploration
* Analyze Impact

### Monitoring

* Service Health Dashboard
* Simulation History

---

## Tech Stack

### Frontend

* React.js
* React Flow
* Axios
* React Router
* Dagre

### Backend

* Node.js
* Express.js

### Database

* MongoDB Atlas
* Mongoose

---

## Installation

### Backend

```bash
cd backend
npm install
npm run dev
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

---

## Environment Configuration

Create a .env file inside backend:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
```

---

## Running the Application

Backend:

```bash
npm run dev
```

Frontend:

```bash
npm run dev
```

Application URL:

```text
http://localhost:5173
```

---

## Assumptions

* Dependencies are directional.
* Circular dependencies are invalid.
* Failed services may impact dependent services.
* Severity score is calculated using impacted service count.

---

## Testing Scenarios

1. Create services.
2. Create dependencies.
3. Simulate failures.
4. Analyze blast radius.
5. Verify simulation history.
6. Test circular dependency prevention.

---

## Future Enhancements

* Authentication
* Real-time monitoring
* Dependency editing
* Advanced analytics
* Notification system
