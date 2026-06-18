# Dependency Blast Radius Dashboard

## Overview
A full-stack application that visualizes service dependencies and simulates failure impact across a distributed system.

## Features
- Service Management
- Dependency Mapping
- Interactive Graph Visualization
- Failure Simulation
- Blast Radius Analysis
- Severity Scoring
- Historical Simulations
- Circular Dependency Detection
- Service Health Dashboard
- Search & Filtering

## Tech Stack
Frontend:
- React
- Axios
- React Flow

Backend:
- Node.js
- Express.js

Database:
- MongoDB Atlas

## Algorithms

### Blast Radius Analysis
Uses Breadth First Search (BFS) to traverse the dependency graph and identify impacted services.

### Circular Dependency Detection
Uses Depth First Search (DFS) before creating a dependency to detect cycles and prevent invalid relationships.