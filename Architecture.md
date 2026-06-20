# Architecture

## System Overview

Dependency Blast Radius Analyzer is a full-stack web application designed to model service dependencies in a distributed system and analyze the impact of service failures.

## Technology Stack

### Frontend

* React.js
* React Flow
* Axios
* React Router
* Dagre (Automatic Graph Layout)

### Backend

* Node.js
* Express.js

### Database

* MongoDB
* Mongoose

---

## System Architecture

Frontend (React)
|
v
Backend API (Express)
|
v
MongoDB

### Components

#### Service Management

Handles creation, update, deletion, and status management of services.

#### Dependency Management

Allows users to create dependencies between services and prevents circular dependency creation.

#### Visualization Engine

Uses React Flow and Dagre to display services as nodes and dependencies as edges.

#### Failure Simulation Engine

Performs blast radius analysis using graph traversal algorithms to identify impacted services.

#### Simulation History

Stores historical simulation results for future analysis.

---

## Blast Radius Calculation

The system models dependencies as a directed graph.

Example:

Auth Service -> Payment Service -> Notification Service

If Auth Service fails:

Impacted Services:

* Payment Service
* Notification Service

The algorithm uses Breadth First Search (BFS) to traverse dependent services.

---

## Impact Severity Scoring

Severity Score = Impacted Service Count × 20

Severity Levels:

* LOW
* MEDIUM
* HIGH

---

## Scalability Considerations

* Modular Controller-Service Architecture
* MongoDB for flexible schema design
* Graph visualization supports dynamic service addition
* Dependency calculations operate on graph structures

---

## Failure Handling

* Circular Dependency Detection
* Invalid Service Validation
* Dependency Cleanup on Service Deletion
* API Error Handling
* Frontend Error Notifications

---

## Future Improvements

* Real-time WebSocket updates
* Dependency editing
* User authentication
* Multi-environment support
* Advanced severity scoring
